const express = require('express');
const app = express();

const { allGameNames, getGameInfo } = require('./query');
const { isNumeric } = require('./utils/number');

app.get('/games/info/:id', async (req, res) => {
  const num = req.params.id;
  let result = [];
  if (isNumeric(num)) {
    const a = await getGameInfo(parseInt(num))
    result = a.rows;
  }

  res.status(200).json(result)
});

app.get('/games/names', async (req, res) => {
  const a = await allGameNames();
  res.status(200).json(a.rows)
});

app.listen(3000, () => {
  console.log('Just-Game Server!');
});
