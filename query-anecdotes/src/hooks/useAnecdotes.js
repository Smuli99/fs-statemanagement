import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createNew } from '../requests';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote));
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    add: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
  };
};