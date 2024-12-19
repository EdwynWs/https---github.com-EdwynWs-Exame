import express from "express";
import path from "path";
import { fileURLToPath } from "url";

let ultimoAcesso = new Date().toLocaleString(); 
const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static('./paginas'));
app.use(express.json()); 

const interessados = [];
const pets = [];
const desejos = [];


app.get('/', (req, res) => {
  res.redirect('/menu.html');
});


app.get('/menu.html', (req, res) => {
  ultimoAcesso = new Date().toLocaleString();
  res.sendFile(path.join(__dirname, 'paginas', 'menu.html'));
});


app.get('/api/ultimo-acesso', (req, res) => {
  res.json({ ultimoAcesso });
});


app.post('/api/interessados', (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }
    interessados.push({ nome, email, telefone });
    console.log("Interessado cadastrado:", { nome, email, telefone }); 
    res.status(201).json({ message: "Interessado cadastrado com sucesso!" });
  });
  app.get('/api/interessados', (req, res) => {
    res.json(interessados);
  });
  


app.get('/api/pets', (req, res) => {
  res.json(pets); 
});

app.post('/api/pets', (req, res) => {
  const { nome, raca, idade } = req.body;
  if (!nome || !raca || !idade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }
  pets.push({ nome, raca, idade });
  res.status(201).json({ message: "Pet cadastrado com sucesso!" });
});


app.get('/api/desejos', (req, res) => {
  res.json(desejos); 
});

app.post('/api/desejos', (req, res) => {
  const { interessado, pet } = req.body;
  if (!interessado || !pet) {
    return res.status(400).json({ error: "Selecione um interessado e um pet!" });
  }
  desejos.push({ interessado, pet, data: new Date().toLocaleString() });
  res.status(201).json({ message: "Desejo de adoção registrado com sucesso!" });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
