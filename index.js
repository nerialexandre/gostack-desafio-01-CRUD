const express = require('express');

const app = express();

app.use(express.json());

let numberRequests = 0;
const projects = [];

// mostra numero de requisicoes feitas
app.use((req, res, next) => {
  numberRequests += 1;
  console.log(`Requisição numero: ${numberRequests}`);
  return next();
});

// verificar se id existe
function checkid(req, res, next) {
  const { id } = req.params;
  const checkId = projects.find((element) => element.id === id);
  if (!checkId) {
    return res.json('Digite o id valido');
  }
  return next();
}
// lista todos os usuarios
app.get('/projects', (req, res) => res.json(projects));

// add usuario
app.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: [],
  });
  return res.json(projects);
});

// add task
app.post('/projects/:id/tasks', (req, res) => {
  const { tasks } = req.body;
  const { id } = req.params;
  const index = projects.findIndex((x) => x.id === id);
  projects[index].tasks.push(tasks);
  return res.json(projects);
});

// atualizar titulo
app.put('/projects/:id', checkid, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex((x) => x.id === id);
  projects[index].title = title;
  return res.json(projects);
});

// deletar usuario
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex((x) => x.id === id);
  projects.splice(index, 1);
  res.send();
});

app.listen(3333);
