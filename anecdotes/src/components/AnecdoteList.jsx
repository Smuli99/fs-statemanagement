import { useAnecdotes } from "../store";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);
  
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList; 