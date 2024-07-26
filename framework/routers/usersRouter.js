import Router from "../Router.js";

export const usersRouter = new Router();

const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

usersRouter.get('/users', (req, res) => {
  if (req.params.id) {
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
      return res.send(user);
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
  } else {
    res.send(users);
  }
});

usersRouter.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser && newUser.name) { // Можно добавить более строгую валидацию
    users.push({ id: users.length + 1, ...newUser });
    res.send(newUser);
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid user data' }));
  }
});
