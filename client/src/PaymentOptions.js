import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PaymentOptions() {
  const [searchParams] = useSearchParams();
  const [upiLink, setUpiLink] = useState('');
  const amount = searchParams.get('amount');

  useEffect(() => {
    fetch('/api/generate-upi-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, strategy: 'random' }) // or 'time'
    })
      .then(res => res.json())
      .then(data => {
        if (data.upiLink) setUpiLink(data.upiLink);
      });
  }, [amount]);

  const handlePay = () => {
    if (upiLink) window.location.href = upiLink;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Choose Payment App</h2>
      <p>Amount: ₹{amount}</p>
     <a href={upiLink}>
  <button>Pay with UPI</button>
</a>

    </div>
  );
}

export default PaymentOptions;
