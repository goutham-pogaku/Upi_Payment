const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());



let transactions = [];

// Multiple UPI accounts
const upiAccounts = [
  { upiId: 'janaganipraneeth1@ybl', payeeName: 'Merchant One' },
  { upiId: 'janaganipraneeth1@ybl', payeeName: 'Merchant Two' },
  { upiId: 'janaganipraneeth1@ybl', payeeName: 'Merchant Three' }
];

// Strategy-based account selection
function selectUpiAccount(strategy = 'random') {
  if (strategy === 'time') {
    const index = Math.floor(new Date().getSeconds() / 20) % upiAccounts.length;
    return upiAccounts[index];
  }
  return upiAccounts[Math.floor(Math.random() * upiAccounts.length)];
}

// Initiate payment: returns transactionId + upiLink
app.post('/api/initiate-payment', (req, res) => {
  const { amount, strategy } = req.body;
  const parsedAmount = parseFloat(amount);

  if (!parsedAmount || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const { upiId, payeeName } = selectUpiAccount(strategy);
  const transactionId = uuidv4();
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${parsedAmount}&cu=INR`;

  transactions.push({
    id: transactionId,
    amount: parsedAmount,
    upiId,
    payeeName,
    status: 'pending',
    createdAt: new Date().toISOString()
  });

  res.json({ upiLink, transactionId });
});

// Polling endpoint to get status
app.get('/api/status/:id', (req, res) => {
  const txn = transactions.find(t => t.id === req.params.id);
  if (!txn) return res.status(404).json({ error: 'Transaction not found' });
  res.json({ status: txn.status });
});

// Manual status update for mock testing
app.post('/api/mock-payment/:id', (req, res) => {
  const { status } = req.query;
  const txn = transactions.find(t => t.id === req.params.id);
  if (!txn) return res.status(404).json({ error: 'Transaction not found' });

  if (!['success', 'failed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  txn.status = status;
  res.json({ message: 'Status updated', transaction: txn });
});

// Admin endpoint to see all transactions
app.get('/api/admin/transactions', (req, res) => {
  res.json(transactions);
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
