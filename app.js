const express = require('express');
const app = express();

const { allGameNames, getGameInfo } = require('./query');

app.get('/games/info/:slug', async (req, res) => {
  const num = req.params.slug;
  const a = await getGameInfo(num)
  let result = a.rows;

  res.status(200).json(result)
});

app.get('/games/names', async (req, res) => {
  const a = await allGameNames();
  res.status(200).json(a.rows)
});

app.listen(3000, () => {
  console.log('Just-Game Server!');
});
