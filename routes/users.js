const router = require('express').Router();
const { getUsers, getUser, addUser, deleteUser } = require('../api/users');

router.get('/', (req, res) => {
  const users = getUsers();

  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = getUser(req.params.id);

  if (!user) {
    return res
      .status(404)
      .send({ status: 'error', message: 'User not found.' });
  }

  return res.status(200).send(user);
});

router.post('/', (req, res) => {
  const { firstname, lastname, email } = req.body;

  const user = {
    firstname,
    lastname,
    email,
  };

  const newUser = addUser(user);

  return res.status(200).send({ status: 'success', user: newUser });
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  const user = getUser(userId);

  if (!user) {
    return res
      .status(404)
      .send({ status: 'error', message: 'User not found.' });
  }

  deleteUser(userId);

  return res.status(200).send({ status: 'success', id: userId });
});

module.exports = router;
