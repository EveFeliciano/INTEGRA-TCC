// Speaker Approval Page JavaScript

// Sample speaker data
const speakersData = {
  pending: [
    {
      id: 1,
      name: "Ana Silva",
      title: "Engenheira de Software",
      company: "TechCorp",
      area: "tecnologia",
      experience: "8 anos",
      email: "ana.silva@techcorp.com",
      phone: "(11) 99999-1234",
      bio: "Especialista em desenvolvimento de sistemas web e mobile com foco em tecnologias emergentes. Experiência em liderança de equipes e projetos de grande escala.",
      skills: ["JavaScript", "React", "Node.js", "Python", "DevOps"],
      avatar: "AS",
      appliedDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      title: "Gerente de Produção",
      company: "IndústriaBR",
      area: "industria",
      experience: "12 anos",
      email: "carlos.mendes@industriabr.com",
      phone: "(11) 98888-5678",
      bio: "Profissional com vasta experiência em gestão de produção industrial, implementação de processos lean e melhoria contínua.",
      skills: ["Lean Manufacturing", "Six Sigma", "Gestão de Qualidade", "Automação"],
      avatar: "CM",
      appliedDate: "2025-01-14",
    },
    {
      id: 3,
      name: "Mariana Costa",
      title: "Especialista em Sustentabilidade",
      company: "EcoSolutions",
      area: "sustentabilidade",
      experience: "6 anos",
      email: "mariana.costa@ecosolutions.com",
      phone: "(11) 97777-9012",
      bio: "Consultora em sustentabilidade empresarial com foco em economia circular e tecnologias verdes.",
      skills: ["ESG", "Economia Circular", "Energias Renováveis", "Gestão Ambiental"],
      avatar: "MC",
      appliedDate: "2025-01-13",
    },
  ],
  approved: [
    {
      id: 4,
      name: "Roberto Santos",
      title: "Diretor de Inovação",
      company: "InnovaTech",
      area: "inovacao",
      experience: "15 anos",
      email: "roberto.santos@innovatech.com",
      phone: "(11) 96666-3456",
      bio: "Líder em transformação digital e inovação tecnológica com experiência internacional.",
      skills: ["Transformação Digital", "IA", "Blockchain", "Startups"],
      avatar: "RS",
      appliedDate: "2025-01-10",
      approvedDate: "2025-01-12",
    },
  ],
  rejected: [
    {
      id: 5,
      name: "Julia Oliveira",
      title: "Analista de Sistemas",
      company: "SoftwarePlus",
      area: "tecnologia",
      experience: "3 anos",
      email: "julia.oliveira@softwareplus.com",
      phone: "(11) 95555-7890",
      bio: "Desenvolvedora júnior com interesse em palestras educacionais.",
      skills: ["Java", "Spring", "MySQL"],
      avatar: "JO",
      appliedDate: "2025-01-08",
      rejectedDate: "2025-01-11",
      rejectionReason: "Experiência insuficiente para o perfil solicitado",
    },
  ],
}

// DOM Elements
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")
const searchInput = document.getElementById("searchInput")
const areaFilter = document.getElementById("areaFilter")
const speakerModal = document.getElementById("speakerModal")
const closeModal = document.getElementById("closeModal")
const modalBody = document.getElementById("modalBody")

// Current filters
let currentTab = "pending"
let currentSearch = ""
let currentAreaFilter = ""

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  updateStats()
  renderSpeakers()
  setupEventListeners()
})

// Update statistics
function updateStats() {
  document.getElementById("pendingCount").textContent = speakersData.pending.length
  document.getElementById("approvedCount").textContent = speakersData.approved.length
  document.getElementById("rejectedCount").textContent = speakersData.rejected.length
  document.getElementById("totalCount").textContent =
    speakersData.pending.length + speakersData.approved.length + speakersData.rejected.length

  // Update tab counts
  document.querySelector('[data-tab="pending"] .tab-count').textContent = speakersData.pending.length
  document.querySelector('[data-tab="approved"] .tab-count').textContent = speakersData.approved.length
  document.querySelector('[data-tab="rejected"] .tab-count').textContent = speakersData.rejected.length
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab
      switchTab(tab)
    })
  })

  // Search and filters
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase()
    renderSpeakers()
  })

  areaFilter.addEventListener("change", (e) => {
    currentAreaFilter = e.target.value
    renderSpeakers()
  })

  // Modal
  closeModal.addEventListener("click", closeModalHandler)
  speakerModal.addEventListener("click", (e) => {
    if (e.target === speakerModal) {
      closeModalHandler()
    }
  })
}

// Switch tabs
function switchTab(tab) {
  currentTab = tab

  // Update tab buttons
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab)
  })

  // Update tab contents
  tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === `${tab}-content`)
  })

  renderSpeakers()
}

// Render speakers based on current tab and filters
function renderSpeakers() {
  const container = document.getElementById(`${currentTab}Speakers`)
  let speakers = speakersData[currentTab] || []

  // Apply filters
  if (currentSearch) {
    speakers = speakers.filter(
      (speaker) =>
        speaker.name.toLowerCase().includes(currentSearch) ||
        speaker.title.toLowerCase().includes(currentSearch) ||
        speaker.company.toLowerCase().includes(currentSearch),
    )
  }

  if (currentAreaFilter) {
    speakers = speakers.filter((speaker) => speaker.area === currentAreaFilter)
  }

  // Render speakers
  if (speakers.length === 0) {
    container.innerHTML = `
              <div class="empty-state">
                  <i class="fas fa-users"></i>
                  <h3>Nenhum palestrante encontrado</h3>
                  <p>Não há palestrantes ${currentTab === "pending" ? "pendentes" : currentTab === "approved" ? "aprovados" : "rejeitados"} no momento.</p>
              </div>
          `
    return
  }

  container.innerHTML = speakers.map((speaker) => createSpeakerCard(speaker)).join("")

  // Add event listeners to action buttons
  addActionListeners()
}

// Create speaker card HTML
function createSpeakerCard(speaker) {
  const statusBadge =
    currentTab !== "pending"
      ? `<div class="status-badge status-${currentTab}">${currentTab === "approved" ? "Aprovado" : "Rejeitado"}</div>`
      : ""

  const actions =
    currentTab === "pending"
      ? `<div class="speaker-actions">
              <button class="btn-approve" data-id="${speaker.id}">
                  <i class="fas fa-check"></i>
                  Aprovar
              </button>
              <button class="btn-reject" data-id="${speaker.id}">
                  <i class="fas fa-times"></i>
                  Rejeitar
              </button>
              <button class="btn-view" data-id="${speaker.id}">
                  <i class="fas fa-eye"></i>
                  Ver Detalhes
              </button>
          </div>`
      : `<div class="speaker-actions">
              <button class="btn-view" data-id="${speaker.id}">
                  <i class="fas fa-eye"></i>
                  Ver Detalhes
              </button>
          </div>`

  return `
          <div class="speaker-card">
              <div class="speaker-header">
                  <div class="speaker-avatar">
                      ${speaker.avatar}
                  </div>
                  <div class="speaker-info">
                      <h3>${speaker.name}</h3>
                      <p>${speaker.title} • ${speaker.company}</p>
                  </div>
                  ${statusBadge}
              </div>
              
              <div class="speaker-details">
                  <div class="speaker-meta">
                      <div class="meta-item">
                          <i class="fas fa-briefcase"></i>
                          <span>${speaker.experience} de experiência</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-layer-group"></i>
                          <span>${getAreaName(speaker.area)}</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-calendar"></i>
                          <span>Aplicou em ${formatDate(speaker.appliedDate)}</span>
                      </div>
                  </div>
                  
                  <div class="speaker-bio">
                      ${speaker.bio}
                  </div>
                  
                  <div class="speaker-skills">
                      ${speaker.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                  </div>
              </div>
              
              ${actions}
          </div>
      `
}

// Add event listeners to action buttons
function addActionListeners() {
  // Approve buttons
  document.querySelectorAll(".btn-approve").forEach((button) => {
    button.addEventListener("click", (e) => {
      const speakerId = Number.parseInt(e.target.closest(".btn-approve").dataset.id)
      approveSpeaker(speakerId)
    })
  })

  // Reject buttons
  document.querySelectorAll(".btn-reject").forEach((button) => {
    button.addEventListener("click", (e) => {
      const speakerId = Number.parseInt(e.target.closest(".btn-reject").dataset.id)
      rejectSpeaker(speakerId)
    })
  })

  // View details buttons
  document.querySelectorAll(".btn-view").forEach((button) => {
    button.addEventListener("click", (e) => {
      const speakerId = Number.parseInt(e.target.closest(".btn-view").dataset.id)
      viewSpeakerDetails(speakerId)
    })
  })
}

// Approve speaker
function approveSpeaker(speakerId) {
  const speakerIndex = speakersData.pending.findIndex((s) => s.id === speakerId)
  if (speakerIndex !== -1) {
    const speaker = speakersData.pending.splice(speakerIndex, 1)[0]
    speaker.approvedDate = new Date().toISOString().split("T")[0]
    speakersData.approved.push(speaker)

    updateStats()
    renderSpeakers()

    // Show success message
    showNotification("Palestrante aprovado com sucesso!", "success")
  }
}

// Reject speaker
function rejectSpeaker(speakerId) {
  const reason = prompt("Motivo da rejeição (opcional):")

  const speakerIndex = speakersData.pending.findIndex((s) => s.id === speakerId)
  if (speakerIndex !== -1) {
    const speaker = speakersData.pending.splice(speakerIndex, 1)[0]
    speaker.rejectedDate = new Date().toISOString().split("T")[0]
    speaker.rejectionReason = reason || "Não especificado"
    speakersData.rejected.push(speaker)

    updateStats()
    renderSpeakers()

    // Show success message
    showNotification("Palestrante rejeitado.", "info")
  }
}

// View speaker details
function viewSpeakerDetails(speakerId) {
  const speaker = findSpeakerById(speakerId)
  if (!speaker) return

  modalBody.innerHTML = `
          <div class="speaker-header">
              <div class="speaker-avatar">
                  ${speaker.avatar}
              </div>
              <div class="speaker-info">
                  <h3>${speaker.name}</h3>
                  <p>${speaker.title} • ${speaker.company}</p>
              </div>
          </div>
          
          <div class="speaker-details" style="margin-top: 1.5rem;">
              <div class="speaker-meta">
                  <div class="meta-item">
                      <i class="fas fa-envelope"></i>
                      <span>${speaker.email}</span>
                  </div>
                  <div class="meta-item">
                      <i class="fas fa-phone"></i>
                      <span>${speaker.phone}</span>
                  </div>
                  <div class="meta-item">
                      <i class="fas fa-briefcase"></i>
                      <span>${speaker.experience} de experiência</span>
                  </div>
                  <div class="meta-item">
                      <i class="fas fa-layer-group"></i>
                      <span>${getAreaName(speaker.area)}</span>
                  </div>
              </div>
              
              <div style="margin: 1.5rem 0;">
                  <h4>Biografia</h4>
                  <p>${speaker.bio}</p>
              </div>
              
              <div style="margin: 1.5rem 0;">
                  <h4>Habilidades</h4>
                  <div class="speaker-skills">
                      ${speaker.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                  </div>
              </div>
              
              ${
                speaker.rejectionReason
                  ? `
                  <div style="margin: 1.5rem 0;">
                      <h4>Motivo da Rejeição</h4>
                      <p style="color: #dc2626;">${speaker.rejectionReason}</p>
                  </div>
              `
                  : ""
              }
          </div>
      `

  speakerModal.classList.add("active")
}

// Close modal
function closeModalHandler() {
  speakerModal.classList.remove("active")
}

// Find speaker by ID across all categories
function findSpeakerById(id) {
  for (const category of Object.values(speakersData)) {
    const speaker = category.find((s) => s.id === id)
    if (speaker) return speaker
  }
  return null
}

// Get area name in Portuguese
function getAreaName(area) {
  const areas = {
    tecnologia: "Tecnologia",
    industria: "Indústria",
    inovacao: "Inovação",
    sustentabilidade: "Sustentabilidade",
  }
  return areas[area] || area
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
          <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
          <span>${message}</span>
      `

  // Add styles
  notification.style.cssText = `
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: ${type === "success" ? "#16a34a" : "#3b82f6"};
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          animation: slideIn 0.3s ease;
      `

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
      @keyframes slideIn {
          from {
              transform: translateX(100%);
              opacity: 0;
          }
          to {
              transform: translateX(0);
              opacity: 1;
          }
      }
      
      @keyframes slideOut {
          from {
              transform: translateX(0);
              opacity: 1;
          }
          to {
              transform: translateX(100%);
              opacity: 0;
          }
      }
  `
document.head.appendChild(style)
