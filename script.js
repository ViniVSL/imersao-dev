document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.querySelector('.card-container');

  const carregarArtesMarciais = async () => {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      data.forEach(arte => {
        const card = document.createElement('article');
        card.classList.add('card');

        // Cria um nome de classe a partir do nome da arte marcial
        // Ex: "Jiu-Jitsu Brasileiro" -> "card-jiu-jitsu-brasileiro"
        const className = 'card-' + arte.nome.toLowerCase().replace(/ /g, '-').replace(/ê/g, 'e').replace(/ô/g, 'o');
        card.classList.add(className);

        card.innerHTML = `
          <h3>${arte.nome}</h3>
          <p class="origem">${arte.origem}</p>
          <p class="descricao">${arte.descricao}</p>
          <a href="${arte.informacoes}" target="_blank" rel="noopener noreferrer">Saiba Mais</a>
        `;

        cardContainer.appendChild(card);
      });

    } catch (error) {
      console.error("Não foi possível carregar os dados das artes marciais:", error);
      cardContainer.innerHTML = '<p>Erro ao carregar as informações. Tente novamente mais tarde.</p>';
    }
  };

  carregarArtesMarciais();
});
