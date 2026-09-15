import { useEffect } from "react";
import { useAnecdoteActions } from "./stores/anecdoteStore";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const { initialize } = useAnecdoteActions();

  useEffect(() => {
    initialize();    
  }, [initialize]);
  
  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
