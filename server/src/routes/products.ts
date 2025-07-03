import { z } from 'zod'
import { publicProcedure, router } from '../trpc/trpc'
import { Prisma } from '@prisma/client'

export const productsRouter = router({
  getAllProducts: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1).optional(),
        limit: z.number().min(1).max(100).default(20).optional(),
        categorySlug: z.string().optional(),
        subCategorySlug: z.string().optional(),
        sort: z.enum(['POPULARITY', 'DISCOUNT', 'PRICE_DESC', 'PRICE_ASC', 'NEW']).optional(),
        availability: z.enum(['IN_STOCK', 'ON_ORDER']).optional(),
        priceMin: z.number().min(0).optional(),
        priceMax: z.number().min(0).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page = 1, limit = 20, categorySlug, subCategorySlug, sort, availability, priceMin, priceMax } = input

      // build your WHERE filter
      const where: Prisma.ProductWhereInput = {}
      if (subCategorySlug) {
        // drilling into a subcategory
        where.category = { slug: subCategorySlug }
      } else if (categorySlug) {
        // top-level category → match products directly in it or in any of its children
        where.category = {
          OR: [
            { slug: categorySlug }, // if any products sit directly under the top-level
            { parent: { slug: categorySlug } }, // products in its subcategories
          ],
        }
      }

      if (availability) {
        where.availability = availability
      }

      if (priceMin !== undefined || priceMax !== undefined) {
        where.price = {}
        if (priceMin !== undefined) {
          where.price.gte = priceMin
        }
        if (priceMax !== undefined) {
          where.price.lte = priceMax
        }
      }

      // build your ORDER BY / filter for “discount”
      let orderBy: Prisma.ProductOrderByWithRelationInput[] | undefined
      switch (sort) {
        case 'DISCOUNT':
          where.discount = { gt: 0 }
          break
        case 'PRICE_DESC':
          orderBy = [{ price: 'desc' }]
          break
        case 'PRICE_ASC':
          orderBy = [{ price: 'asc' }]
          break
        case 'NEW':
          orderBy = [{ createdAt: 'desc' }]
          break
        case 'POPULARITY':
          orderBy = [{ reviewCount: 'desc' }]
          break
      }

      // fetch total + page in a single transaction
      const [total, products] = await ctx.prisma.$transaction([
        ctx.prisma.product.count({ where }),
        ctx.prisma.product.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
          include: {
            gallery: true,
            variants: true,
            characteristics: true,
          },
        }),
      ])

      return { total, products }
    }),

  // Example: fetch one product by slug
  getProductBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    return ctx.prisma.product.findUniqueOrThrow({
      where: { slug: input.slug },
    })
  }),
})
