import express from 'express';

const expressApp = express();

expressApp.get('test', (req, res) => {
  res.send('Test succesfully');
});

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000');
});
