import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createNew, update } from '../requests';

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

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updated.id ? updated : a),
      );
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    add: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    update: (anecdote) => updateAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    }),
  };
};