import { http } from 'tosslib';

export const defaultFetcher = ({ queryKey }) => {
  const [url, params] = queryKey;

  return http.get(url, { searchParams: { ...params } }).then(response => {
    return response;
  });
};
