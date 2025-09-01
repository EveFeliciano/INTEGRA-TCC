document.addEventListener("DOMContentLoaded", () => {
  // ---------- DADOS DOS EVENTOS (única declaração) ----------
  const events = [
    {
      id: 1,
      tipo: "Workshop",
      nome: "Programação em Python",
      descricao: "Aprenda fundamentos de Python aplicados a projetos reais.",
      date: "2025-08-28",
      time: "14:00",
      time_end: "18:00",
      rua: "Rua da Tecnologia",
      numero: "320",
      bairro: "Vila Tech",
      cidade: "São Paulo",
      estado: "SP",
      cep: "03030-030",
      preco: "R$70,00",
      vagas: 25,
      avaliado: false
    },
    {
      id: 2,
      tipo: "Visita Técnica",
      nome: "Ibirapuera",
      descricao: "Conhecer o Museu Afro e Parque Ibirapuera.",
      date: "2025-09-05",
      time: "10:00",
      time_end: "16:00",
      rua: "Av. Pedro Álvares Cabral",
      numero: "2000",
      bairro: "Ibirapuera",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04094-050",
      preco: "R$55,00",
      vagas: 30,
      avaliado: false
    },
    {
      id: 3,
      tipo: "Palestra",
      nome: "Inovação Tecnológica",
      descricao: "Discussão sobre as últimas tendências em tecnologia e inovação.",
      date: "2025-09-18",
      time: "10:00",
      time_end: "15:00",
      rua: "Rua da Inovação",
      numero: "150",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01010-010",
      preco: "R$40,00",
      vagas: 40,
      avaliado: false
    },
    {
      id: 4,
      tipo: "Visita Técnica",
      nome: "Laboratório de Pesquisa",
      descricao: "Explorar as instalações e projetos de pesquisa em andamento.",
      date: "2025-09-22",
      time: "09:00",
      time_end: "13:00",
      rua: "Av. Ciência e Tecnologia",
      numero: "500",
      bairro: "Vila Nova",
      cidade: "São Paulo",
      estado: "SP",
      cep: "02020-020",
      preco: "Gratuito",
      vagas: 120,
      avaliado: false
    }
  ];

  // ---------- PÁGINA 1: Dashboard com Calendário ----------
  const calendarElement = document.getElementById("calendar");
  if (calendarElement) {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function generateCalendar(year, month) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();

      const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      let html = `
        <div class="calendar-nav">
          <button class="month-nav" id="prevMonth">&lt;</button>
          <h3>${monthNames[month]} ${year}</h3>
          <button class="month-nav" id="nextMonth">&gt;</button>
        </div>
        <div class="calendar-weekdays">
          <div class="weekday">Dom</div>
          <div class="weekday">Seg</div>
          <div class="weekday">Ter</div>
          <div class="weekday">Qua</div>
          <div class="weekday">Qui</div>
          <div class="weekday">Sex</div>
          <div class="weekday">Sáb</div>
        </div>
        <div class="calendar-days">
      `;

      for (let i = 0; i < startingDay; i++) {
        html += '<div class="calendar-day empty"></div>';
      }

      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const isToday = dateStr === todayStr;
        const past = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const hasEvent = events.some(event => event.date === dateStr);

        let classes = "calendar-day";
        if (past) classes += " past";
        if (isToday) classes += " today";
        if (hasEvent) classes += " has-event";

        html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
      }

      html += "</div>";
      calendarElement.innerHTML = html;

      document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth = currentMonth > 0 ? currentMonth - 1 : 11;
        if (currentMonth === 11) currentYear--;
        generateCalendar(currentYear, currentMonth);
      });

      document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth = currentMonth < 11 ? currentMonth + 1 : 0;
        if (currentMonth === 0) currentYear++;
        generateCalendar(currentYear, currentMonth);
      });

      const days = calendarElement.querySelectorAll(".calendar-day:not(.empty)");
      days.forEach(day => {
        day.addEventListener("click", () => {
          showEventsForDate(day.dataset.date);
          days.forEach(d => d.classList.remove("active"));
          day.classList.add("active");
        });
      });
    }

    function showEventsForDate(date) {
      const selectedDateElement = document.getElementById("selected-date");
      const eventsContainer = document.getElementById("events-container");
      if (!selectedDateElement || !eventsContainer) return;

      const cards = eventsContainer.querySelectorAll(".event-item");

      const [year, month, day] = date.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);

      selectedDateElement.innerHTML = `
        <div class="event-date-block">
          <div class="event-day">${dateObj.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</div>
          <div class="event-weekday">${dateObj.toLocaleDateString("pt-BR", { weekday: "long" })}</div>
        </div>
      `;

      const dayEvents = events.filter(event => event.date === date);

      cards.forEach(card => card.style.display = "none");
      const oldMsg = eventsContainer.querySelector(".no-events, .event-passed");
      if (oldMsg) oldMsg.remove();

      if (dayEvents.length === 0) {
        const msg = document.createElement("p");
        msg.classList.add("no-events");
        msg.style.textAlign = "center";
        msg.textContent = "Nenhum evento programado para esta data.";
        eventsContainer.appendChild(msg);
      } else {
        dayEvents.forEach((event, index) => {
          const today = new Date();
          const eventParts = event.date.split("-").map(Number);
          const eventDate = new Date(eventParts[0], eventParts[1] - 1, eventParts[2]);

          if (eventDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            const passedMsg = document.createElement("div");
            passedMsg.classList.add("event-passed");
            passedMsg.style.textAlign = "center";
            passedMsg.innerHTML = `
              <p>Este evento já ocorreu.</p>
              <a href="avaliar.html" class="button primary-button full-width">Avaliar Evento</a>
            `;
            eventsContainer.appendChild(passedMsg);
          } else {
            const card = cards[index];
            if (card) {
              card.querySelector(".time").textContent = event.time;
              card.querySelector(".tipo").textContent = event.tipo;
              card.querySelector(".nome").textContent = event.nome;
              card.querySelector(".descricao").textContent = event.descricao;
              if (card.querySelector(".time_end")) card.querySelector(".time_end").textContent = event.time_end;
              if (card.querySelector(".rua")) card.querySelector(".rua").textContent = event.rua;
              if (card.querySelector(".numero")) card.querySelector(".numero").textContent = event.numero;
              if (card.querySelector(".bairro")) card.querySelector(".bairro").textContent = event.bairro;
              if (card.querySelector(".cidade")) card.querySelector(".cidade").textContent = event.cidade;
              if (card.querySelector(".estado")) card.querySelector(".estado").textContent = event.estado;
              if (card.querySelector(".cep")) card.querySelector(".cep").textContent = event.cep;
              if (card.querySelector(".preco")) card.querySelector(".preco").textContent = event.preco;
              if (card.querySelector(".vagas")) card.querySelector(".vagas").textContent = event.vagas;
              card.style.display = "block";
            }
          }
        });
      }
    }

    function loadUpcomingEvents() {
      const container = document.getElementById("upcoming-events");
      if (!container) return;

      // Reaproveita a lista de eventos futuros
      const today = new Date();
      const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const upcomingEvents = events.filter(e => {
        const [year, month, day] = e.date.split("-").map(Number);
        const eventDate = new Date(year, month - 1, day);
        return eventDate >= todayLocal;
      });

      // Atualiza contador
      const eventCountEl = document.getElementById("event-count");
      if (eventCountEl) eventCountEl.textContent = upcomingEvents.length;

      if (upcomingEvents.length === 0) {
        container.innerHTML = '<p class="no-events">Nenhum evento próximo.</p>';
        return;
      }

      container.innerHTML = upcomingEvents.slice(0, 2).map(event => {
        const [year, month, day] = event.date.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const formatted = date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
        const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });

        return `
      <div class="upcoming-event-card">
        <div class="upcoming-event-header">
          <div class="upcoming-event-date">${formatted}</div>
          <div class="upcoming-event-weekday">${weekday}</div>
          <div class="upcoming-event-time">${event.time}</div>
        </div>
        <div class="upcoming-event-info">
          <div class="upcoming-event-type">${event.tipo}</div>
          <div class="upcoming-event-name">${event.nome}</div>
          <div class="upcoming-event-description">${event.descricao}</div>
          <div class="upcoming-event-address">${event.rua}, ${event.numero} - ${event.bairro}, ${event.cidade}</div>
        </div>
      </div>
    `;
      }).join("");
    }

    // ---------- ATUALIZA CONTADORES ----------
    function updateStats() {
      const today = new Date();
      const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      // Eventos Agendados (futuros)
      const upcomingCount = events.filter(e => {
        const [y, m, d] = e.date.split("-").map(Number);
        const eventDate = new Date(y, m - 1, d);
        return eventDate >= todayLocal;
      }).length;

      const upcomingEl = document.getElementById("upcoming-events-count");
      if (upcomingEl) upcomingEl.textContent = upcomingCount;

      // Notas Pendentes (eventos passados não avaliados)
      const pendingRatingsCount = events.filter(e => {
        const [y, m, d] = e.date.split("-").map(Number);
        const eventDate = new Date(y, m - 1, d);
        return eventDate < todayLocal && !e.avaliado;
      }).length;

      const pendingEl = document.getElementById("pending-ratings");
      if (pendingEl) pendingEl.textContent = pendingRatingsCount;

      // Notas Anteriores (eventos passados avaliados)
      const previousRatingsCount = events.filter(e => {
        const [y, m, d] = e.date.split("-").map(Number);
        const eventDate = new Date(y, m - 1, d);
        return eventDate < todayLocal && e.avaliado;
      }).length;

      const previousEl = document.getElementById("previous-ratings-count");
      if (previousEl) previousEl.textContent = previousRatingsCount;
    }

    // Executa no carregamento
    updateStats();

    generateCalendar(currentYear, currentMonth);
    loadUpcomingEvents();
  }

  // ---------- PÁGINA 2: Lista de Eventos Passados/Futuros ----------
  const pastContainer = document.getElementById("past-events");
  const futureContainer = document.getElementById("future-events");
  const previousRatingsContainer = document.getElementById("previous-ratings");

  if (pastContainer && futureContainer) {
    const pastTemplate = pastContainer.querySelector(".template").cloneNode(true);
    const futureTemplate = futureContainer.querySelector(".template").cloneNode(true);
    pastContainer.innerHTML = "";
    futureContainer.innerHTML = "";

    function getCountdown(dateStr) {
      const eventDate = new Date(dateStr);
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) return "Evento iniciado";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function renderEvents() {
      const today = new Date();

      events.forEach(event => {
        const eventDate = new Date(event.date);
        const isPast = eventDate < today;

        const card = (isPast ? pastTemplate : futureTemplate).cloneNode(true);
        card.classList.remove("template");
        card.dataset.id = event.id;
        card.querySelector(".card-name").textContent = event.nome;
        card.querySelector(".card-type").textContent = event.tipo;
        card.querySelector(".card-description").textContent = event.descricao;

        if (!isPast) {
          const countdownEl = card.querySelector(".card-countdown");
          setInterval(() => {
            countdownEl.textContent = getCountdown(event.date + "T" + event.time);
          }, 1000);
        }

        (isPast ? pastContainer : futureContainer).appendChild(card);
      });
    }

    renderEvents();
  }

  // ---------- FUNÇÃO DE ESTRELAS E AVALIAÇÃO ----------
  function renderStars(container, rating) {
    const stars = container.querySelectorAll("i");
    stars.forEach(star => {
      const value = parseInt(star.dataset.value);
      star.classList.toggle("filled", value <= rating);
    });
  }

  function attachStarEvents(card) {
    const stars = card.querySelectorAll(".rating-stars i");
    let selectedRating = 0;

    stars.forEach(star => {
      star.addEventListener("mouseover", () => {
        const hoverValue = parseInt(star.dataset.value);
        stars.forEach(s => s.classList.toggle("filled", parseInt(s.dataset.value) <= hoverValue));
      });

      star.addEventListener("mouseout", () => {
        renderStars(card.querySelector(".rating-stars"), selectedRating);
      });

      star.addEventListener("click", () => {
        selectedRating = parseInt(star.dataset.value);
        renderStars(card.querySelector(".rating-stars"), selectedRating);
      });
    });

    const btn = card.querySelector(".submit-rating");
    if (btn) {
      btn.addEventListener("click", () => {
        if (selectedRating === 0) {
          alert("Selecione uma nota antes de avaliar.");
          return;
        }

        // Remove o botão
        btn.remove();

        // Remove todos os listeners das estrelas para desativar alterações
        stars.forEach(star => {
          star.replaceWith(star.cloneNode(true));
        });

        // Move para Notas Anteriores
        previousRatingsContainer.appendChild(card);

        // Preenche as estrelas permanentemente
        renderStars(card.querySelector(".rating-stars"), selectedRating);
      });
    }
  }

  // Inicializa todos os cards de eventos passados (clone do template ou existentes)
  const pastCards = pastContainer.querySelectorAll(".past-event-card:not(.template)");
  pastCards.forEach(card => attachStarEvents(card));
});
