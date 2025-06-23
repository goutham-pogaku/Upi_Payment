import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/pay?amount=${amount}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter Amount</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Amount</button>
    </div>
  );
}

export default Home;