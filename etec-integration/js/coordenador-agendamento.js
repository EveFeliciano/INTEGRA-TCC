document.addEventListener("DOMContentLoaded", () => {
  const createEventBtn = document.getElementById("create-event-btn");
  const eventsContainer = document.getElementById("agendar-events-container");

  // Array de eventos (sem hora e sem UF)
  const events = [
    {
      title: "Programação em Python",
      description: "Aprenda fundamentos de Python aplicados a projetos reais.",
      empresa: "TechCorp",
      type: "Workshop",
      street: "Rua da Tecnologia",
      bairro: "Centro",
      numero: "123",
      cidade: "São Paulo",
      cep: "01234-000",
      price: 70,
      vacancies: 20
    },
    {
      title: "Workshop de Inteligência Artificial",
      description: "Introdução prática à IA e Machine Learning.",
      empresa: "FinanceHub",
      type: "Palestra",
      street: "Av. Inovação",
      bairro: "Copacabana",
      numero: "456",
      cidade: "São Paulo",
      cep: "22000-000",
      price: 100,
      vacancies: 15
    },
    {
      title: "Visita Técnica ao Laboratório de Robótica",
      description: "Conheça o laboratório e participe de atividades práticas.",
      empresa: "HealthCare+",
      type: "Visita Técnica",
      street: "Rua das Engenharias",
      bairro: "Industrial",
      numero: "789",
      cidade: "São Paulo",
      cep: "80000-000",
      price: 0,
      vacancies: 10
    },
    {
      title: "Visita Técnica ao Laboratório de Robótica",
      description: "Conheça o laboratório e participe de atividades práticas.",
      empresa: "InvestPro",
      type: "Visita Técnica",
      street: "Rua das Engenharias",
      bairro: "Industrial",
      numero: "789",
      cidade: "São Paulo",
      cep: "80000-000",
      price: 50,
      vacancies: 10
    },
    {
      title: "Visita Técnica ao Laboratório de Robótica",
      description: "Conheça o laboratório e participe de atividades práticas.",
      empresa: "LearnMore",
      type: "Visita Técnica",
      street: "Rua das Engenharias",
      bairro: "Industrial",
      numero: "789",
      cidade: "São Paulo",
      cep: "80000-000",
      price: 0,
      vacancies: 10
    }
  ];

  // Função para criar os cards
  function populateEvents() {
    const templateCard = document.querySelector(".agendar-event-card");

    events.forEach(event => {
      const card = templateCard.cloneNode(true);
      card.style.display = "block";

      // Preenche título e descrição
      card.querySelector(".agendar-event-title").textContent = event.title;
      card.querySelector(".agendar-event-description").textContent = event.description;

      const details = card.querySelectorAll(".agendar-event-details");

      // Linha 0: Empresa
      details[0].querySelectorAll(".value")[0].textContent = event.empresa;

      // Linha 1: Tipo
      details[1].querySelectorAll(".value")[0].textContent = event.type;

      // Linha 2: Rua
      details[2].querySelectorAll(".value")[0].textContent = event.street;

      // Linha 3: Bairro / N°
      const bairroValues = details[3].querySelectorAll(".value");
      bairroValues[0].textContent = event.bairro;
      bairroValues[1].textContent = event.numero;

      // Linha 4: Cidade / CEP
      const cidadeValues = details[4].querySelectorAll(".value");
      cidadeValues[0].textContent = event.cidade;
      cidadeValues[1].textContent = event.cep;

      // Linha 5: Valor / Vagas
      const valorValues = details[5].querySelectorAll(".value");
      valorValues[0].textContent = event.price === 0 ? "Gratuito" : `R$ ${event.price.toFixed(2).replace('.', ',')}`;
      valorValues[1].textContent = event.vacancies;

      // Botão agendar
      const agendarBtn = card.querySelector(".agendar-event-btn");
      agendarBtn.addEventListener("click", () => {
        alert(`Evento "${event.title}" agendado com sucesso!`);
      });

      eventsContainer.appendChild(card);
    });
  }

  // Evento do botão Criar Palestra
  createEventBtn.addEventListener("click", () => {
    alert("Abrir janela para criar palestra (em desenvolvimento).");
  });

  // Popula os cards ao carregar
  populateEvents();
});
