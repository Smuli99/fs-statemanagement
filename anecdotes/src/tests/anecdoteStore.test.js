import { beforeEach, it, expect, describe, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions
} from '../stores/anecdoteStore';

import anecdoteService from '../services/anecdotes';

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}));

const mockData = [
  { id: 1, content: 'A', votes: 0 },
  { id: 2, content: 'B', votes: 7 },
  { id: 3, content: 'C', votes: 3 },
];

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useAnecdoteActions', () => {
  it('1 initialize loads anecdotes from service', async () => {
    anecdoteService.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: data } = renderHook(() => useAnecdotes());
    expect(data.current).toHaveLength(3);
  });

  it('2 store returns anecdotes sorted by votes in descending order', async () => {
    useAnecdoteStore.setState({ anecdotes: mockData });

    const { result } = renderHook(() => useAnecdotes());

    expect(result.current).toEqual(
      mockData.toSorted((a, b) => b.votes - a.votes)
    );
  });
});