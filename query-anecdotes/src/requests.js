const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};

export const createNew = async (anecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) throw new Error('Failed to create anecdote');

  return await response.json();
};