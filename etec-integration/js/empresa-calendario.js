// Dashboard do Estudante - JS completo atualizado
document.addEventListener("DOMContentLoaded", () => {
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
        vagas: 25
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
        vagas: 30
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
        vagas: 40
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
        vagas: 120
      }
    ];
  
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const calendarElement = document.getElementById("calendar");
  
    // ---------- Função de Geração do Calendário ----------
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
  
      // células vazias antes do primeiro dia
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
  
      // Navegação de meses
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
  
      // clique nos dias
      const days = calendarElement.querySelectorAll(".calendar-day:not(.empty)");
      days.forEach(day => {
        day.addEventListener("click", () => {
          showEventsForDate(day.dataset.date);
          days.forEach(d => d.classList.remove("active"));
          day.classList.add("active");
        });
      });
    }
  
    // ---------- Função para Mostrar Eventos de um Dia ----------
    function showEventsForDate(date) {
      const selectedDateElement = document.getElementById("selected-date");
      const eventsContainer = document.getElementById("events-container");
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
  
      // Esconde todos os cards
      cards.forEach(card => card.style.display = "none");
  
      // Remove mensagem antiga
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
            // Evento já passou
            const passedMsg = document.createElement("div");
            passedMsg.classList.add("event-passed");
            passedMsg.style.textAlign = "center";
            passedMsg.innerHTML = `
              <p>Este evento já ocorreu.</p>
              <a href="avaliar.html" class="button primary-button full-width">Avaliar Evento</a>
            `;
            eventsContainer.appendChild(passedMsg);
          } else {
            if (cards[index]) {
              cards[index].querySelector(".time").textContent = event.time;
              cards[index].querySelector(".tipo").textContent = event.tipo;
              cards[index].querySelector(".nome").textContent = event.nome;
              cards[index].querySelector(".descricao").textContent = event.descricao;
  
              if (cards[index].querySelector(".time_end")) cards[index].querySelector(".time_end").textContent = event.time_end;
              if (cards[index].querySelector(".rua")) cards[index].querySelector(".rua").textContent = event.rua;
              if (cards[index].querySelector(".numero")) cards[index].querySelector(".numero").textContent = event.numero;
              if (cards[index].querySelector(".bairro")) cards[index].querySelector(".bairro").textContent = event.bairro;
              if (cards[index].querySelector(".cidade")) cards[index].querySelector(".cidade").textContent = event.cidade;
              if (cards[index].querySelector(".estado")) cards[index].querySelector(".estado").textContent = event.estado;
              if (cards[index].querySelector(".cep")) cards[index].querySelector(".cep").textContent = event.cep;
              if (cards[index].querySelector(".preco")) cards[index].querySelector(".preco").textContent = event.preco;
              if (cards[index].querySelector(".vagas")) cards[index].querySelector(".vagas").textContent = event.vagas;
  
              cards[index].style.display = "block";
            }
          }
        });
      }
    }
  
    // ---------- Função para Carregar Próximos Eventos ----------
    function loadUpcomingEvents() {
      const container = document.getElementById("upcoming-events");
      const today = new Date();
  
      const upcoming = events
        .filter(e => {
          const parts = e.date.split("-").map(Number);
          const eventDate = new Date(parts[0], parts[1] - 1, parts[2]);
          return eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
        })
        .sort((a, b) => {
          const aParts = a.date.split("-").map(Number);
          const bParts = b.date.split("-").map(Number);
          const aDate = new Date(aParts[0], aParts[1] - 1, aParts[2]);
          const bDate = new Date(bParts[0], bParts[1] - 1, bParts[2]);
          return aDate - bDate;
        })
        .slice(0, 3);
  
      if (upcoming.length === 0) {
        container.innerHTML = '<p class="no-events">Nenhum evento próximo.</p>';
        return;
      }
  
      container.innerHTML = upcoming.map(event => {
        const parts = event.date.split("-").map(Number);
        const eventDate = new Date(parts[0], parts[1] - 1, parts[2]);
        const formattedDate = eventDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
        const weekday = eventDate.toLocaleDateString("pt-BR", { weekday: "long" });
  
        return `
          <div class="upcoming-event-card">
            <div class="upcoming-event-header">
              <div class="upcoming-event-date">${formattedDate}</div>
              <div class="upcoming-event-weekday">${weekday}</div>
              <div class="upcoming-event-time">${event.time}</div>
            </div>
            <div class="upcoming-event-info">
              <div class="upcoming-event-type">${event.tipo}</div>
              <div class="upcoming-event-name">${event.nome}</div>
              <div class="upcoming-event-description">${event.descricao}</div>
              <div class="upcoming-event-address">
                ${event.rua}, ${event.numero} - ${event.bairro}, ${event.cidade}
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  
    // Inicializa
    generateCalendar(currentYear, currentMonth);
    loadUpcomingEvents();
  });