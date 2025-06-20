document.addEventListener("DOMContentLoaded", () => {
  // Sample data
  const disponibilidades = [
    {
      id: 1,
      titulo: "Visita Técnica - Departamento de Desenvolvimento",
      tipo: "Visita Técnica",
      descricao:
        "Visita ao departamento de desenvolvimento de software para conhecer o ambiente de trabalho e as tecnologias utilizadas.",
      disponibilidade: "Segundas e Quartas, 14h às 17h",
      vagas: 20,
    },
    {
      id: 2,
      titulo: "Palestra sobre Mercado de Trabalho em TI",
      tipo: "Palestra",
      descricao: "Palestra sobre as oportunidades e desafios do mercado de trabalho em Tecnologia da Informação.",
      disponibilidade: "Terças e Quintas, 19h às 21h",
      vagas: 50,
    },
  ]

  const eventosAgendados = [
    {
      id: 1,
      titulo: "Visita Técnica - Departamento de Desenvolvimento",
      tipo: "Visita Técnica",
      data: new Date(2025, 4, 20),
      horario: "14:00 - 16:00",
      etec: "ETEC São Paulo",
      participantes: 15,
    },
  ]

  const solicitacoesPalestrantes = [
    {
      id: 1,
      nome: "Ana Silva",
      area: "Inteligência Artificial",
      dataInscricao: new Date(2025, 4, 15),
      motivacao:
        "Gostaria de compartilhar minha experiência em IA com os estudantes e contribuir para o desenvolvimento da área.",
      experiencia:
        "10 anos de experiência em projetos de IA, incluindo machine learning e processamento de linguagem natural.",
      disponibilidade: "Segundas e Quartas, 19h às 21h",
      status: "pendente",
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      area: "Empreendedorismo",
      dataInscricao: new Date(2025, 4, 10),
      motivacao: "Desejo inspirar novos empreendedores e compartilhar minha jornada no mundo dos negócios.",
      experiencia: "Fundador de 3 startups de sucesso, mentor de empreendedores iniciantes.",
      disponibilidade: "Terças e Quintas, 18h às 20h",
      status: "pendente",
    },
  ]

  // Tab switching
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked trigger and corresponding content
      trigger.classList.add("active")
      const tabId = trigger.getAttribute("data-tab")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Render disponibilidades
  function renderDisponibilidades() {
    const availabilityList = document.getElementById("availability-list")
    availabilityList.innerHTML = ""

    disponibilidades.forEach((disponibilidade) => {
      const item = document.createElement("div")
      item.className = "availability-item"

      const header = document.createElement("div")
      header.className = "availability-header"

      const info = document.createElement("div")
      info.className = "availability-info"

      const title = document.createElement("h3")
      title.textContent = disponibilidade.titulo

      const meta = document.createElement("div")
      meta.className = "availability-meta"
      meta.innerHTML = `<span>${disponibilidade.tipo}</span><span>•</span><span>${disponibilidade.vagas} vagas</span>`

      info.appendChild(title)
      info.appendChild(meta)

      const actions = document.createElement("div")
      actions.className = "availability-actions"

      const editButton = document.createElement("button")
      editButton.className = "action-button"
      editButton.innerHTML = '<i class="fas fa-edit"></i>'
      editButton.title = "Editar"

      const deleteButton = document.createElement("button")
      deleteButton.className = "action-button delete"
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
      deleteButton.title = "Excluir"
      deleteButton.addEventListener("click", () => excluirDisponibilidade(disponibilidade.id))

      actions.appendChild(editButton)
      actions.appendChild(deleteButton)

      header.appendChild(info)
      header.appendChild(actions)

      const description = document.createElement("p")
      description.className = "availability-description"
      description.textContent = disponibilidade.descricao

      const schedule = document.createElement("div")
      schedule.className = "availability-schedule"
      schedule.innerHTML = `<i class="fas fa-calendar"></i><span>${disponibilidade.disponibilidade}</span>`

      item.appendChild(header)
      item.appendChild(description)
      item.appendChild(schedule)

      availabilityList.appendChild(item)
    })
  }

  // Render eventos agendados
  function renderEventosAgendados() {
    const scheduledEvents = document.getElementById("scheduled-events")
    scheduledEvents.innerHTML = ""

    if (eventosAgendados.length > 0) {
      eventosAgendados.forEach((evento) => {
        const item = document.createElement("div")
        item.className = "scheduled-event"

        const header = document.createElement("div")
        header.className = "scheduled-event-header"

        const info = document.createElement("div")

        const title = document.createElement("h3")
        title.className = "scheduled-event-title"
        title.textContent = evento.titulo

        const date = document.createElement("p")
        date.className = "scheduled-event-date"
        date.textContent = `${formatDate(evento.data)} • ${evento.horario}`

        info.appendChild(title)
        info.appendChild(date)

        const badge = document.createElement("div")
        badge.className = "scheduled-event-badge"
        badge.textContent = evento.tipo

        header.appendChild(info)
        header.appendChild(badge)

        const details = document.createElement("div")
        details.className = "scheduled-event-details"

        const etec = document.createElement("p")
        etec.textContent = `ETEC: ${evento.etec}`

        const participants = document.createElement("p")
        participants.textContent = `Participantes: ${evento.participantes}`

        details.appendChild(etec)
        details.appendChild(participants)

        item.appendChild(header)
        item.appendChild(details)

        scheduledEvents.appendChild(item)
      })
    } else {
      const noEvents = document.createElement("div")
      noEvents.className = "no-events-message"

      const icon = document.createElement("i")
      icon.className = "fas fa-calendar"

      const title = document.createElement("h3")
      title.textContent = "Nenhum evento agendado"

      const message = document.createElement("p")
      message.textContent = "Quando coordenadores agendarem eventos com sua empresa, eles aparecerão aqui."

      noEvents.appendChild(icon)
      noEvents.appendChild(title)
      noEvents.appendChild(message)

      scheduledEvents.appendChild(noEvents)
    }
  }

  // Render solicitações de palestrantes
  function renderSolicitacoesPalestrantes() {
    const speakerRequests = document.getElementById("speaker-requests")
    speakerRequests.innerHTML = ""

    if (solicitacoesPalestrantes.length > 0) {
      solicitacoesPalestrantes.forEach((solicitacao) => {
        const item = document.createElement("div")
        item.className = "notification-item unread"

        const header = document.createElement("div")
        header.className = "notification-header"

        const title = document.createElement("span")
        title.className = "notification-title"
        title.textContent = solicitacao.nome

        const time = document.createElement("span")
        time.className = "notification-time"
        time.textContent = formatDate(solicitacao.dataInscricao)

        header.appendChild(title)
        header.appendChild(time)

        const content = document.createElement("p")
        content.className = "notification-content"
        content.textContent = `Área: ${solicitacao.area}
Motivação: ${solicitacao.motivacao}
Experiência: ${solicitacao.experiencia}
Disponibilidade: ${solicitacao.disponibilidade}`

        const actions = document.createElement("div")
        actions.className = "notification-actions"

        const approveButton = document.createElement("button")
        approveButton.className = "button small-button primary-button"
        approveButton.textContent = "Aprovar"
        approveButton.addEventListener("click", () => aprovarPalestrante(solicitacao.id))

        const rejectButton = document.createElement("button")
        rejectButton.className = "button small-button outline-button"
        rejectButton.textContent = "Recusar"
        rejectButton.addEventListener("click", () => recusarPalestrante(solicitacao.id))

        actions.appendChild(approveButton)
        actions.appendChild(rejectButton)

        item.appendChild(header)
        item.appendChild(content)
        item.appendChild(actions)

        speakerRequests.appendChild(item)
      })
    } else {
      const noRequests = document.createElement("div")
      noRequests.className = "no-events-message"

      const icon = document.createElement("i")
      icon.className = "fas fa-user-tie"

      const title = document.createElement("h3")
      title.textContent = "Nenhuma solicitação de palestrante"

      const message = document.createElement("p")
      message.textContent =
        "Quando palestrantes se inscreverem para fazer parte da sua empresa, as solicitações aparecerão aqui."

      noRequests.appendChild(icon)
      noRequests.appendChild(title)
      noRequests.appendChild(message)

      speakerRequests.appendChild(noRequests)
    }
  }

  // Add availability modal
  const addAvailabilityModal = document.getElementById("add-availability-modal")
  const addAvailabilityBtn = document.getElementById("add-availability-btn")
  const closeAvailabilityModalBtn = document.getElementById("close-availability-modal")
  const confirmAvailabilityBtn = document.getElementById("confirm-availability")

  addAvailabilityBtn.addEventListener("click", () => {
    addAvailabilityModal.style.display = "flex"
  })

  closeAvailabilityModalBtn.addEventListener("click", () => {
    addAvailabilityModal.style.display = "none"
  })

  confirmAvailabilityBtn.addEventListener("click", () => {
    // Get form values
    const title = document.getElementById("availability-title").value
    const type = document.getElementById("availability-type").value
    const description = document.getElementById("availability-description").value
    const schedule = document.getElementById("availability-schedule").value
    const slots = document.getElementById("availability-slots").value

    if (title && type && description && schedule && slots) {
      alert(`Disponibilidade "${title}" adicionada com sucesso!`)
      addAvailabilityModal.style.display = "none"

      // Reset form
      document.getElementById("availability-title").value = ""
      document.getElementById("availability-type").value = ""
      document.getElementById("availability-description").value = ""
      document.getElementById("availability-schedule").value = ""
      document.getElementById("availability-slots").value = ""

      // In a real application, we would add the new availability to the list
      // and re-render the list
    } else {
      alert("Por favor, preencha todos os campos.")
    }
  })

  // Delete availability
  function excluirDisponibilidade(id) {
    if (confirm("Tem certeza que deseja excluir esta disponibilidade?")) {
      alert(`Disponibilidade ${id} excluída com sucesso!`)
      // In a real application, we would remove the availability from the list
      // and re-render the list
    }
  }

  // Approve speaker
  function aprovarPalestrante(id) {
    if (confirm("Tem certeza que deseja aprovar este palestrante?")) {
      alert(`Palestrante ${id} aprovado com sucesso!`)
      // In a real application, we would update the speaker status
      // and re-render the list
    }
  }

  // Reject speaker
  function recusarPalestrante(id) {
    if (confirm("Tem certeza que deseja recusar este palestrante?")) {
      alert(`Palestrante ${id} recusado.`)
      // In a real application, we would update the speaker status
      // and re-render the list
    }
  }

  // Notifications dropdown
  const notificationIcon = document.getElementById("notification-icon")
  const notificationsDropdown = document.getElementById("notifications-dropdown")
  const closeNotifications = document.getElementById("close-notifications")

  notificationIcon.addEventListener("click", () => {
    notificationsDropdown.classList.toggle("show")
  })

  closeNotifications.addEventListener("click", () => {
    notificationsDropdown.classList.remove("show")
  })

  // Close modals and dropdowns when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addAvailabilityModal) {
      addAvailabilityModal.style.display = "none"
    }

    if (
      notificationsDropdown.classList.contains("show") &&
      !notificationIcon.contains(e.target) &&
      !notificationsDropdown.contains(e.target)
    ) {
      notificationsDropdown.classList.remove("show")
    }
  })

  // Helper function to format date
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  // Initial render
  renderDisponibilidades()
  renderEventosAgendados()
  renderSolicitacoesPalestrantes()
})
