
async function fetchAndRenderInteressados() {
    try {
      const response = await fetch('/api/interessados');
      if (!response.ok) throw new Error('Erro ao buscar interessados');
  
      const data = await response.json();
      console.log("Dados recebidos dos interessados:", data); 
  
      const lista = document.getElementById('listaInteressados');
      lista.innerHTML = ""; 
  
      if (data.length === 0) {
        lista.innerHTML = "<li>Nenhum interessado cadastrado.</li>";
        return;
      }
  
      data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.email} - ${item.telefone}`;
        lista.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao carregar os interessados:", error);
      alert("Erro ao carregar os interessados. Tente novamente mais tarde.");
    }
  }
  
 
  document.addEventListener("DOMContentLoaded", fetchAndRenderInteressados);
  