document.addEventListener("DOMContentLoaded", () => {
  const companySpeakers = [
    {
      id: 1,
      name: "Dr. João Silva",
      expertise: "Tecnologia da Informação",
      experience: "15 anos",
      photo: "/professional-man.png",
      email: "joao.silva@empresa.com",
      phone: "(11) 99999-1111",
      bio: "Especialista em desenvolvimento de software e arquitetura de sistemas",
    },
    {
      id: 2,
      name: "Eng. Maria Santos",
      expertise: "Automação Industrial",
      experience: "12 anos",
      photo: "/professional-woman-engineer.png",
      email: "maria.santos@empresa.com",
      phone: "(11) 99999-2222",
      bio: "Engenheira especializada em automação e robótica industrial",
    },
    {
      id: 3,
      name: "Prof. Carlos Oliveira",
      expertise: "Design e Inovação",
      experience: "10 anos",
      photo: "/professional-man-designer.jpg",
      email: "carlos.oliveira@empresa.com",
      phone: "(11) 99999-3333",
      bio: "Designer industrial com foco em inovação e desenvolvimento de produtos",
    },
  ]

  const technicalVisits = [
    {
      id: 1,
      title: "Visita à Fábrica de Tecnologia",
      type: "tecnica",
      area: "tecnologia",
      duration: 4,
      description:
        "Conheça nossos processos de desenvolvimento de software e infraestrutura tecnológica em uma visita guiada completa.",
      requirements: "Estudantes de cursos de TI, máximo 30 alunos",
      createdAt: new Date(2025, 4, 20),
      status: "active",
      institutions: 8,
      views: 45,
      scheduled: 3,
      assignedSpeaker: null,
      interestedInstitutions: [
        {
          name: "ETEC de São Paulo",
          type: "ETEC",
          course: "Desenvolvimento de Sistemas",
          contact: "contato@etecsp.edu.br",
          phone: "(11) 3333-1111",
        },
        {
          name: "FATEC Zona Sul",
          type: "FATEC",
          course: "Análise e Desenvolvimento de Sistemas",
          contact: "contato@fateczs.edu.br",
          phone: "(11) 3333-2222",
        },
        {
          name: "ETEC de Santos",
          type: "ETEC",
          course: "Informática",
          contact: "contato@etecsantos.edu.br",
          phone: "(13) 3333-3333",
        },
      ],
    },
    {
      id: 2,
      title: "Workshop de Design Industrial",
      type: "workshop",
      area: "industria",
      duration: 6,
      description: "Workshop prático sobre design de produtos industriais e processos de fabricação moderna.",
      requirements: "Estudantes de Design e Engenharia, máximo 25 alunos",
      createdAt: new Date(2025, 4, 18),
      status: "active",
      institutions: 12,
      views: 67,
      scheduled: 5,
      assignedSpeaker: companySpeakers[2], // Carlos Oliveira assigned
      interestedInstitutions: [
        {
          name: "FATEC São Caetano",
          type: "FATEC",
          course: "Design de Produto",
          contact: "contato@fatecsc.edu.br",
          phone: "(11) 4444-1111",
        },
        {
          name: "ETEC Getúlio Vargas",
          type: "ETEC",
          course: "Design Gráfico",
          contact: "contato@etecgv.edu.br",
          phone: "(11) 4444-2222",
        },
      ],
    },
    {
      id: 3,
      title: "Palestra sobre Inovação em Saúde",
      type: "palestra",
      area: "saude",
      duration: 2,
      description: "Apresentação sobre as últimas inovações tecnológicas aplicadas à área da saúde.",
      requirements: "Estudantes de cursos da área da saúde",
      createdAt: new Date(2025, 4, 15),
      status: "active",
      institutions: 15,
      views: 89,
      scheduled: 2,
      assignedSpeaker: null,
      interestedInstitutions: [
        {
          name: "FATEC Zona Leste",
          type: "FATEC",
          course: "Radiologia",
          contact: "contato@fateczl.edu.br",
          phone: "(11) 5555-1111",
        },
        {
          name: "ETEC Santa Isabel",
          type: "ETEC",
          course: "Enfermagem",
          contact: "contato@etecsi.edu.br",
          phone: "(11) 5555-2222",
        },
      ],
    },
    {
      id: 4,
      title: "Visita ao Centro de Serviços",
      type: "tecnica",
      area: "servicos",
      duration: 3,
      description: "Conheça como funciona um grande centro de atendimento ao cliente e processos de qualidade.",
      requirements: "Estudantes de Administração e áreas afins",
      createdAt: new Date(2025, 4, 10),
      status: "closed",
      institutions: 20,
      views: 134,
      scheduled: 8,
      assignedSpeaker: null,
      interestedInstitutions: [
        {
          name: "FATEC Osasco",
          type: "FATEC",
          course: "Gestão Empresarial",
          contact: "contato@fatecos.edu.br",
          phone: "(11) 6666-1111",
        },
        {
          name: "ETEC Cidade Tiradentes",
          type: "ETEC",
          course: "Administração",
          contact: "contato@etecct.edu.br",
          phone: "(11) 6666-2222",
        },
      ],
    },
    {
      id: 5,
      title: "Workshop de Automação Industrial",
      type: "workshop",
      area: "industria",
      duration: 8,
      description: "Workshop hands-on sobre automação industrial e robótica aplicada à produção.",
      requirements: "Estudantes de Engenharia e Mecatrônica, máximo 20 alunos",
      createdAt: new Date(2025, 4, 8),
      status: "active",
      institutions: 6,
      views: 34,
      scheduled: 1,
      assignedSpeaker: companySpeakers[1], // Maria Santos assigned
      interestedInstitutions: [
        {
          name: "FATEC São Paulo",
          type: "FATEC",
          course: "Automação Industrial",
          contact: "contato@fatecsp.edu.br",
          phone: "(11) 7777-1111",
        },
        {
          name: "ETEC Lauro Gomes",
          type: "ETEC",
          course: "Mecatrônica",
          contact: "contato@eteclg.edu.br",
          phone: "(11) 7777-2222",
        },
      ],
    },
  ]

  let filteredVisits = [...technicalVisits]
  let currentView = "grid"
  let selectedVisitId = null

  const visitsGrid = document.getElementById("visitsGrid")
  const visitsList = document.getElementById("visitsList")
  const emptyState = document.getElementById("emptyState")
  const hamburger = document.getElementById("hamburger")
  const nav = document.getElementById("mainNav")
  const modal = document.getElementById("visitActionsModal")
  const closeModal = document.getElementById("closeModal")
  const institutionsModal = document.getElementById("institutionsModal")
  const closeInstitutionsModal = document.getElementById("closeInstitutionsModal")

  const totalVisitsEl = document.getElementById("totalVisits")
  const activeVisitsEl = document.getElementById("activeVisits")
  const totalInstitutionsEl = document.getElementById("totalInstitutions")
  const scheduledVisitsEl = document.getElementById("scheduledVisits")

  const statusFilter = document.getElementById("statusFilter")
  const typeFilter = document.getElementById("typeFilter")
  const areaFilter = document.getElementById("areaFilter")
  const searchFilter = document.getElementById("searchFilter")

  // View toggle buttons
  const viewButtons = document.querySelectorAll(".view-btn")

  const editVisitBtn = document.getElementById("editVisitBtn")
  const viewInstitutionsBtn = document.getElementById("viewInstitutionsBtn")
  const scheduleVisitBtn = document.getElementById("scheduleVisitBtn")
  const contactInstitutionBtn = document.getElementById("contactInstitutionBtn")
  const pauseVisitBtn = document.getElementById("pauseVisitBtn")
  const deleteVisitBtn = document.getElementById("deleteVisitBtn")

  // Initialize
  updateStats()
  applyFilters()
  renderVisits()

  // Event Listeners
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Filter event listeners
  statusFilter.addEventListener("change", applyFilters)
  typeFilter.addEventListener("change", applyFilters)
  areaFilter.addEventListener("change", applyFilters)
  searchFilter.addEventListener("input", applyFilters)

  // View toggle event listeners
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view
      switchView(view)
    })
  })

  // Modal event listeners
  if (closeModal) {
    closeModal.addEventListener("click", closeVisitModal)
  }

  if (closeInstitutionsModal) {
    closeInstitutionsModal.addEventListener("click", closeInstitutionsModalFunc)
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeVisitModal()
      }
    })
  }

  if (institutionsModal) {
    institutionsModal.addEventListener("click", (e) => {
      if (e.target === institutionsModal) {
        closeInstitutionsModalFunc()
      }
    })
  }

  function updateStats() {
    const totalVisits = technicalVisits.length
    const activeVisits = technicalVisits.filter((visit) => visit.status === "active").length
    const totalInstitutions = technicalVisits.reduce((sum, visit) => sum + visit.institutions, 0)
    const scheduledVisits = technicalVisits.reduce((sum, visit) => sum + visit.scheduled, 0)

    if (totalVisitsEl) totalVisitsEl.textContent = totalVisits
    if (activeVisitsEl) activeVisitsEl.textContent = activeVisits
    if (totalInstitutionsEl) totalInstitutionsEl.textContent = totalInstitutions
    if (scheduledVisitsEl) scheduledVisitsEl.textContent = scheduledVisits
  }

  function applyFilters() {
    const statusValue = statusFilter.value
    const typeValue = typeFilter.value
    const areaValue = areaFilter.value
    const searchValue = searchFilter.value.toLowerCase()

    filteredVisits = technicalVisits.filter((visit) => {
      const matchesStatus = statusValue === "all" || visit.status === statusValue
      const matchesType = typeValue === "all" || visit.type === typeValue
      const matchesArea = areaValue === "all" || visit.area === areaValue
      const matchesSearch =
        searchValue === "" ||
        visit.title.toLowerCase().includes(searchValue) ||
        visit.description.toLowerCase().includes(searchValue)

      return matchesStatus && matchesType && matchesArea && matchesSearch
    })

    renderVisits()
  }

  function switchView(view) {
    currentView = view

    // Update button states
    viewButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === view)
    })

    // Show/hide appropriate containers
    if (view === "grid") {
      if (visitsGrid) visitsGrid.style.display = "grid"
      if (visitsList) visitsList.style.display = "none"
    } else {
      if (visitsGrid) visitsGrid.style.display = "none"
      if (visitsList) visitsList.style.display = "flex"
    }

    renderVisits()
  }

  function renderVisits() {
    if (filteredVisits.length === 0) {
      showEmptyState()
      return
    }

    hideEmptyState()

    if (currentView === "grid") {
      renderVisitsGrid()
    } else {
      renderVisitsList()
    }
  }

  function renderVisitsGrid() {
    if (!visitsGrid) return

    visitsGrid.innerHTML = filteredVisits
      .map(
        (visit) => `
              <div class="job-card" data-visit-id="${visit.id}">
                  <div class="job-status ${visit.status}">${getStatusText(visit.status)}</div>
                  <div class="job-header">
                      <div>
                          <h3 class="job-title">${visit.title}</h3>
                          <span class="job-level">${visit.type}</span>
                      </div>
                  </div>
                  <div class="job-meta">
                      <div class="job-meta-item">
                          <i class="fas fa-industry"></i>
                          <span>${visit.area}</span>
                      </div>
                      <div class="job-meta-item">
                          <i class="fas fa-clock"></i>
                          <span>${visit.duration}h de duração</span>
                      </div>
                      <div class="job-meta-item">
                          <i class="fas fa-calendar"></i>
                          <span>${visit.createdAt.toLocaleDateString("pt-BR")}</span>
                      </div>
                  </div>
                  <p class="job-description">${visit.description}</p>
                  <div class="job-stats">
                      <div class="job-stat">
                          <div class="job-stat-number">${visit.institutions}</div>
                          <div class="job-stat-label">Instituições</div>
                      </div>
                      <div class="job-stat">
                          <div class="job-stat-number">${visit.views}</div>
                          <div class="job-stat-label">Visualizações</div>
                      </div>
                      <div class="job-stat">
                          <div class="job-stat-number">${visit.scheduled}</div>
                          <div class="job-stat-label">Agendadas</div>
                      </div>
                  </div>
                  <div class="job-actions">
                      ${visit.type === "workshop" ? `<button class="job-action" onclick="addSpeaker(${visit.id})">Adicionar Palestrante</button>` : ""}
                      <button class="job-action primary" onclick="viewInstitutions(${visit.id})">Ver Instituições</button>
                      <button class="job-action" onclick="openVisitModal(${visit.id})">Mais</button>
                  </div>
              </div>
          `,
      )
      .join("")
  }

  function renderVisitsList() {
    if (!visitsList) return

    visitsList.innerHTML = filteredVisits
      .map(
        (visit) => `
              <div class="job-list-item" data-visit-id="${visit.id}">
                  <div class="job-list-content">
                      <h3 class="job-list-title">${visit.title}</h3>
                      <div class="job-list-meta">
                          <span><i class="fas fa-industry"></i> ${visit.area}</span>
                          <span><i class="fas fa-clock"></i> ${visit.duration}h</span>
                          <span><i class="fas fa-school"></i> ${visit.institutions} instituições</span>
                          <span class="job-status ${visit.status}">${getStatusText(visit.status)}</span>
                      </div>
                  </div>
                  <div class="job-list-actions">
                      ${visit.type === "workshop" ? `<button class="job-list-action" onclick="addSpeaker(${visit.id})">Palestrante</button>` : ""}
                      <button class="job-list-action" onclick="viewInstitutions(${visit.id})">Instituições</button>
                      <button class="job-list-action" onclick="openVisitModal(${visit.id})">Mais</button>
                  </div>
              </div>
          `,
      )
      .join("")
  }

  function showEmptyState() {
    if (visitsGrid) visitsGrid.style.display = "none"
    if (visitsList) visitsList.style.display = "none"
    if (emptyState) emptyState.style.display = "block"
  }

  function hideEmptyState() {
    if (emptyState) emptyState.style.display = "none"
    if (currentView === "grid") {
      if (visitsGrid) visitsGrid.style.display = "grid"
    } else {
      if (visitsList) visitsList.style.display = "flex"
    }
  }

  function getStatusText(status) {
    const statusMap = {
      active: "Ativa",
      paused: "Pausada",
      closed: "Fechada",
    }
    return statusMap[status] || status
  }

  function openVisitModal(visitId) {
    selectedVisitId = visitId
    if (modal) modal.classList.add("active")
  }

  function closeVisitModal() {
    if (modal) modal.classList.remove("active")
    selectedVisitId = null
  }

  function closeInstitutionsModalFunc() {
    if (institutionsModal) institutionsModal.classList.remove("active")
  }

  function showInstitutions(visitId) {
    const visit = technicalVisits.find((v) => v.id === visitId)
    if (!visit || !institutionsModal) return

    const institutionsList = document.getElementById("institutionsList")
    if (!institutionsList) return

    institutionsList.innerHTML = visit.interestedInstitutions
      .map(
        (institution) => `
        <div class="institution-item">
          <div class="institution-info">
            <h4>${institution.name}</h4>
            <p><i class="fas fa-graduation-cap"></i> ${institution.type} - ${institution.course}</p>
            <p><i class="fas fa-envelope"></i> ${institution.contact}</p>
            <div class="institution-phone">
              <i class="fas fa-phone"></i> 
              <span class="phone-number">${institution.phone}</span>
            </div>
          </div>
          <div class="institution-actions">
            <button class="institution-btn primary" onclick="scheduleVisitWithInstitution('${institution.name}')">
              <i class="fas fa-calendar-plus"></i> Agendar
            </button>
            <button class="institution-btn" onclick="contactInstitution('${institution.contact}')">
              <i class="fas fa-phone"></i> Contatar
            </button>
          </div>
        </div>
      `,
      )
      .join("")

    institutionsModal.classList.add("active")
  }

  window.addSpeaker = (visitId) => {
    console.log("[v0] Adding speaker to visit:", visitId)
    showSpeakerSelection(visitId)
  }

  function showSpeakerSelection(visitId) {
    const visit = technicalVisits.find((v) => v.id === visitId)
    if (!visit) return

    const speakerOptions = companySpeakers
      .map((speaker) => `<option value="${speaker.id}">${speaker.name} - ${speaker.expertise}</option>`)
      .join("")

    const modalHTML = `
      <div class="modal active" id="speakerModal">
        <div class="modal-content institutions-modal">
          <div class="modal-header">
            <h3>Selecionar Palestrante</h3>
            <button class="modal-close" onclick="closeSpeakerModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="speaker-selection">
              <label for="speakerSelect">Escolha um palestrante:</label>
              <select id="speakerSelect" class="filter-select">
                <option value="">Selecione um palestrante</option>
                ${speakerOptions}
              </select>
              <div id="speakerPreview" class="speaker-preview"></div>
              <button class="btn-primary" onclick="assignSpeaker(${visitId})">Atribuir Palestrante</button>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.insertAdjacentHTML("beforeend", modalHTML)

    // Add event listener for speaker selection
    document.getElementById("speakerSelect").addEventListener("change", function () {
      const speakerId = this.value
      if (speakerId) {
        const speaker = companySpeakers.find((s) => s.id == speakerId)
        if (speaker) {
          document.getElementById("speakerPreview").innerHTML = `
            <div class="speaker-card">
              <img src="${speaker.photo}" alt="${speaker.name}" class="speaker-photo">
              <div class="speaker-info">
                <h4>${speaker.name}</h4>
                <p><strong>Especialidade:</strong> ${speaker.expertise}</p>
                <p><strong>Experiência:</strong> ${speaker.experience}</p>
                <p><strong>Email:</strong> ${speaker.email}</p>
                <p><strong>Telefone:</strong> ${speaker.phone}</p>
                <p class="speaker-bio">${speaker.bio}</p>
              </div>
            </div>
          `
        }
      } else {
        document.getElementById("speakerPreview").innerHTML = ""
      }
    })
  }

  window.closeSpeakerModal = () => {
    const modal = document.getElementById("speakerModal")
    if (modal) {
      modal.remove()
    }
  }

  window.assignSpeaker = (visitId) => {
    const speakerId = document.getElementById("speakerSelect").value
    if (!speakerId) {
      alert("Por favor, selecione um palestrante")
      return
    }

    const speaker = companySpeakers.find((s) => s.id == speakerId)
    const visit = technicalVisits.find((v) => v.id === visitId)

    if (speaker && visit) {
      visit.assignedSpeaker = speaker
      alert(`Palestrante ${speaker.name} atribuído com sucesso!`)
      window.closeSpeakerModal()
      renderVisits() // Re-render to show updated information
    }
  }

  window.viewInstitutions = (visitId) => {
    console.log("[v0] Viewing institutions for visit:", visitId)
    showInstitutions(visitId)
  }

  window.scheduleVisit = (visitId) => {
    console.log("[v0] Scheduling visit:", visitId)
    alert(`Agendando visita ${visitId}`)
    closeVisitModal()
  }

  window.scheduleVisitWithInstitution = (institutionName) => {
    console.log("[v0] Scheduling visit with institution:", institutionName)
    alert(`Agendando visita com ${institutionName}`)
    closeInstitutionsModalFunc()
  }

  window.contactInstitution = (contact) => {
    console.log("[v0] Contacting institution:", contact)
    window.open(`mailto:${contact}`, "_blank")
  }

  window.pauseVisit = (visitId) => {
    console.log("[v0] Pausing visit:", visitId)
    alert(`Pausando visita ${visitId}`)
    closeVisitModal()
  }

  window.deleteVisit = (visitId) => {
    console.log("[v0] Deleting visit:", visitId)
    if (confirm("Tem certeza que deseja excluir esta visita?")) {
      alert(`Excluindo visita ${visitId}`)
    }
    closeVisitModal()
  }

  window.openVisitModal = (visitId) => {
    openVisitModal(visitId)
  }

  console.log("[v0] Technical visits page initialized successfully")
  console.log("[v0] Total visits loaded:", technicalVisits.length)
  console.log("[v0] Company speakers loaded:", companySpeakers.length)
})
