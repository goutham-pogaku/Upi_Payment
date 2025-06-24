import { useSearchParams } from 'react-router-dom';
import './App.css';

function PaymentOptions() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount');

  const handleAppPay = (app) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate-upi-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, strategy: 'random', app })
    })
      .then(res => res.json())
      .then(data => {
        if (data.upiLink) window.location.href = data.upiLink;
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Payment App</h2>
      <p>Amount: ₹{amount}</p>
      <div className="buttons">
        <button onClick={() => handleAppPay('gpay')}><img src="/gpay.png" alt="GPay" /></button>
        <button onClick={() => handleAppPay('phonepe')}><img src="/phonepe.png" alt="PhonePe" /></button>
        <button onClick={() => handleAppPay('paytm')}><img src="/paytm.png" alt="Paytm" /></button>
      </div>
    </div>
  );
}

export default PaymentOptions;