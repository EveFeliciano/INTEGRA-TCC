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

  // ---------- CALENDÁRIO ----------
  const calendarEl = document.getElementById("calendar");
  const eventsContainer = document.getElementById("events-container");
  const selectedDateEl = document.getElementById("selected-date");
  if (!calendarEl || !eventsContainer || !selectedDateEl) return;

  const templateCard = document.querySelector(".event-item");
  templateCard.remove(); // remove do DOM para clonagem

  const calendarCard = document.getElementById("calendar-card");
  const editCard = document.getElementById("edit-card");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let html = `<div class="calendar-nav">
      <button id="prevMonth">&lt;</button>
      <h3>${monthNames[month]} ${year}</h3>
      <button id="nextMonth">&gt;</button>
    </div><div class="calendar-weekdays">
      <div class="weekday">Dom</div><div class="weekday">Seg</div><div class="weekday">Ter</div>
      <div class="weekday">Qua</div><div class="weekday">Qui</div><div class="weekday">Sex</div><div class="weekday">Sáb</div>
    </div><div class="calendar-days">`;

    for (let i = 0; i < startingDay; i++) html += '<div class="calendar-day empty"></div>';

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isToday = dateStr === todayStr;
      const past = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const hasEvent = events.some(e => e.date === dateStr);
      let classes = "calendar-day";
      if (past) classes += " past";
      if (isToday) classes += " today";
      if (hasEvent) classes += " has-event";
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

    calendarEl.querySelectorAll(".calendar-day:not(.empty)").forEach(day => {
      day.addEventListener("click", () => {
        showEventsForDate(day.dataset.date);
        calendarEl.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("active"));
        day.classList.add("active");
      });
    });
  }

  function showEventsForDate(date) {
    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    selectedDateEl.innerHTML = `<div class="event-date-block">
      <div class="event-day">${dateObj.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</div>
      <div class="event-weekday">${dateObj.toLocaleDateString("pt-BR", { weekday: "long" })}</div>
    </div>`;

    eventsContainer.innerHTML = "";
    const dayEvents = events.filter(e => e.date === date);

    if (dayEvents.length === 0) {
      const msg = document.createElement("p");
      msg.className = "no-events";
      msg.textContent = "Nenhum evento neste dia.";
      eventsContainer.appendChild(msg);
    } else {
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
        if (card.querySelector(".preco")) card.querySelector(".preco").textContent = event.preco;
        if (card.querySelector(".vagas")) card.querySelector(".vagas").textContent = event.vagas;

        // ---------- ADICIONADO: BOTÃO DE EDIÇÃO ----------
        const editBtn = card.querySelector(".edit-event-btn");
        if (editBtn) {
          editBtn.addEventListener("click", () => {
            if (!editCard || !calendarCard) return;

            // ---------- FAZENDO O EDIT-CARD OCUPAR MESMA POSIÇÃO ----------
            const parent = calendarCard.parentNode;
            editCard.style.width = calendarCard.offsetWidth + "px";
            editCard.style.height = calendarCard.offsetHeight + "px";
            editCard.style.display = "block";
            calendarCard.style.display = "none";

            // preenche os campos
            editCard.querySelector("#edit-nome").value = event.nome;
            editCard.querySelector("#edit-tipo").value = event.tipo;
            editCard.querySelector("#edit-descricao").value = event.descricao;
            editCard.querySelector("#edit-data").value = event.date;
            editCard.querySelector("#edit-time").value = event.time;
            editCard.querySelector("#edit-time-end").value = event.time_end;
            editCard.querySelector("#edit-cep").value = event.cep;
            editCard.querySelector("#edit-preco").value = event.preco;
            editCard.querySelector("#edit-vagas").value = event.vagas;

            // ---------- SALVAR EDIÇÃO ----------
            const form = editCard.querySelector("#edit-event-form");
            form.onsubmit = (e) => {
              e.preventDefault();
              event.nome = editCard.querySelector("#edit-nome").value;
              event.tipo = editCard.querySelector("#edit-tipo").value;
              event.descricao = editCard.querySelector("#edit-descricao").value;
              event.date = editCard.querySelector("#edit-data").value;
              event.time = editCard.querySelector("#edit-time").value;
              event.time_end = editCard.querySelector("#edit-time-end").value;
              event.cep = editCard.querySelector("#edit-cep").value;
              event.preco = editCard.querySelector("#edit-preco").value;
              event.vagas = parseInt(editCard.querySelector("#edit-vagas").value);

              editCard.style.display = "none";
              calendarCard.style.display = "block";
              showEventsForDate(event.date);
            };

            // ---------- CANCELAR EDIÇÃO ----------
            const cancelBtn = editCard.querySelector("#cancel-edit");
            cancelBtn.onclick = () => {
              editCard.style.display = "none";
              calendarCard.style.display = "block";
            };
          });
        }

        eventsContainer.appendChild(card);
      });
    }
  }

  generateCalendar(currentYear, currentMonth);
});
