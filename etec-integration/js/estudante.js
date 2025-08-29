// Dashboard do Estudante - JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Visita Técnica - Indústria Automobilística",
      description: "Conhecer os processos de produção e tecnologias utilizadas na indústria automotiva.",
      date: "2025-09-15",
      time: "14:00",
      type: "visita",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Palestra - Inovação Tecnológica",
      description: "Discussão sobre as últimas tendências em tecnologia e inovação.",
      date: "2025-09-18",
      time: "10:00",
      type: "palestra",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Visita Técnica - Laboratório de Pesquisa",
      description: "Explorar as instalações e projetos de pesquisa em andamento.",
      date: "2025-09-22",
      time: "09:00",
      type: "visita",
      status: "upcoming",
    },
  ];

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  const calendarElement = document.getElementById("calendar");

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

    // Empty cells for first week
    for (let i = 0; i < startingDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    const todayStr = new Date().toISOString().split("T")[0];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isToday = dateStr === todayStr;
      const past = new Date(dateStr) < new Date(todayStr);
      const hasEvent = events.some(event => event.date === dateStr);

      let classes = "calendar-day";
      if (past) classes += " past";
      if (isToday) classes += " today";
      if (hasEvent) classes += " has-event";

      html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
    }

    html += "</div>";
    calendarElement.innerHTML = html;

    // Month navigation
    document.getElementById("prevMonth").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentYear, currentMonth);
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentYear, currentMonth);
    });

    // Day click
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

    const dateObj = new Date(date);
    selectedDateElement.textContent = dateObj.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const dayEvents = events.filter(event => event.date === date);

    if (dayEvents.length === 0) {
      eventsContainer.innerHTML = '<p class="no-events">Nenhum evento programado para esta data.</p>';
    } else {
      eventsContainer.innerHTML = dayEvents.map(event => `
        <div class="event-item">
          <div class="event-time">${event.time}</div>
          <div class="event-title">${event.title}</div>
          <div class="event-description">${event.description}</div>
        </div>
      `).join("");
    }
  }

  function loadUpcomingEvents() {
    const container = document.getElementById("upcoming-events");
    const upcoming = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

    if (upcoming.length === 0) {
      container.innerHTML = '<p class="no-events">Nenhum evento próximo.</p>';
    } else {
      container.innerHTML = upcoming.map(event => {
        const eventDate = new Date(event.date);
        const formatted = eventDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
        return `
          <div class="event-item">
            <div class="event-date">${formatted} • ${event.time}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
          </div>
        `;
      }).join("");
    }
  }

  // Initialize
  generateCalendar(currentYear, currentMonth);
  loadUpcomingEvents();
});
