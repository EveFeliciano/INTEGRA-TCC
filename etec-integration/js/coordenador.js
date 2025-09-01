// Eventos
window.events = [
  { date: "2025-09-05", time: "14:00", tipo: "Palestra", nome: "IA na Prática", descricao: "Introdução à IA aplicada" },
  { date: "2025-09-10", time: "10:00", tipo: "Visita", nome: "TechSolutions", descricao: "Tour técnico para alunos" },
  { date: "2025-09-15", time: "16:30", tipo: "Workshop", nome: "Python Avançado", descricao: "Aprendendo bibliotecas avançadas" }
];

document.addEventListener("DOMContentLoaded", () => {
  const calendarElement = document.getElementById("calendar");
  const eventsContainer = document.getElementById("events-container");
  const selectedDateEl = document.getElementById("selected-date");

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let html = `<div class="calendar-nav">
            <button class="month-nav" id="prevMonth">&lt;</button>
            <h3>${monthNames[month]} ${year}</h3>
            <button class="month-nav" id="nextMonth">&gt;</button>
        </div>
        <div class="calendar-weekdays">
            <div class="weekday">Dom</div><div class="weekday">Seg</div><div class="weekday">Ter</div>
            <div class="weekday">Qua</div><div class="weekday">Qui</div><div class="weekday">Sex</div><div class="weekday">Sáb</div>
        </div>
        <div class="calendar-days">`;

    for (let i = 0; i < startingDay; i++) html += '<div class="calendar-day empty"></div>';

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isToday = dateStr === todayStr;
      const past = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const hasEvent = window.events.some(e => e.date === dateStr);

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
    selectedDateEl.textContent = `Eventos de ${date}`;
    eventsContainer.innerHTML = "";

    const eventsForDay = window.events.filter(e => e.date === date);

    if (eventsForDay.length === 0) {
      const noEvent = document.createElement("div");
      noEvent.className = "no-upcoming-events";
      noEvent.textContent = "Nenhum evento neste dia.";
      eventsContainer.appendChild(noEvent);
      return;
    }

    eventsForDay.forEach(event => {
      // Clonar o card existente
      const templateCard = document.querySelector(".event-item");
      const card = templateCard.cloneNode(true);
      card.style.display = "block"; // Mostrar o card
      card.querySelector(".time").textContent = event.time;
      card.querySelector(".tipo").textContent = event.tipo;
      card.querySelector(".nome").textContent = event.nome;
      card.querySelector(".descricao").textContent = event.descricao;

      eventsContainer.appendChild(card);
    });
  }

  generateCalendar(currentYear, currentMonth);
});
