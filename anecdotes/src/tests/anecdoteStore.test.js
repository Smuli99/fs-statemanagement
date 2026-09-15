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

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockData = [{ id: 1, content: 'Test', votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: data } = renderHook(() => useAnecdotes());
    expect(data.current).toHaveLength(1);
    expect(data.current).toEqual(mockData);
  });
});