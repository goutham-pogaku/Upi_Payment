const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-upi-link', (req, res) => {
  const { amount, strategy, app: appName } = req.body;
  const upiId = 'janaganipraneeth1@ybl';

  const upiBase = `upi://pay?pa=${upiId}&pn=UpiReceiver&am=${amount}&cu=INR`;

  const packages = {
    gpay: 'com.google.android.apps.nbu.paisa.user',
    phonepe: 'com.phonepe.app',
    paytm: 'net.one97.paytm'
  };

  const upiLink = appName && packages[appName]
    ? `intent://${upiBase.slice(6)}#Intent;scheme=upi;package=${packages[appName]};end`
    : upiBase;

  res.json({ upiLink });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));