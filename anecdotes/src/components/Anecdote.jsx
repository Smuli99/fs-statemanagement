import { useAnecdoteActions } from "../stores/anecdoteStore";

const Anecdote = ({ anecdote }) => {
  const { vote, remove } = useAnecdoteActions();

  const handleVote = (id) => vote(id);
  const handleRemove = (id) => remove(id);
  
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
        {anecdote.votes === 0 && (
          <button
            style={{ marginLeft: 5 }}
            onClick={() => handleRemove(anecdote.id)}
          >delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Anecdote;