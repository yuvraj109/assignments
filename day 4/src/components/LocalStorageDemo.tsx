import { useLocalStorage } from '../hooks';

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage<string>('user-name', '');
  const [age, setAge] = useLocalStorage<number>('user-age', 0);

  return (
    <div className="demo-card">
      <h3>useLocalStorage Hook</h3>
      <p>Persist state to localStorage automatically</p>
      
      <div className="input-group">
        <label>Name (persisted):</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      
      <div className="input-group">
        <label>Age (persisted):</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Enter your age"
        />
      </div>
      
      <div className="output">
        Stored: {JSON.stringify({ name, age })}
      </div>
    </div>
  );
}
