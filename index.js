const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkIdProject(req, res, next) {
  const { id } = req.params;
  if (!projects.find(project => project.id === id)) {
    return res.status(400).send({ error: "O projeto não existe" });
  }

  return next();
}
var counter = 0;
server.use((req, res, next) => {
  if (req) {
    console.log(++counter);
  }
  next();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(project => project.id === id);
  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkIdProject, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(project => project.id === id);

  projects.splice(index, 1);

  res.send();
});

server.post("/projects/:id/tasks", checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex(project => project.id === id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
