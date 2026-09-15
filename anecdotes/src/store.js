import { create } from 'zustand'
import anecdoteService from './services/anecdotes';

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    vote: (id) => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
        )
      })
    ),
    // add: (anecdote) => set(
    //   state => ({
    //     anecdotes: [ ...state.anecdotes, asObject(anecdote) ]
    //   })
    // ),
    setFilter: (value) => set(() => ({filter: value}))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);