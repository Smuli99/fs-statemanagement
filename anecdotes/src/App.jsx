import { useAnecdoteActions, useAnecdotes } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, add } = useAnecdoteActions();

  const handleVote = (id) => {
    vote(id)
  }

  const addNew = (e) => {
    e.preventDefault()
    const anecdote = e.target.new.value
    add(anecdote);
    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="new" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
