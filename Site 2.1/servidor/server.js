const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Simulação de banco de dados de usuários
const users = [
  { username: 'player1', password: 'password123', isLoggedIn: false },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint para autenticação (login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário existe
  const user = users.find(u => u.username === username);

  if (user) {
    // Verificar a senha
    if (user.password === password) {
      if (user.isLoggedIn) {
        return res.status(403).json({ success: false, message: 'Usuário já está logado.' });
      }
      // Marcar o usuário como logado
      user.isLoggedIn = true;
      return res.json({ success: true, message: 'Login realizado com sucesso!' });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
  } else {
    // Se o usuário não existir, cria um novo usuário
    users.push({ username, password, isLoggedIn: true });
    return res.json({ success: true, message: 'Novo usuário criado e logado com sucesso!' });
  }
});

// Endpoint para logout (resetar o status de login)
app.post('/logout', (req, res) => {
  const { username } = req.body;

  // Encontra o usuário e marca como deslogado
  const user = users.find(u => u.username === username);

  if (user && user.isLoggedIn) {
    user.isLoggedIn = false;
    return res.json({ success: true, message: 'Logout realizado com sucesso!' });
  } else {
    return res.status(400).json({ success: false, message: 'Nenhum usuário logado com esse nome.' });
  }
});

// Endpoint para editar nome de usuário (impedir alteração se já estiver logado)
app.post('/update-username', (req, res) => {
  const { oldUsername, newUsername } = req.body;
  const user = users.find(u => u.username === oldUsername);

  if (user) {
    if (user.isLoggedIn) {
      return res.status(403).json({ success: false, message: 'Não é possível alterar o nome de usuário enquanto está logado.' });
    } else {
      user.username = newUsername;
      return res.json({ success: true, message: 'Nome de usuário atualizado com sucesso!' });
    }
  } else {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
