import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createNew, update } from '../requests';
import { useNotify } from './useNotifiy';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotify();
  
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
      setNotification(`anecdote '${anecdote.content}' created`);
      setTimeout(() => setNotification(null), 5000);
    },
    onError: (error) => {
      setNotification('too short anecdote, must have length 5 or more');
      setTimeout(() => setNotification(null), 5000);
      console.log(error);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(anecdote => anecdote.id === updated.id ? updated : anecdote),
      );

      setNotification(`anecdote '${updated.content}' voted`);
      setTimeout(() => setNotification(null), 5000);
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