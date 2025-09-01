document.addEventListener("DOMContentLoaded", () => {
  // Sample data for company dashboard
  const eventosDisponiveis = [
    {
      id: 1,
      titulo: "Visita Técnica - Desenvolvimento de Software",
      tipo: "Visita Técnica",
      descricao: "Conhecer nosso ambiente de desenvolvimento e metodologias ágeis",
      duracao: "2 horas",
      capacidade: "30 alunos",
      disponibilidade: "Segunda a Sexta, 14h às 16h",
      status: "ativo",
    },
    {
      id: 2,
      titulo: "Palestra: Inteligência Artificial na Prática",
      tipo: "Palestra",
      descricao: "Como a IA está transformando o mercado de trabalho",
      duracao: "1 hora",
      capacidade: "100 alunos",
      disponibilidade: "Terças e Quintas, 19h às 20h",
      status: "ativo",
    },
    {
      id: 3,
      titulo: "Workshop: Metodologias Ágeis",
      tipo: "Workshop",
      descricao: "Hands-on com Scrum e Kanban",
      duracao: "3 horas",
      capacidade: "25 alunos",
      disponibilidade: "Sábados, 9h às 12h",
      status: "ativo",
    },
  ]

  const eventosAgendados = [
    {
      id: 1,
      titulo: "Visita Técnica - ETEC Zona Leste",
      tipo: "Visita Técnica",
      data: new Date(2025, 4, 25),
      horario: "14:00 - 16:00",
      etec: "ETEC Zona Leste",
      turma: "3º DS",
      alunos: 28,
      status: "confirmado",
    },
    {
      id: 2,
      titulo: "Palestra IA - FATEC São Paulo",
      tipo: "Palestra",
      data: new Date(2025, 4, 27),
      horario: "19:00 - 20:00",
      etec: "FATEC São Paulo",
      turma: "2º ADS",
      alunos: 45,
      status: "confirmado",
    },
    {
      id: 3,
      titulo: "Workshop Ágil - ETEC Centro",
      tipo: "Workshop",
      data: new Date(2025, 4, 30),
      horario: "09:00 - 12:00",
      etec: "ETEC Centro",
      turma: "3º ADM",
      alunos: 22,
      status: "pendente",
    },
  ]

  const palestrantes = [
    {
      id: 1,
      nome: "Ana Silva",
      area: "Inteligência Artificial",
      contato: "ana.silva@techsolutions.com",
      telefone: "(11) 9999-5555",
      bio: "Especialista em IA com mais de 10 anos de experiência",
      status: "aprovado",
      datasolicitacao: new Date(2025, 3, 15),
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      area: "Desenvolvimento Full Stack",
      contato: "carlos.mendes@techsolutions.com",
      telefone: "(11) 9999-4444",
      bio: "Desenvolvedor sênior especializado em React e Node.js",
      status: "aprovado",
      datasolicitacao: new Date(2025, 3, 20),
    },
    {
      id: 3,
      nome: "Mariana Costa",
      area: "UX/UI Design",
      contato: "mariana.costa@freelancer.com",
      telefone: "(11) 9999-3333",
      bio: "Designer com experiência em startups de tecnologia",
      status: "pendente",
      datasolicitacao: new Date(2025, 4, 10),
    },
    {
      id: 4,
      nome: "Roberto Lima",
      area: "DevOps",
      contato: "roberto.lima@consultant.com",
      telefone: "(11) 9999-2222",
      bio: "Consultor DevOps com certificações AWS e Azure",
      status: "pendente",
      datasolicitacao: new Date(2025, 4, 12),
    },
  ]

  const jobPostings = [
    {
      id: 1,
      title: "Desenvolvedor React Sênior",
      level: "senior",
      area: "desenvolvimento",
      salary: 8000,
      description: "Buscamos um desenvolvedor React experiente para liderar projetos inovadores.",
      requirements: "React, TypeScript, Node.js, 5+ anos de experiência",
      createdAt: new Date(2025, 4, 20),
      status: "active",
    },
    {
      id: 2,
      title: "Designer UX/UI Pleno",
      level: "pleno",
      area: "design",
      salary: 5500,
      description: "Oportunidade para designer criativo trabalhar em produtos digitais.",
      requirements: "Figma, Adobe Creative Suite, portfolio sólido",
      createdAt: new Date(2025, 4, 18),
      status: "active",
    },
  ]

  // Hamburger menu functionality
  const hamburger = document.getElementById("hamburger")
  const nav = document.getElementById("mainNav")

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Update dashboard stats dynamically
  function updateDashboardStats() {
    const eventosDisponiveisCount = eventosDisponiveis.filter((e) => e.status === "ativo").length
    const eventosAgendadosCount = eventosAgendados.filter((e) => e.status === "confirmado").length
    const palestrantesCount = palestrantes.length
    const pendentesCount = palestrantes.filter((p) => p.status === "pendente").length

    // Update stat cards if they exist
    const statCards = document.querySelectorAll(".stat-card")
    if (statCards.length >= 4) {
      statCards[0].querySelector("h3").textContent = eventosDisponiveisCount
      statCards[1].querySelector("h3").textContent = eventosAgendadosCount
      statCards[2].querySelector("h3").textContent = palestrantesCount
      statCards[3].querySelector("h3").textContent = pendentesCount
    }
  }

  function populateSpeakersGrid() {
    const speakersGrid = document.getElementById("speakersGrid")
    if (!speakersGrid) return

    speakersGrid.innerHTML = palestrantes
      .map(
        (speaker) => `
      <div class="speaker-card">
        <div class="speaker-header">
          <div class="speaker-avatar">
            ${speaker.nome.charAt(0)}
          </div>
          <div class="speaker-info">
            <h3>${speaker.nome}</h3>
            <p class="speaker-area">${speaker.area}</p>
          </div>
        </div>
        <div class="speaker-details">
          <div class="speaker-contact">
            <i class="fas fa-envelope"></i>
            <span>${speaker.contato}</span>
          </div>
          <div class="speaker-contact">
            <i class="fas fa-phone"></i>
            <span>${speaker.telefone}</span>
          </div>
          <p class="speaker-bio">${speaker.bio}</p>
          <span class="speaker-status ${speaker.status}">
            <i class="fas fa-${speaker.status === "aprovado" ? "check" : "clock"}"></i>
            ${speaker.status === "aprovado" ? "Aprovado" : "Pendente"}
          </span>
        </div>
      </div>
    `,
      )
      .join("")
  }

  const currentDate = new Date(2025, 4, 1) // May 2025

  function populateCalendar() {
    const calendarGrid = document.getElementById("calendarGrid")
    const currentMonth = document.getElementById("currentMonth")
    if (!calendarGrid || !currentMonth) return

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    currentMonth.textContent = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(currentDate)

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    let calendarHTML = days.map((day) => `<div class="calendar-day header">${day}</div>`).join("")

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === new Date().toDateString()
      const hasEvent = eventosAgendados.some((evento) => evento.data.toDateString() === date.toDateString())

      let classes = "calendar-day"
      if (!isCurrentMonth) classes += " other-month"
      if (isToday) classes += " today"
      if (hasEvent) classes += " has-event"

      calendarHTML += `
        <div class="${classes}">
          <span class="day-number">${date.getDate()}</span>
          ${hasEvent ? '<div class="event-dot"></div>' : ""}
        </div>
      `
    }

    calendarGrid.innerHTML = calendarHTML
  }

  function populateUpcomingEvents() {
    const upcomingEvents = document.getElementById("upcomingEvents")
    if (!upcomingEvents) return

    const sortedEvents = eventosAgendados
      .filter((evento) => evento.data >= new Date())
      .sort((a, b) => a.data - b.data)
      .slice(0, 5)

    upcomingEvents.innerHTML = sortedEvents
      .map(
        (evento) => `
      <div class="upcoming-event">
        <h4 class="event-title">${evento.titulo}</h4>
        <p class="event-details">
          ${evento.data.toLocaleDateString("pt-BR")} • ${evento.horario}<br>
          ${evento.etec} - ${evento.turma} (${evento.alunos} alunos)
        </p>
      </div>
    `,
      )
      .join("")
  }

  function populateJobsGrid() {
    const jobsGrid = document.getElementById("jobsGrid")
    if (!jobsGrid) return

    jobsGrid.innerHTML = jobPostings
      .map(
        (job) => `
      <div class="job-card">
        <div class="job-header">
          <div>
            <h3 class="job-title">${job.title}</h3>
            <span class="job-level">${job.level}</span>
          </div>
        </div>
        <div class="job-meta">
          <div class="job-meta-item">
            <i class="fas fa-briefcase"></i>
            <span>${job.area}</span>
          </div>
          <div class="job-meta-item">
            <i class="fas fa-dollar-sign"></i>
            <span>R$ ${job.salary.toLocaleString()}</span>
          </div>
          <div class="job-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${job.createdAt.toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
        <p class="job-description">${job.description}</p>
        <div class="job-actions">
          <button class="job-action">Editar</button>
          <button class="job-action primary">Ver Candidatos</button>
        </div>
      </div>
    `,
      )
      .join("")
  }

  // Event listeners for new functionality
  const createJobBtn = document.getElementById("createJobBtn")
  const jobCreationForm = document.getElementById("jobCreationForm")
  const cancelJobBtn = document.getElementById("cancelJobBtn")
  const jobForm = document.getElementById("jobForm")
  const prevMonth = document.getElementById("prevMonth")
  const nextMonth = document.getElementById("nextMonth")

  if (createJobBtn && jobCreationForm) {
    createJobBtn.addEventListener("click", () => {
      jobCreationForm.style.display = jobCreationForm.style.display === "none" ? "block" : "none"
    })
  }

  if (cancelJobBtn && jobCreationForm) {
    cancelJobBtn.addEventListener("click", () => {
      jobCreationForm.style.display = "none"
      jobForm.reset()
    })
  }

  if (jobForm) {
    jobForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(jobForm)
      const newJob = {
        id: jobPostings.length + 1,
        title: formData.get("jobTitle"),
        level: formData.get("jobLevel"),
        area: formData.get("jobArea"),
        salary: Number.parseInt(formData.get("jobSalary")),
        description: formData.get("jobDescription"),
        requirements: formData.get("jobRequirements"),
        createdAt: new Date(),
        status: "active",
      }

      jobPostings.push(newJob)
      populateJobsGrid()
      jobCreationForm.style.display = "none"
      jobForm.reset()
    })
  }

  if (prevMonth) {
    prevMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1)
      populateCalendar()
      populateUpcomingEvents()
    })
  }

  if (nextMonth) {
    nextMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1)
      populateCalendar()
      populateUpcomingEvents()
    })
  }

  // Helper function to format date
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Helper function to format date for display
  function formatDateForDisplay(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("pt-BR", options)
  }

  // Add some interactive functionality to activity items
  const activityItems = document.querySelectorAll(".activity-item")
  activityItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Add a subtle animation when clicked
      item.style.transform = "scale(0.98)"
      setTimeout(() => {
        item.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Add hover effects to quick action cards
  const quickActionCards = document.querySelectorAll(".quick-action-card")
  quickActionCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".stat-icon")
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".stat-icon")
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)"
      }
    })
  })

  // Initialize dashboard
  updateDashboardStats()
  populateSpeakersGrid()
  populateCalendar()
  populateUpcomingEvents()
  populateJobsGrid()

  // Simulate real-time updates (optional)
  setInterval(() => {
    // You could add real-time updates here
    // For now, we'll just keep the stats as they are
  }, 30000) // Update every 30 seconds

  console.log("Empresa Dashboard initialized successfully")
  console.log("Eventos Disponíveis:", eventosDisponiveis.length)
  console.log("Eventos Agendados:", eventosAgendados.length)
  console.log("Palestrantes:", palestrantes.length)
})
