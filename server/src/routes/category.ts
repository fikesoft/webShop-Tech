import { z } from 'zod'
import { publicProcedure, router } from '../trpc/trpc'

export const categoryRouter = router({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      where: { parentId: null }, // only top-level categories
      include: {
        subcategories: true,
      },
      orderBy: { name: 'asc' }, // optional: sort alphabatically
    })

    return categories
  }),

  //
  getBySlugCategory: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUnique({
      where: { slug: input.slug },
      include: { subcategories: true },
    })
    return category
  }),
})
