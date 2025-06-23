document.addEventListener("DOMContentLoaded", () => {
    // Ensure all modals are closed on page load
    document.getElementById("event-details-modal").style.display = "none"
    document.getElementById("lecture-management-modal").style.display = "none"

    // Sample data
    const visitasTecnicas = [
        {
            id: 1,
            titulo: "Visita Técnica - TechSolutions",
            empresa: "TechSolutions",
            setor: "Desenvolvimento de Software",
            data: "2025-02-15",
            horario: "14:00 - 16:00",
            salas: ["1A", "2A", "3A"],
            status: "aprovado",
            descricao:
                "Visita ao setor de desenvolvimento para conhecer metodologias ágeis e tecnologias utilizadas no desenvolvimento de software",
            participantes: 25,
            endereco: "Av. Paulista, 1000 - São Paulo, SP",
            contato: "contato@techsolutions.com",
            responsavel: "João Silva",
        },
        {
            id: 2,
            titulo: "Visita Técnica - Inovação Digital",
            empresa: "Inovação Digital",
            setor: "Marketing Digital",
            data: "2025-02-20",
            horario: "10:00 - 12:00",
            salas: ["1B", "2B"],
            status: "pendente",
            descricao: "Conhecer estratégias de marketing digital e ferramentas utilizadas no mercado atual",
            participantes: 18,
            endereco: "Rua Augusta, 500 - São Paulo, SP",
            contato: "contato@inovacaodigital.com",
            responsavel: "Maria Santos",
        },
        {
            id: 3,
            titulo: "Visita Técnica - Construtech",
            empresa: "Construtech",
            setor: "Construção Civil",
            data: "2025-02-25",
            horario: "08:00 - 10:00",
            salas: ["3A", "3B"],
            status: "recusado",
            descricao: "Visita às obras e conhecimento de tecnologias na construção civil moderna",
            participantes: 30,
            endereco: "Zona Leste - São Paulo, SP",
            contato: "contato@construtech.com",
            responsavel: "Carlos Oliveira",
        },
    ]

    const palestras = [
        {
            id: 1,
            titulo: "Inteligência Artificial na Prática",
            data: "2025-02-18",
            horario: "19:00 - 21:00",
            salas: ["1A", "1B", "2A"],
            palestrantes: [
                { nome: "Ana Silva", nota: 4.8, status: "aceito" },
                { nome: "Carlos Mendes", nota: 4.5, status: "pendente" },
                { nome: "Mariana Costa", nota: 4.9, status: "aceito" },
                { nome: "João Santos", nota: 4.2, status: "pendente" },
                { nome: "Fernanda Lima", nota: 4.7, status: "rejeitado" },
            ],
            descricao: "Palestra sobre aplicações práticas de IA no mercado de trabalho",
            vagas: 2,
            inscritos: 5,
        },
        {
            id: 2,
            titulo: "Empreendedorismo Digital",
            data: "2025-02-22",
            horario: "14:00 - 16:00",
            salas: ["2B", "3A"],
            palestrantes: [
                { nome: "Roberto Silva", nota: 4.7, status: "aceito" },
                { nome: "Patricia Oliveira", nota: 4.3, status: "pendente" },
            ],
            descricao: "Como iniciar um negócio digital",
            vagas: 1,
            inscritos: 2,
        },
    ]

    // Event type buttons
    const eventTypeButtons = document.querySelectorAll(".event-type-btn")
    const visitasSection = document.getElementById("visitas-section")
    const palestrasSection = document.getElementById("palestras-section")

    // Modal elements
    const eventDetailsModal = document.getElementById("event-details-modal")
    const lectureManagementModal = document.getElementById("lecture-management-modal")

    // Event listeners for type buttons
    document.getElementById("visitas-btn").addEventListener("click", function () {
        // Remove active class from all buttons
        document.querySelectorAll(".event-type-btn").forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")

        // Show/hide sections
        document.getElementById("visitas-section").classList.add("active")
        document.getElementById("palestras-section").classList.remove("active")
    })

    document.getElementById("palestras-btn").addEventListener("click", function () {
        // Remove active class from all buttons
        document.querySelectorAll(".event-type-btn").forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")

        // Show/hide sections
        document.getElementById("palestras-section").classList.add("active")
        document.getElementById("visitas-section").classList.remove("active")
    })

    // Close modal buttons
    document.getElementById("close-details-modal").addEventListener("click", () => {
        eventDetailsModal.style.display = "none"
    })

    document.getElementById("close-lecture-management-modal").addEventListener("click", () => {
        lectureManagementModal.style.display = "none"
    })

    // Render functions
    function renderVisitasTecnicas() {
        const visitasGrid = document.getElementById("visitas-grid")
        visitasGrid.innerHTML = ""

        visitasTecnicas.forEach((visita) => {
            const visitCard = document.createElement("div")
            visitCard.className = "event-card"

            const statusClass =
                visita.status === "aprovado" ? "approved" : visita.status === "pendente" ? "pending" : "rejected"
            const statusIcon =
                visita.status === "aprovado" ? "fa-check-circle" : visita.status === "pendente" ? "fa-clock" : "fa-times-circle"

            visitCard.innerHTML = `
        <div class="event-card-header">
          <div>
            <h3 class="event-card-title">${visita.titulo}</h3>
            <div class="event-card-meta">
              <span><i class="fas fa-calendar"></i> ${formatDate(visita.data)}</span>
              <span><i class="fas fa-clock"></i> ${visita.horario}</span>
            </div>
          </div>
          <div class="event-status ${statusClass}">
            <i class="fas ${statusIcon}"></i>
            ${visita.status.charAt(0).toUpperCase() + visita.status.slice(1)}
          </div>
        </div>
        <div class="card-content">
          <p><strong>Empresa:</strong> ${visita.empresa}</p>
          <p><strong>Salas Participantes:</strong> ${visita.salas.join(", ")}</p>
          <p><strong>Participantes:</strong> ${visita.participantes} alunos</p>
          <p class="event-description">${visita.descricao}</p>
        </div>
        <div class="card-footer">
          <button class="button outline-button" onclick="showVisitDetails(${visita.id})">
            <i class="fas fa-info-circle"></i> Saiba Mais
          </button>
        </div>
      `

            visitasGrid.appendChild(visitCard)
        })
    }

    function renderPalestras() {
        const palestrasGrid = document.getElementById("palestras-grid")
        palestrasGrid.innerHTML = ""

        palestras.forEach((palestra) => {
            const palestraCard = document.createElement("div")
            palestraCard.className = "event-card"

            const acceptedCount = palestra.palestrantes.filter((p) => p.status === "aceito").length
            const pendingCount = palestra.palestrantes.filter((p) => p.status === "pendente").length

            palestraCard.innerHTML = `
        <div class="event-card-header">
          <div>
            <h3 class="event-card-title">${palestra.titulo}</h3>
            <div class="event-card-meta">
              <span><i class="fas fa-calendar"></i> ${formatDate(palestra.data)}</span>
              <span><i class="fas fa-clock"></i> ${palestra.horario}</span>
            </div>
          </div>
        </div>
        <div class="card-content">
          <p><strong>Salas Participantes:</strong> ${palestra.salas.join(", ")}</p>
          <p><strong>Palestrantes:</strong> ${palestra.inscritos} inscritos / ${palestra.vagas} vagas</p>
          <p><strong>Status:</strong> ${acceptedCount} aceitos, ${pendingCount} pendentes</p>
          <p class="event-description">${palestra.descricao}</p>
        </div>
        <div class="card-footer">
          <button class="button outline-button" onclick="showLectureManagement(${palestra.id})">
            <i class="fas fa-cog"></i> Gerenciar
          </button>
        </div>
      `

            palestrasGrid.appendChild(palestraCard)
        })
    }

    // Global functions for onclick events
    window.showVisitDetails = (visitId) => {
        const visita = visitasTecnicas.find((v) => v.id === visitId)
        if (!visita) return

        document.getElementById("event-details-title").textContent = visita.titulo

        const detailsContent = document.getElementById("event-details-content")
        detailsContent.innerHTML = `
      <div class="visit-info-card">
        <div class="visit-company-header">
          <div class="visit-company-icon">
            <i class="fas fa-building"></i>
          </div>
          <div class="visit-company-info">
            <h3>${visita.empresa}</h3>
            <p>${visita.setor}</p>
          </div>
        </div>
        <div class="visit-details-grid">
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-calendar"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Data</strong>
              <span>${formatDate(visita.data)}</span>
            </div>
          </div>
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Horário</strong>
              <span>${visita.horario}</span>
            </div>
          </div>
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Participantes</strong>
              <span>${visita.participantes} alunos</span>
            </div>
          </div>
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Salas Participantes</strong>
              <span>${visita.salas.join(", ")}</span>
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
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Responsável</strong>
              <span>${visita.responsavel}</span>
            </div>
          </div>
          <div class="visit-detail-item">
            <div class="visit-detail-icon">
              <i class="fas fa-info-circle"></i>
            </div>
            <div class="visit-detail-content">
              <strong>Status</strong>
              <span class="event-status ${visita.status}">${visita.status.charAt(0).toUpperCase() + visita.status.slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-section">
        <h4><i class="fas fa-file-alt"></i> Descrição da Visita</h4>
        <p>${visita.descricao}</p>
      </div>
    `

        // Configure action buttons based on status
        const editBtn = document.getElementById("edit-event-btn")
        const cancelBtn = document.getElementById("cancel-event-btn")

        if (visita.status === "pendente") {
            editBtn.style.display = "inline-flex"
            cancelBtn.style.display = "inline-flex"
            cancelBtn.textContent = "Cancelar Inscrição"
        } else if (visita.status === "aprovado") {
            editBtn.style.display = "inline-flex"
            cancelBtn.style.display = "inline-flex"
            cancelBtn.textContent = "Cancelar Participação"
        } else {
            editBtn.style.display = "none"
            cancelBtn.style.display = "none"
        }

        eventDetailsModal.style.display = "flex"
    }

    window.showLectureManagement = (lectureId) => {
        const palestra = palestras.find((p) => p.id === lectureId)
        if (!palestra) return

        document.getElementById("lecture-management-title").textContent = `Gerenciar: ${palestra.titulo}`

        // Lecture info card
        const lectureInfo = document.getElementById("lecture-info")
        lectureInfo.innerHTML = `
      <div class="lecture-header">
        <div class="lecture-icon">
          <i class="fas fa-microphone"></i>
        </div>
        <div class="lecture-info">
          <h3>${palestra.titulo}</h3>
          <p>${palestra.descricao}</p>
        </div>
      </div>
      <div class="visit-details-grid">
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-calendar"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Data</strong>
            <span>${formatDate(palestra.data)}</span>
          </div>
        </div>
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Horário</strong>
            <span>${palestra.horario}</span>
          </div>
        </div>
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Salas Participantes</strong>
            <span>${palestra.salas.join(", ")}</span>
          </div>
        </div>
        <div class="visit-detail-item">
          <div class="visit-detail-icon">
            <i class="fas fa-user-tie"></i>
          </div>
          <div class="visit-detail-content">
            <strong>Vagas</strong>
            <span>${palestra.vagas} palestrantes</span>
          </div>
        </div>
      </div>
    `

        // Update speakers stats
        const totalSpeakers = palestra.palestrantes.length
        const acceptedSpeakers = palestra.palestrantes.filter((p) => p.status === "aceito").length
        const pendingSpeakers = palestra.palestrantes.filter((p) => p.status === "pendente").length

        const speakersStats = document.getElementById("speakers-stats")
        speakersStats.innerHTML = `
      <div class="stat-badge total">
        <i class="fas fa-users"></i> ${totalSpeakers} Total
      </div>
      <div class="stat-badge accepted">
        <i class="fas fa-check"></i> ${acceptedSpeakers} Aceitos
      </div>
      <div class="stat-badge pending">
        <i class="fas fa-clock"></i> ${pendingSpeakers} Pendentes
      </div>
    `

        // Populate speakers table
        const speakersList = document.getElementById("speakers-list")
        speakersList.innerHTML = ""

        palestra.palestrantes.forEach((palestrante, index) => {
            const row = document.createElement("tr")

            const stars = "★".repeat(Math.floor(palestrante.nota)) + "☆".repeat(5 - Math.floor(palestrante.nota))
            const statusClass =
                palestrante.status === "aceito" ? "accepted" : palestrante.status === "pendente" ? "pending" : "rejected"

            row.innerHTML = `
  <td>
    <div class="speaker-name">
      <div class="speaker-avatar">
        ${palestrante.nome.charAt(0).toUpperCase()}
      </div>
      ${palestrante.nome}
    </div>
  </td>
  <td>
    <div class="speaker-rating">
      <span class="stars">${stars}</span>
      <span class="rating-number">${palestrante.nota}</span>
    </div>
  </td>
  <td>
    <span class="speaker-status-badge ${statusClass}">
      ${palestrante.status}
    </span>
  </td>
  <td>
    <div class="speaker-actions">
      <button class="action-btn ${palestrante.status === "aceito" ? "accepted-status" : "accept"}" 
              ${palestrante.status === "aceito" ? "disabled" : `onclick="acceptSpeaker(${lectureId}, ${index})"`}>
        <i class="fas fa-check"></i> ${palestrante.status === "aceito" ? "Aceito" : "Aceitar"}
      </button>
      <button class="action-btn ${palestrante.status === "rejeitado" ? "rejected-status" : "reject"}" 
              ${palestrante.status === "rejeitado" ? "disabled" : `onclick="rejectSpeaker(${lectureId}, ${index})"`}>
        <i class="fas fa-times"></i> ${palestrante.status === "rejeitado" ? "Rejeitado" : "Rejeitar"}
      </button>
    </div>
  </td>
`

            speakersList.appendChild(row)
        })

        lectureManagementModal.style.display = "flex"
    }

    // Speaker management functions
    window.acceptSpeaker = (lectureId, speakerIndex) => {
        const palestra = palestras.find((p) => p.id === lectureId)
        if (palestra && palestra.palestrantes[speakerIndex]) {
            palestra.palestrantes[speakerIndex].status = "aceito"
            window.showLectureManagement(lectureId) // Refresh the modal
            alert("Palestrante aceito com sucesso!")
        }
    }

    window.rejectSpeaker = (lectureId, speakerIndex) => {
        const palestra = palestras.find((p) => p.id === lectureId)
        if (palestra && palestra.palestrantes[speakerIndex]) {
            palestra.palestrantes[speakerIndex].status = "rejeitado"
            window.showLectureManagement(lectureId) // Refresh the modal
            alert("Palestrante rejeitado.")
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === eventDetailsModal) {
            eventDetailsModal.style.display = "none"
        }
        if (e.target === lectureManagementModal) {
            lectureManagementModal.style.display = "none"
        }
    })

    // Initial render
    renderVisitasTecnicas()
    renderPalestras()
})
