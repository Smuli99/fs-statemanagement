import { useAnecdoteActions } from "../stores/anecdoteStore";

const Filter = () => {
  const { setFilter } = useAnecdoteActions();
  
  const handleChange = (e) => setFilter(e.target.value);
  const style = { marginBottom: 10 };

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter"/>
    </div>
  );
};

export default Filter;