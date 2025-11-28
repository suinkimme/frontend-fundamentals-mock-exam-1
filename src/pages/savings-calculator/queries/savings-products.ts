import { getSavingsProducts } from '../../../api';
import { FilterSavingsProduct, OrderBySavingsProduct } from '../domain/savings-product';

interface Options {
  filters?: FilterSavingsProduct[];
  orderBy?: OrderBySavingsProduct;
  limit?: number;
}

// 요즘 tanstack query로 통신할 때 useQuery보다 queryOption을 전달해서 많이 사용하고 있다.
// 나중에 query key에 접근할 때 좋았음
// 이건 그냥 취향
export function getSavingsProductsQueryOptions({ filters, orderBy, limit }: Options) {
  return {
    queryKey: ['savings-products'] as const,
    queryFn: () => getSavingsProducts(),
    select: (data: Awaited<ReturnType<typeof getSavingsProducts>>) => {
      const filteredData = data.filter(x => filters?.every(filter => filter(x)));
      if (orderBy != null) {
        return filteredData.sort(orderBy).slice(0, limit);
      }
      return filteredData.slice(0, limit);
    },
  };
}
