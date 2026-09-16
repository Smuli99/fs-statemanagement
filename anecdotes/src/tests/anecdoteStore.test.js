import { beforeEach, it, expect, describe, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions
} from '../stores/anecdoteStore';

import anecdoteService from '../services/anecdotes';
import anecdotes from '../services/anecdotes';

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}));

const mockData = [
  { id: 1, content: 'Test Data', votes: 0 },
  { id: 2, content: 'Mock Data', votes: 7 },
  { id: 3, content: 'Here is content', votes: 3 },
];

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useAnecdoteStore', () => {
  it('1 initialize loads anecdotes from service', async () => {
    anecdoteService.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: data } = renderHook(() => useAnecdotes());
    expect(data.current).toHaveLength(3);
  });

  it('2 store returns anecdotes sorted by votes in descending order', () => {
    useAnecdoteStore.setState({ anecdotes: mockData });

    const { result } = renderHook(() => useAnecdotes());

    expect(result.current).toEqual(
      mockData.toSorted((a, b) => b.votes - a.votes)
    );
  });

});

describe('filtering anecdotes', () => {
  it('1 store returns all anecdotes if no filter', () => {
    useAnecdoteStore.setState({ anecdotes: mockData, filter: '' });

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(3);
  });

  it('2 store returns all anecdotes that match the filter', () => {
    useAnecdoteStore.setState({ anecdotes: mockData, filter: 'data'});

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(2);
    expect(result.current).toEqual([mockData[1], mockData[0]]);
  });

  it('3 store returns zero anecdotes if nothing match the filter', () => {
    useAnecdoteStore.setState({ anecdotes: mockData, filter: 'no matches' });

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(0);
  });
});