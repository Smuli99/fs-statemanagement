import { useAnecdoteActions } from "../stores/anecdoteStore";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

   const addNew = (e) => {
    e.preventDefault()
    add(e.target.new.value);
    e.target.reset()
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="new" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;