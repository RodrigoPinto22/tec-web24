document.addEventListener('DOMContentLoaded', () => {
    // Função para login
    async function Submit() {
      const username = document.getElementById('Username').value;
      const password = document.getElementById('Password').value;
  
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Exibe mensagem de login ou criação de usuário
          document.getElementById('Username').disabled = true; // Desabilita o campo de username (se quiser não alterar o nome)
          document.getElementById('Password').disabled = true; // Desabilita o campo de senha
        } else {
          alert(data.message); // Exibe mensagem de erro
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
      }
    }
  
    // Função para logout
    async function logout() {
      const username = document.getElementById('Username').value;
  
      try {
        const response = await fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
  
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Exibe mensagem de logout
          document.getElementById('Username').disabled = false; // Reabilita o campo de username
          document.getElementById('Password').disabled = false; // Reabilita o campo de senha
        } else {
          alert(data.message); // Exibe mensagem de erro
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
      }
    }
  
    // Certifique-se de que o botão de logout existe
    const logoutButton = document.getElementById('DaResetUser');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    } else {
      console.error('Botão de logout não encontrado!');
    }
  
    // Adiciona o evento de login
    document.getElementById('Submit').addEventListener('click', Submit);
  });
  