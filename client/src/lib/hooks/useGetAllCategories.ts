import { trpc } from '../trpc'

export function useGetAllCategories() {
  return trpc.category.getAllCategories.useQuery(undefined, {
    enabled: false,
  })
}
