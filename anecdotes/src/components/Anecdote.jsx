import { useAnecdoteActions } from "../stores/anecdoteStore";

const Anecdote = ({ anecdote }) => {
  const { vote } = useAnecdoteActions();

  const handleVote = (id) => {
    vote(id);
  };
  
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;