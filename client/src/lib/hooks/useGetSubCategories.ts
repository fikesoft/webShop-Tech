import { trpc } from '../trpc'

export function useGetSubCategories(slug: string) {
  return trpc.category.getBySlugCategory.useQuery({ slug })
}
