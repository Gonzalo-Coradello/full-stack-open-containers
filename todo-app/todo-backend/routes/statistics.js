const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/', async (req, res) => {
  const added_todos = await getAsync('added_todos') ?? '0';

  res.send({ added_todos });
});

module.exports = router;