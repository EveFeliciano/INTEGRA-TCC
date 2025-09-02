document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu functionality
  const hamburger = document.getElementById("hamburger")
  const nav = document.getElementById("mainNav")

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Form elements
  const form = document.getElementById("jobCreationForm")
  const cancelBtn = document.getElementById("cancelBtn")
  const saveAsDraftBtn = document.getElementById("saveAsDraftBtn")

  const previewTitle = document.getElementById("previewTitle")
  const previewArea = document.getElementById("previewArea")
  const previewParticipants = document.getElementById("previewParticipants")
  const previewDuration = document.getElementById("previewDuration")
  const previewLocation = document.getElementById("previewLocation")
  const previewDescription = document.getElementById("previewDescription")
  const previewObjectives = document.getElementById("previewObjectives")
  const selectedDatesInfo = document.getElementById("selectedDatesInfo")

  const visitTitle = document.getElementById("visitTitle")
  const visitArea = document.getElementById("visitArea")
  const maxParticipants = document.getElementById("maxParticipants")
  const visitLocation = document.getElementById("visitLocation")
  const visitDescription = document.getElementById("visitDescription")
  const visitObjectives = document.getElementById("visitObjectives")
  const requirements = document.getElementById("requirements")
  const visitDuration = document.getElementById("visitDuration")
  const applicationDeadline = document.getElementById("applicationDeadline")

  const miniCalendar = document.getElementById("miniCalendar")
  const calendarGrid = document.getElementById("calendarGrid")
  const currentMonthSpan = document.getElementById("currentMonth")
  const prevMonthBtn = document.getElementById("prevMonth")
  const nextMonthBtn = document.getElementById("nextMonth")

  const currentDate = new Date()
  let selectedDates = []
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    currentMonthSpan.textContent = `${months[month]} ${year}`

    let calendarHTML = ""

    // Add weekday headers
    weekDays.forEach((day) => {
      calendarHTML += `<div class="calendar-day-header">${day}</div>`
    })

    // Generate calendar days
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === new Date().toDateString()
      const isPast = date < new Date().setHours(0, 0, 0, 0)
      const isSelected = selectedDates.some((d) => d.toDateString() === date.toDateString())
      const isInRange = isDateInRange(date)

      let classes = "calendar-day"
      if (!isCurrentMonth) classes += " disabled"
      if (isPast) classes += " disabled"
      if (isSelected) classes += " selected"
      if (isInRange && !isSelected) classes += " in-range"

      calendarHTML += `<button type="button" class="${classes}" data-date="${date.toISOString()}" ${!isCurrentMonth || isPast ? "disabled" : ""}>${date.getDate()}</button>`
    }

    calendarGrid.innerHTML = calendarHTML

    // Add click listeners to calendar days
    calendarGrid.querySelectorAll(".calendar-day:not(.disabled)").forEach((day) => {
      day.addEventListener("click", handleDateClick)
    })
  }

  function isDateInRange(date) {
    if (selectedDates.length !== 2) return false
    const [start, end] = selectedDates.sort((a, b) => a - b)
    return date > start && date < end
  }

  function handleDateClick(e) {
    const clickedDate = new Date(e.target.dataset.date)

    if (selectedDates.length === 0) {
      selectedDates.push(clickedDate)
    } else if (selectedDates.length === 1) {
      selectedDates.push(clickedDate)
      selectedDates.sort((a, b) => a - b)
    } else {
      selectedDates = [clickedDate]
    }

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
    updateSelectedDatesDisplay()
  }

  function updateSelectedDatesDisplay() {
    if (selectedDates.length === 0) {
      selectedDatesInfo.innerHTML = '<span class="date-info">Clique nas datas para selecionar o período</span>'
    } else if (selectedDates.length === 1) {
      const date = selectedDates[0].toLocaleDateString("pt-BR")
      selectedDatesInfo.innerHTML = `<span class="date-info">Data selecionada: ${date} - Clique em outra data para definir período</span>`
    } else {
      const [start, end] = selectedDates.sort((a, b) => a - b)
      const startStr = start.toLocaleDateString("pt-BR")
      const endStr = end.toLocaleDateString("pt-BR")
      selectedDatesInfo.innerHTML = `<span class="date-range">Período selecionado: ${startStr} até ${endStr}</span>`
    }
  }

  // Calendar navigation
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1)
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
    })
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1)
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
    })
  }

  function updatePreview() {
    if (previewTitle && visitTitle) {
      previewTitle.textContent = visitTitle.value || "Título da Visita Técnica"
    }

    if (previewArea && visitArea) {
      previewArea.textContent = visitArea.value || "Área"
      previewArea.style.display = visitArea.value ? "inline-block" : "none"
    }

    if (previewParticipants && maxParticipants) {
      const participants = maxParticipants.value || "--"
      previewParticipants.innerHTML = `<i class="fas fa-users"></i><span>${participants} vagas</span>`
    }

    if (previewDuration && visitDuration) {
      previewDuration.textContent = visitDuration.value || "Duração"
    }

    if (previewLocation && visitLocation) {
      previewLocation.textContent = visitLocation.value || "Localização"
    }

    if (previewDescription && visitDescription) {
      previewDescription.textContent = visitDescription.value || "Descrição da visita técnica aparecerá aqui..."
    }

    if (previewObjectives && visitObjectives) {
      previewObjectives.textContent = visitObjectives.value || "Objetivos da visita aparecerão aqui..."
    }
  }

  const formInputs = [
    visitTitle,
    visitArea,
    maxParticipants,
    visitLocation,
    visitDescription,
    visitObjectives,
    requirements,
    visitDuration,
    applicationDeadline,
  ]

  // Add event listeners for real-time preview
  formInputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", updatePreview)
      input.addEventListener("change", updatePreview)
    }
  })

  function validateForm() {
    const requiredFields = [
      { field: visitTitle, name: "Título da Visita" },
      { field: visitArea, name: "Área" },
      { field: visitLocation, name: "Localização" },
      { field: visitDescription, name: "Descrição da Visita" },
    ]

    const errors = []

    requiredFields.forEach(({ field, name }) => {
      if (!field || !field.value.trim()) {
        errors.push(name)
        if (field) {
          field.style.borderColor = "#ef4444"
        }
      } else if (field) {
        field.style.borderColor = "#e2e8f0"
      }
    })

    if (selectedDates.length === 0) {
      errors.push("Período da Visita (selecione pelo menos uma data)")
    }

    return errors
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const errors = validateForm()

      if (errors.length > 0) {
        alert(`Por favor, preencha os seguintes campos obrigatórios:\n\n${errors.join("\n")}`)
        return
      }

      // Collect form data
      const formData = new FormData(form)
      const visitData = {
        title: formData.get("visitTitle"),
        area: formData.get("visitArea"),
        maxParticipants: formData.get("maxParticipants") ? Number.parseInt(formData.get("maxParticipants")) : null,
        location: formData.get("visitLocation"),
        description: formData.get("visitDescription"),
        objectives: formData.get("visitObjectives"),
        requirements: formData.get("requirements"),
        duration: formData.get("visitDuration"),
        selectedDates: selectedDates.map((date) => date.toISOString()),
        applicationDeadline: formData.get("applicationDeadline"),
        createdAt: new Date(),
        status: "active",
        type: "technical_visit",
      }

      console.log("Visita técnica criada:", visitData)

      // Show success message
      alert("Visita técnica publicada com sucesso! Os estudantes já podem visualizá-la e se inscrever.")

      // Redirect to listings
      window.location.href = "vagas.html"
    })
  }

  if (saveAsDraftBtn) {
    saveAsDraftBtn.addEventListener("click", () => {
      const formData = new FormData(form)
      const draftData = {
        title: formData.get("visitTitle"),
        area: formData.get("visitArea"),
        maxParticipants: formData.get("maxParticipants"),
        location: formData.get("visitLocation"),
        description: formData.get("visitDescription"),
        objectives: formData.get("visitObjectives"),
        requirements: formData.get("requirements"),
        duration: formData.get("visitDuration"),
        selectedDates: selectedDates.map((date) => date.toISOString()),
        applicationDeadline: formData.get("applicationDeadline"),
        savedAt: new Date(),
        status: "draft",
        type: "technical_visit",
      }

      // Save to localStorage
      localStorage.setItem("visitDraft", JSON.stringify(draftData))

      alert("Rascunho salvo com sucesso!")
    })
  }

  // Cancel functionality
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja cancelar? Todas as informações não salvas serão perdidas.")) {
        window.location.href = "home.html"
      }
    })
  }

  function loadDraft() {
    const draft = localStorage.getItem("visitDraft")
    if (draft) {
      try {
        const draftData = JSON.parse(draft)

        // Fill form with draft data
        if (visitTitle && draftData.title) visitTitle.value = draftData.title
        if (visitArea && draftData.area) visitArea.value = draftData.area
        if (maxParticipants && draftData.maxParticipants) maxParticipants.value = draftData.maxParticipants
        if (visitLocation && draftData.location) visitLocation.value = draftData.location
        if (visitDescription && draftData.description) visitDescription.value = draftData.description
        if (visitObjectives && draftData.objectives) visitObjectives.value = draftData.objectives
        if (requirements && draftData.requirements) requirements.value = draftData.requirements
        if (visitDuration && draftData.duration) visitDuration.value = draftData.duration
        if (applicationDeadline && draftData.applicationDeadline)
          applicationDeadline.value = draftData.applicationDeadline

        // Restore selected dates
        if (draftData.selectedDates) {
          selectedDates = draftData.selectedDates.map((date) => new Date(date))
          updateSelectedDatesDisplay()
        }

        // Update preview
        updatePreview()

        console.log("Rascunho de visita técnica carregado")
      } catch (error) {
        console.error("Erro ao carregar rascunho:", error)
      }
    }
  }

  // Initialize
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  updatePreview()
  loadDraft()

  console.log("Technical visit creation form initialized successfully")
})
