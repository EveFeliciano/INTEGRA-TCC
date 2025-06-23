document.addEventListener("DOMContentLoaded", () => {
    // Ensure all modals are closed on page load
    document.getElementById("schedule-lecture-modal").style.display = "none"
    document.getElementById("visit-modal").style.display = "none"
    document.getElementById("success-modal").style.display = "none"

    // Sample data for technical visits with pre-marked dates and times
    const visitasTecnicas = [
        {
            id: 1,
            empresa: "TechSolutions",
            setor: "Desenvolvimento de Software",
            vagas: 3,
            disponibilidade: [
                { data: "2025-02-15", horarios: ["14:00-16:00", "16:30-18:30"] },
                { data: "2025-02-20", horarios: ["09:00-11:00", "14:00-16:00"] },
                { data: "2025-02-25", horarios: ["13:00-15:00"] },
            ],
            descricao:
                "Visita ao setor de desenvolvimento para conhecer metodologias ágeis e tecnologias utilizadas no desenvolvimento de software moderno. Os estudantes terão a oportunidade de ver na prática como funciona uma equipe de desenvolvimento, conhecer as ferramentas utilizadas e entender o processo de criação de aplicações web e mobile.",
            endereco: "Av. Paulista, 1000 - São Paulo, SP",
            contato: "contato@techsolutions.com",
        },
        {
            id: 2,
            empresa: "Inovação Digital",
            setor: "Marketing Digital",
            vagas: 2,
            disponibilidade: [
                { data: "2025-02-18", horarios: ["10:00-12:00"] },
                { data: "2025-02-22", horarios: ["14:00-16:00", "16:30-18:30"] },
            ],
            descricao:
                "Conhecer estratégias de marketing digital e ferramentas utilizadas no mercado atual. Apresentação de cases reais e demonstração de campanhas digitais bem-sucedidas.",
            endereco: "Rua Augusta, 500 - São Paulo, SP",
            contato: "contato@inovacaodigital.com",
        },
        {
            id: 3,
            empresa: "Construtech",
            setor: "Construção Civil",
            vagas: 4,
            disponibilidade: [{ data: "2025-02-28", horarios: ["08:00-10:00", "10:30-12:30"] }],
            descricao:
                "Visita às obras e conhecimento de tecnologias na construção civil moderna. Os alunos conhecerão equipamentos de última geração e técnicas inovadoras de construção.",
            endereco: "Zona Leste - São Paulo, SP",
            contato: "contato@construtech.com",
        },
    ]

    // Modal elements
    const scheduleLectureModal = document.getElementById("schedule-lecture-modal")
    const visitModal = document.getElementById("visit-modal")
    const successModal = document.getElementById("success-modal")

    // Button elements
    const scheduleLectureBtn = document.getElementById("schedule-lecture-btn")
    const viewVisitsBtn = document.getElementById("view-visits-btn")
    const publishLectureBtn = document.getElementById("publish-lecture")
    const confirmVisitBtn = document.getElementById("confirm-visit")

    // Close buttons
    const closeLectureModalBtn = document.getElementById("close-lecture-modal")
    const closeVisitModalBtn = document.getElementById("close-visit-modal")
    const closeSuccessModalBtn = document.getElementById("close-success-modal")
    const goToScheduledBtn = document.getElementById("go-to-scheduled")

    // Calendar variables
    let currentVisitDate = new Date()
    const currentLectureDate = new Date()
    let selectedVisitDate = null
    let selectedLectureDate = null
    let currentVisit = null

    // Event listeners
    scheduleLectureBtn.addEventListener("click", () => {
        scheduleLectureModal.style.display = "flex"
        generateLectureCalendar()
    })

    viewVisitsBtn.addEventListener("click", () => {
        toggleVisitsSection()
    })

    closeLectureModalBtn.addEventListener("click", () => {
        scheduleLectureModal.style.display = "none"
    })

    closeVisitModalBtn.addEventListener("click", () => {
        visitModal.style.display = "none"
    })

    closeSuccessModalBtn.addEventListener("click", () => {
        successModal.style.display = "none"
    })

    goToScheduledBtn.addEventListener("click", () => {
        window.location.href = "agendados.html"
    })

    publishLectureBtn.addEventListener("click", () => {
        publishLecture()
    })

    confirmVisitBtn.addEventListener("click", () => {
        confirmVisitParticipation()
    })

    // Functions
    function toggleVisitsSection() {
        const visitsSection = document.getElementById("visits-section")
        if (visitsSection.style.display === "none") {
            visitsSection.style.display = "block"
            renderVisitsTecnicas()
            viewVisitsBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Visitas'
        } else {
            visitsSection.style.display = "none"
            viewVisitsBtn.innerHTML = '<i class="fas fa-eye"></i> Ver Todas as Visitas'
        }
    }

    function renderVisitsTecnicas() {
        const visitsGrid = document.getElementById("visits-grid")
        visitsGrid.innerHTML = ""

        visitasTecnicas.forEach((visita) => {
            const visitCard = document.createElement("div")
            visitCard.className = "visit-card"

            // Create availability slots HTML
            const availabilitySlots = visita.disponibilidade
                .flatMap((disp) => disp.horarios.map((horario) => `<span class="availability-slot">${horario}</span>`))
                .join("")

            visitCard.innerHTML = `
        <div class="visit-card-header">
          <h3 class="visit-card-title">${visita.empresa}</h3>
          <p class="visit-card-sector">${visita.setor}</p>
        </div>
        <div class="visit-card-content">
          <p class="visit-description">${visita.descricao}</p>
          
          <div class="visit-info-grid">
            <div class="visit-info-item">
              <i class="fas fa-users"></i>
              <span>${visita.vagas} vagas disponíveis</span>
            </div>
            <div class="visit-info-item">
              <i class="fas fa-calendar"></i>
              <span>${visita.disponibilidade.length} datas disponíveis</span>
            </div>
            <div class="visit-info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${visita.endereco}</span>
            </div>
            <div class="visit-info-item">
              <i class="fas fa-envelope"></i>
              <span>${visita.contato}</span>
            </div>
          </div>
          
          <div class="visit-availability">
            <h5><i class="fas fa-clock"></i> Horários Disponíveis</h5>
            <div class="availability-slots">
              ${availabilitySlots}
            </div>
          </div>
          
          <button class="button primary-button full-width" onclick="openVisitModal(${visita.id})">
            <i class="fas fa-hand-paper"></i> Participar da Visita
          </button>
        </div>
      `
            visitsGrid.appendChild(visitCard)
        })
    }

    // Lecture calendar generation
    function generateLectureCalendar() {
        const calendar = document.getElementById("lecture-calendar")
        if (!calendar) return

        calendar.innerHTML = ""
        calendar.className = "calendar lecture-calendar"

        // Calendar header
        const header = document.createElement("div")
        header.className = "calendar-header"
        header.innerHTML = `
      <button class="calendar-nav-btn" onclick="previousLectureMonth()">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="calendar-month-year">
        ${currentLectureDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
      </div>
      <button class="calendar-nav-btn" onclick="nextLectureMonth()">
        <i class="fas fa-chevron-right"></i>
      </button>
    `
        calendar.appendChild(header)

        // Calendar grid
        const grid = document.createElement("div")
        grid.className = "calendar-grid"

        // Day headers
        const dayHeaders = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        dayHeaders.forEach((day) => {
            const dayHeader = document.createElement("div")
            dayHeader.className = "calendar-day-header"
            dayHeader.textContent = day
            grid.appendChild(dayHeader)
        })

        // Generate calendar days
        const firstDay = new Date(currentLectureDate.getFullYear(), currentLectureDate.getMonth(), 1)
        const lastDay = new Date(currentLectureDate.getFullYear(), currentLectureDate.getMonth() + 1, 0)
        const startDate = new Date(firstDay)
        startDate.setDate(startDate.getDate() - firstDay.getDay())

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)

            const dayElement = document.createElement("div")
            dayElement.className = "calendar-day"
            dayElement.textContent = date.getDate()

            if (date.getMonth() !== currentLectureDate.getMonth()) {
                dayElement.classList.add("other-month")
            } else if (date >= new Date()) {
                dayElement.classList.add("available")
                dayElement.onclick = () => selectLectureDate(date)
            }

            if (selectedLectureDate && date.toDateString() === selectedLectureDate.toDateString()) {
                dayElement.classList.add("selected")
            }

            grid.appendChild(dayElement)
        }

        calendar.appendChild(grid)
    }

    // Lecture date selection
    function selectLectureDate(date) {
        selectedLectureDate = date
        document.getElementById("lecture-date").value = date.toISOString().split("T")[0]
        generateLectureCalendar()
    }

    // Navigation functions for lecture calendar
    window.previousLectureMonth = () => {
        currentLectureDate.setMonth(currentLectureDate.getMonth() - 1)
        generateLectureCalendar()
    }

    window.nextLectureMonth = () => {
        currentLectureDate.setMonth(currentLectureDate.getMonth() + 1)
        generateLectureCalendar()
    }

    // Calendar generation for visits only
    function generateVisitCalendar(visita) {
        const calendar = document.getElementById("visit-calendar")
        calendar.innerHTML = ""

        // Calendar header
        const header = document.createElement("div")
        header.className = "calendar-header"
        header.innerHTML = `
      <button class="calendar-nav-btn" onclick="previousVisitMonth()">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="calendar-month-year">
        ${currentVisitDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
      </div>
      <button class="calendar-nav-btn" onclick="nextVisitMonth()">
        <i class="fas fa-chevron-right"></i>
      </button>
    `
        calendar.appendChild(header)

        // Calendar grid
        const grid = document.createElement("div")
        grid.className = "calendar-grid"

        // Day headers
        const dayHeaders = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        dayHeaders.forEach((day) => {
            const dayHeader = document.createElement("div")
            dayHeader.className = "calendar-day-header"
            dayHeader.textContent = day
            grid.appendChild(dayHeader)
        })

        // Get available dates for this visit
        const availableDates = visita.disponibilidade.map((d) => d.data)

        // Generate calendar days
        const firstDay = new Date(currentVisitDate.getFullYear(), currentVisitDate.getMonth(), 1)
        const lastDay = new Date(currentVisitDate.getFullYear(), currentVisitDate.getMonth() + 1, 0)
        const startDate = new Date(firstDay)
        startDate.setDate(startDate.getDate() - firstDay.getDay())

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)

            const dayElement = document.createElement("div")
            dayElement.className = "calendar-day"
            dayElement.textContent = date.getDate()

            const dateString = date.toISOString().split("T")[0]

            if (date.getMonth() !== currentVisitDate.getMonth()) {
                dayElement.classList.add("other-month")
            } else if (availableDates.includes(dateString)) {
                dayElement.classList.add("available")
                dayElement.onclick = () => selectVisitDate(date, visita)
            }

            if (selectedVisitDate && date.toDateString() === selectedVisitDate.toDateString()) {
                dayElement.classList.add("selected")
            }

            grid.appendChild(dayElement)
        }

        calendar.appendChild(grid)
    }

    // Date selection function
    function selectVisitDate(date, visita) {
        selectedVisitDate = date
        document.getElementById("visit-date").value = date.toISOString().split("T")[0]
        generateVisitCalendar(visita)
        showVisitTimeSlots(date, visita)
    }

    // Time slots function
    function showVisitTimeSlots(date, visita) {
        const container = document.getElementById("visit-time-slots")
        container.innerHTML = ""

        const dateString = date.toISOString().split("T")[0]
        const availability = visita.disponibilidade.find((d) => d.data === dateString)

        if (availability) {
            const grid = document.createElement("div")
            grid.className = "time-slots-grid"

            availability.horarios.forEach((slot) => {
                const timeSlot = document.createElement("label")
                timeSlot.className = "time-slot"
                timeSlot.innerHTML = `
          <input type="radio" name="visit-time" value="${slot}">
          <span>${slot}</span>
        `
                grid.appendChild(timeSlot)
            })

            container.appendChild(grid)
        }
    }

    // Navigation functions
    window.previousVisitMonth = () => {
        currentVisitDate.setMonth(currentVisitDate.getMonth() - 1)
        generateVisitCalendar(currentVisit)
    }

    window.nextVisitMonth = () => {
        currentVisitDate.setMonth(currentVisitDate.getMonth() + 1)
        generateVisitCalendar(currentVisit)
    }

    // Make openVisitModal global
    window.openVisitModal = (visitId) => {
        const visita = visitasTecnicas.find((v) => v.id === visitId)
        if (!visita) return

        currentVisit = visita
        selectedVisitDate = null

        document.getElementById("visit-modal-title").textContent = `Participar - ${visita.empresa}`
        document.getElementById("visit-modal-description").textContent =
            `Escolha data e horário para a visita à ${visita.empresa}`

        // Populate visit info with new layout
        const visitInfo = document.getElementById("visit-info")
        visitInfo.innerHTML = `
      <div class="visit-company-header">
        <div class="visit-company-icon">
          <i class="fas fa-building"></i>
        </div>
        <div class="visit-company-info">
          <h3>${visita.empresa}</h3>
          <p>${visita.setor}</p>
        </div>
      </div>
      
      <div class="visit-description-section">
        <h4><i class="fas fa-info-circle"></i> Descrição da Visita</h4>
        <div class="visit-description-text">
          ${visita.descricao}
        </div>
      </div>
      
      <div class="visit-details-grid">
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Vagas Disponíveis</strong>
            <span>${visita.vagas} vagas</span>
          </div>
        </div>
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Endereço</strong>
            <span>${visita.endereco}</span>
          </div>
        </div>
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Contato</strong>
            <span>${visita.contato}</span>
          </div>
        </div>
      </div>
    `

        // Generate calendar
        currentVisitDate = new Date()
        generateVisitCalendar(visita)

        // Clear time slots
        document.getElementById("visit-time-slots").innerHTML =
            '<p class="no-date-selected">Selecione uma data para ver os horários disponíveis</p>'

        // Store visit ID for confirmation
        confirmVisitBtn.dataset.visitId = visitId
        visitModal.style.display = "flex"
    }

    function publishLecture() {
        // Get form values
        const theme = document.getElementById("lecture-theme").value
        const date = document.getElementById("lecture-date").value
        const startTime = document.getElementById("lecture-start-time").value
        const endTime = document.getElementById("lecture-end-time").value
        const selectedClasses = document.querySelectorAll('input[name="lecture-classes"]:checked')
        const speakerCount = document.getElementById("speaker-count").value
        const description = document.getElementById("lecture-description").value

        // Validate required fields
        if (!theme || !date || !startTime || !endTime || selectedClasses.length === 0) {
            alert("Por favor, preencha todos os campos obrigatórios.")
            return
        }

        // Validate time
        if (startTime >= endTime) {
            alert("O horário de término deve ser posterior ao horário de início.")
            return
        }

        const classNames = Array.from(selectedClasses)
            .map((cb) => cb.value)
            .join(", ")

        // Close lecture modal
        scheduleLectureModal.style.display = "none"

        // Show success modal
        document.getElementById("success-title").textContent = "Palestra Publicada!"
        document.getElementById("success-message").textContent =
            `A palestra "${theme}" foi publicada com sucesso para as salas: ${classNames}. Horário: ${startTime} - ${endTime}. Aguardando inscrições de palestrantes.`
        successModal.style.display = "flex"

        // Reset form
        document.getElementById("lecture-theme").value = ""
        document.getElementById("lecture-date").value = ""
        document.getElementById("lecture-start-time").value = ""
        document.getElementById("lecture-end-time").value = ""
        document.getElementById("speaker-count").value = "1"
        document.getElementById("lecture-description").value = ""
        document.querySelectorAll('input[name="lecture-classes"]').forEach((input) => (input.checked = false))
        selectedLectureDate = null
    }

    function confirmVisitParticipation() {
        const selectedTime = document.querySelector('input[name="visit-time"]:checked')
        const selectedClasses = document.querySelectorAll('input[name="selected-classes"]:checked')
        const notes = document.getElementById("visit-notes").value

        if (!selectedVisitDate) {
            alert("Por favor, selecione uma data.")
            return
        }

        if (!selectedTime) {
            alert("Por favor, selecione um horário.")
            return
        }

        if (selectedClasses.length === 0) {
            alert("Por favor, selecione pelo menos uma sala para participar.")
            return
        }

        const visitId = confirmVisitBtn.dataset.visitId
        const visita = visitasTecnicas.find((v) => v.id == visitId)
        const classNames = Array.from(selectedClasses)
            .map((cb) => cb.value)
            .join(", ")

        // Close visit modal
        visitModal.style.display = "none"

        // Show success modal
        document.getElementById("success-title").textContent = "Inscrição Realizada!"
        document.getElementById("success-message").textContent =
            `Sua inscrição para a visita técnica à ${visita.empresa} foi enviada com sucesso. Data: ${selectedVisitDate.toLocaleDateString("pt-BR")}, Horário: ${selectedTime.value}. Salas participantes: ${classNames}. Aguarde a confirmação.`
        successModal.style.display = "flex"

        // Reset form
        document.querySelectorAll('input[name="selected-classes"]').forEach((input) => {
            input.checked = false
        })
        document.getElementById("visit-notes").value = ""
        selectedVisitDate = null
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === scheduleLectureModal) {
            scheduleLectureModal.style.display = "none"
        }
        if (e.target === visitModal) {
            visitModal.style.display = "none"
        }
        if (e.target === successModal) {
            successModal.style.display = "none"
        }
    })
})
