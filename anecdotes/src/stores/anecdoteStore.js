import { create } from 'zustand'
import { showNotification } from './notificationStore'

import anecdoteService from '../services/anecdotes';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.create({
        content,
        votes: 0
      });

      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }));

      showNotification(`You added '${content}'`);
    },
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find(a => a.id === id);
      
      const updated = await anecdoteService.update(id, {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      });

      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }));

      showNotification(`You voted '${updated.content}'`);
    },
    setFilter: (value) => set(() => ({filter: value}))
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);