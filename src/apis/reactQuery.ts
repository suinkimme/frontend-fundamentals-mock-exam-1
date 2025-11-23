import { useQuery } from '@tanstack/react-query';
import { defaultFetcher } from './fetcher';

export const useFetch = ({ url, options }) => {
  const queryKey = [url, options?.params];
  const context = useQuery({
    queryKey,
    queryFn: () => defaultFetcher({ queryKey }),
    enabled: Boolean(url),
    useErrorBoundary: true,
    onError: error => {
      console.error(error);
      // TODO: TOAST 처리
    },
    ...options?.config,
  });

  return context;
};
