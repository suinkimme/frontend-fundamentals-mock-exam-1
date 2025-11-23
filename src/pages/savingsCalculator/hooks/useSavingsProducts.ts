import { apiRoutes } from '@/apis/routes';
import { useFetch } from '@/apis/reactQuery';

const useSavingsProducts = () => useFetch({ url: apiRoutes.products });

export default useSavingsProducts;
