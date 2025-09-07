document.addEventListener("DOMContentLoaded", () => {
  // ---------- DADOS DOS EVENTOS ----------
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
      preco: 70.0,
      vagas: 25,
      avaliado: false,
      salas: ["2°A", "1°C"]
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
      preco: 55.0,
      vagas: 30,
      avaliado: false,
      salas: ["3°A", "3°B", "3°C"]
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
      preco: 40.0,
      vagas: 40,
      avaliado: false,
      salas: ["1°C", "2°C", "3°C"]
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
      preco: 0.0,
      vagas: 120,
      avaliado: false,
      salas: ["1°A", "2°A", "3°A"]
    }
  ];

  // ---------- ELEMENTOS DO DOM ----------
  const calendarEl = document.getElementById("calendar");
  const eventsContainer = document.getElementById("events-container");
  const selectedDateEl = document.getElementById("selected-date");
  const calendarioSection = document.querySelector(".calendario");
  const editarSection = document.querySelector(".editar");
  const editCard = document.getElementById("edit-card");
  const templateCard = document.querySelector(".event-item");

  if (!calendarEl || !eventsContainer || !selectedDateEl || !templateCard) return;

  templateCard.remove(); // Remove o template do DOM

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let lastSelectedDate = null;

  // ---------- FUNÇÕES AUXILIARES ----------
  function getFiltroValue() {
    const filtro = document.getElementById("calendar-filter");
    return filtro ? filtro.value : "all";
  }

  function formatCurrency(value) {
    return value === 0 ? "Gratuito" : value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // ---------- GERAR CALENDÁRIO ----------
  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let html = `
      <div class="calendar-nav">
        <button id="prevMonth">&lt;</button>
        <h3>${monthNames[month]} ${year}</h3>
        <button id="nextMonth">&gt;</button>
      </div>
      <div class="calendar-filter">
        <label for="calendar-filter">Filtrar por tipo:</label>
        <select id="calendar-filter">
          <option value="all">Todos</option>
          <option value="Palestra">Palestra</option>
          <option value="Workshop">Workshop</option>
          <option value="Visita Técnica">Visita Técnica</option>
        </select>
      </div>
      <div class="calendar-weekdays">
        <div class="weekday">Dom</div><div class="weekday">Seg</div><div class="weekday">Ter</div>
        <div class="weekday">Qua</div><div class="weekday">Qui</div><div class="weekday">Sex</div><div class="weekday">Sáb</div>
      </div>
      <div class="calendar-days">`;

    for (let i = 0; i < startingDay; i++) html += '<div class="calendar-day empty"></div>';

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const filtroAtual = getFiltroValue();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const past = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const hasEvent = events.some(e => e.date === dateStr && (filtroAtual === "all" || e.tipo === filtroAtual));

      let classes = "calendar-day";
      if (past) classes += " past";
      if (isToday) classes += " today";
      if (hasEvent) classes += " has-event";
      if (lastSelectedDate === dateStr) classes += " active";

      html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }

    html += "</div>";
    calendarEl.innerHTML = html;

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

    calendarEl.querySelectorAll(".calendar-day:not(.empty)").forEach(dayEl => {
      dayEl.addEventListener("click", () => {
        lastSelectedDate = dayEl.dataset.date;
        showEventsForDate(lastSelectedDate);
        calendarEl.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("active"));
        dayEl.classList.add("active");
      });
    });

    const calendarFilter = document.getElementById("calendar-filter");
    if (calendarFilter) {
      calendarFilter.value = filtroAtual;
      calendarFilter.addEventListener("change", () => {
        generateCalendar(currentYear, currentMonth);
        if (lastSelectedDate) showEventsForDate(lastSelectedDate);
      });
    }
  }

  // ---------- MOSTRAR EVENTOS ----------
  function showEventsForDate(date) {
    lastSelectedDate = date;
    const dateObj = new Date(date);
    selectedDateEl.innerHTML = `
      <div class="event-date-block">
        <div class="event-day">${dateObj.toLocaleDateString("pt-BR", { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        <div class="event-weekday">${dateObj.toLocaleDateString("pt-BR", { weekday: 'long' })}</div>
      </div>
    `;

    eventsContainer.innerHTML = "";
    const filtroAtual = getFiltroValue();
    const dayEvents = events.filter(e => e.date === date && (filtroAtual === "all" || e.tipo === filtroAtual));

    if (!dayEvents.length) {
      const msg = document.createElement("p");
      msg.className = "no-events";
      msg.textContent = "Nenhum evento neste dia.";
      eventsContainer.appendChild(msg);
      return;
    }

    dayEvents.forEach(event => {
      const card = templateCard.cloneNode(true);
      card.style.display = "block";

      card.querySelector(".time").textContent = event.time;
      card.querySelector(".time_end").textContent = event.time_end;
      card.querySelector(".tipo").textContent = event.tipo;
      card.querySelector(".nome").textContent = event.nome;
      card.querySelector(".descricao").textContent = event.descricao;
      if (card.querySelector(".rua")) card.querySelector(".rua").textContent = event.rua;
      if (card.querySelector(".numero")) card.querySelector(".numero").textContent = event.numero;
      if (card.querySelector(".bairro")) card.querySelector(".bairro").textContent = event.bairro;
      if (card.querySelector(".cidade")) card.querySelector(".cidade").textContent = event.cidade;
      if (card.querySelector(".estado")) card.querySelector(".estado").textContent = event.estado;
      if (card.querySelector(".cep")) card.querySelector(".cep").textContent = event.cep;
      if (card.querySelector(".preco")) card.querySelector(".preco").textContent = formatCurrency(event.preco);
      if (card.querySelector(".vagas")) card.querySelector(".vagas").textContent = event.vagas;

      // ---------- SALAS ----------
      const salasContainer = card.querySelector(".salas");
      if (salasContainer) {
        salasContainer.innerHTML = "";
        if (event.salas && event.salas.length) {
          event.salas.forEach(sala => {
            const span = document.createElement("span");
            span.className = "sala-box";
            span.textContent = sala;
            salasContainer.appendChild(span);
          });
        } else salasContainer.textContent = "Não definido";
      }

      // ---------- BOTÃO EDITAR ----------
      const editBtn = card.querySelector(".edit-event-btn");
      if (editBtn) {
        const now = new Date();
        if (new Date(event.date + "T" + event.time) < now) {
          editBtn.style.display = "none";
        } else {
          editBtn.style.display = "block";
          editBtn.onclick = () => {
            // Passar o evento via query string
            const params = new URLSearchParams(event).toString();
            window.location.href = `editar.html?${params}`;
          };
        }
      }

      eventsContainer.appendChild(card);
    });
  }

  // ---------- FUNÇÃO ABRIR EDIÇÃO ----------
  function openEditEvent(event) {
    calendarioSection.style.display = "none";
    editarSection.style.display = "block";

    editCard.querySelector("#edit-nome").value = event.nome;
    editCard.querySelector("#edit-descricao").value = event.descricao;
    editCard.querySelector("#edit-data").value = event.date;
    editCard.querySelector("#edit-time").value = event.time;
    editCard.querySelector("#edit-time-end").value = event.time_end;
    editCard.querySelector("#edit-cep").value = event.cep;
    editCard.querySelector("#edit-preco").value = event.preco;
    editCard.querySelector("#edit-vagas").value = event.vagas;

    const form = editCard.querySelector("#edit-event-form");
    form.onsubmit = e => {
      e.preventDefault();
      event.nome = editCard.querySelector("#edit-nome").value;
      event.descricao = editCard.querySelector("#edit-descricao").value;
      event.date = editCard.querySelector("#edit-data").value;
      event.time = editCard.querySelector("#edit-time").value;
      event.time_end = editCard.querySelector("#edit-time-end").value;
      event.cep = editCard.querySelector("#edit-cep").value;
      event.preco = parseFloat(editCard.querySelector("#edit-preco").value) || 0;
      event.vagas = parseInt(editCard.querySelector("#edit-vagas").value);

      editarSection.style.display = "none";
      calendarioSection.style.display = "block";
      generateCalendar(currentYear, currentMonth);
      showEventsForDate(event.date);
    };

    editCard.querySelector("#cancel-edit").onclick = () => {
      editarSection.style.display = "none";
      calendarioSection.style.display = "block";
    };
  }

  // ---------- INICIALIZAÇÃO ----------
  generateCalendar(currentYear, currentMonth);
});
