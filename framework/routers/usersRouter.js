import Router from "../Router.js";

export const usersRouter = new Router();

const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

usersRouter.get('/users', (req, res) => {
  if (req.params.id) {
    return users.find(user => user.id === Number(req.params.id));
  }
  res.send(users);
});

usersRouter.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send(newUser);
});
