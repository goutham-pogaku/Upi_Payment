import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pay?amount=${amount}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Amount</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <button type="submit">Add Amount</button>
      </form>
    </div>
  );
}

export default App;