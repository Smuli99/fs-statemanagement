import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from '../requests';

export const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};