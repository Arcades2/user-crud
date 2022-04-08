const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getUsers = () => {
  const rawData = fs.readFileSync('./db/users.json');

  return JSON.parse(rawData);
};

const getUser = (id) => {
  const users = getUsers();

  const user = users.find((u) => u.id === id);

  return user;
};

const addUser = (user) => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };

  const users = getUsers();

  const newUsers = [...users, newUser];

  fs.writeFileSync('./db/users.json', JSON.stringify(newUsers, null, 2));

  return newUser;
};

const deleteUser = (id) => {
  const users = getUsers();

  const newUsers = users.filter((u) => u.id !== id);

  fs.writeFileSync('./db/users.json', JSON.stringify(newUsers, null, 2));

  return id;
};

module.exports = { getUsers, getUser, addUser, deleteUser };
