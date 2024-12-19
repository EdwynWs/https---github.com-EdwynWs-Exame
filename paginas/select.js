async function populateSelect(url, selectId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados de ${url}`);
      }
  
      const data = await response.json();
      const select = document.getElementById(selectId);
  
      if (!select) {
        console.error(`Elemento <select> com ID "${selectId}" não encontrado.`);
        return;
      }
  
      select.innerHTML = '<option value="">Selecione</option>'; 
  
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.nome;
        option.textContent = item.nome; 
        select.appendChild(option);
      });
    } catch (error) {
      console.error(`Erro ao popular <select> (${selectId}):`, error);
      alert("Erro ao carregar os dados. Tente novamente mais tarde.");
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    populateSelect("/api/interessados", "interessado"); 
    populateSelect("/api/pets", "pet"); 
  });
  