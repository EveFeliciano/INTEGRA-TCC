document.addEventListener("DOMContentLoaded", () => {
    // Sample job postings data
    const jobPostings = [
      {
        id: 1,
        title: "Desenvolvedor React Sênior",
        level: "senior",
        area: "desenvolvimento",
        salary: 8000,
        description:
          "Buscamos um desenvolvedor React experiente para liderar projetos inovadores em nossa equipe de tecnologia.",
        requirements: "React, TypeScript, Node.js, 5+ anos de experiência",
        createdAt: new Date(2025, 4, 20),
        status: "active",
        candidates: 15,
        views: 120,
        pendingReviews: 8,
      },
      {
        id: 2,
        title: "Designer UX/UI Pleno",
        level: "pleno",
        area: "design",
        salary: 5500,
        description:
          "Oportunidade para designer criativo trabalhar em produtos digitais que impactam milhares de usuários.",
        requirements: "Figma, Adobe Creative Suite, portfolio sólido, 3+ anos",
        createdAt: new Date(2025, 4, 18),
        status: "active",
        candidates: 23,
        views: 89,
        pendingReviews: 12,
      },
      {
        id: 3,
        title: "Analista de Marketing Digital",
        level: "pleno",
        area: "marketing",
        salary: 4500,
        description: "Profissional para gerenciar campanhas digitais e estratégias de crescimento online.",
        requirements: "Google Ads, Facebook Ads, Analytics, SEO, 2+ anos",
        createdAt: new Date(2025, 4, 15),
        status: "paused",
        candidates: 31,
        views: 156,
        pendingReviews: 5,
      },
      {
        id: 4,
        title: "Desenvolvedor Full Stack Júnior",
        level: "junior",
        area: "desenvolvimento",
        salary: 3500,
        description: "Vaga para desenvolvedor iniciante com vontade de aprender e crescer em ambiente colaborativo.",
        requirements: "JavaScript, HTML, CSS, conhecimento básico em frameworks",
        createdAt: new Date(2025, 4, 10),
        status: "closed",
        candidates: 67,
        views: 234,
        pendingReviews: 0,
      },
      {
        id: 5,
        title: "Gerente de Vendas",
        level: "senior",
        area: "vendas",
        salary: 7000,
        description: "Liderar equipe de vendas e desenvolver estratégias para expansão de mercado.",
        requirements: "Experiência em gestão, CRM, vendas B2B, 5+ anos",
        createdAt: new Date(2025, 4, 8),
        status: "active",
        candidates: 19,
        views: 78,
        pendingReviews: 7,
      },
    ]
  
    let filteredJobs = [...jobPostings]
    let currentView = "grid"
    let selectedJobId = null
  
    // DOM Elements
    const jobsGrid = document.getElementById("jobsGrid")
    const jobsList = document.getElementById("jobsList")
    const emptyState = document.getElementById("emptyState")
    const hamburger = document.getElementById("hamburger")
    const nav = document.getElementById("mainNav")
    const modal = document.getElementById("jobActionsModal")
    const closeModal = document.getElementById("closeModal")
  
    // Stats elements
    const totalJobsEl = document.getElementById("totalJobs")
    const activeJobsEl = document.getElementById("activeJobs")
    const totalCandidatesEl = document.getElementById("totalCandidates")
    const pendingReviewsEl = document.getElementById("pendingReviews")
  
    // Filter elements
    const statusFilter = document.getElementById("statusFilter")
    const levelFilter = document.getElementById("levelFilter")
    const areaFilter = document.getElementById("areaFilter")
    const searchFilter = document.getElementById("searchFilter")
  
    // View toggle buttons
    const viewButtons = document.querySelectorAll(".view-btn")
  
    // Modal buttons
    const editJobBtn = document.getElementById("editJobBtn")
    const viewCandidatesBtn = document.getElementById("viewCandidatesBtn")
    const pauseJobBtn = document.getElementById("pauseJobBtn")
    const deleteJobBtn = document.getElementById("deleteJobBtn")
  
    // Initialize
    updateStats()
    applyFilters()
    renderJobs()
  
    // Event Listeners
    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("active")
      })
    }
  
    // Filter event listeners
    statusFilter.addEventListener("change", applyFilters)
    levelFilter.addEventListener("change", applyFilters)
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
      closeModal.addEventListener("click", closeJobModal)
    }
  
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeJobModal()
        }
      })
    }
  
    // Functions
    function updateStats() {
      const totalJobs = jobPostings.length
      const activeJobs = jobPostings.filter((job) => job.status === "active").length
      const totalCandidates = jobPostings.reduce((sum, job) => sum + job.candidates, 0)
      const pendingReviews = jobPostings.reduce((sum, job) => sum + job.pendingReviews, 0)
  
      if (totalJobsEl) totalJobsEl.textContent = totalJobs
      if (activeJobsEl) activeJobsEl.textContent = activeJobs
      if (totalCandidatesEl) totalCandidatesEl.textContent = totalCandidates
      if (pendingReviewsEl) pendingReviewsEl.textContent = pendingReviews
    }
  
    function applyFilters() {
      const statusValue = statusFilter.value
      const levelValue = levelFilter.value
      const areaValue = areaFilter.value
      const searchValue = searchFilter.value.toLowerCase()
  
      filteredJobs = jobPostings.filter((job) => {
        const matchesStatus = statusValue === "all" || job.status === statusValue
        const matchesLevel = levelValue === "all" || job.level === levelValue
        const matchesArea = areaValue === "all" || job.area === areaValue
        const matchesSearch =
          searchValue === "" ||
          job.title.toLowerCase().includes(searchValue) ||
          job.description.toLowerCase().includes(searchValue)
  
        return matchesStatus && matchesLevel && matchesArea && matchesSearch
      })
  
      renderJobs()
    }
  
    function switchView(view) {
      currentView = view
  
      // Update button states
      viewButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === view)
      })
  
      // Show/hide appropriate containers
      if (view === "grid") {
        jobsGrid.style.display = "grid"
        jobsList.style.display = "none"
      } else {
        jobsGrid.style.display = "none"
        jobsList.style.display = "flex"
      }
  
      renderJobs()
    }
  
    function renderJobs() {
      if (filteredJobs.length === 0) {
        showEmptyState()
        return
      }
  
      hideEmptyState()
  
      if (currentView === "grid") {
        renderJobsGrid()
      } else {
        renderJobsList()
      }
    }
  
    function renderJobsGrid() {
      jobsGrid.innerHTML = filteredJobs
        .map(
          (job) => `
              <div class="job-card" data-job-id="${job.id}">
                  <div class="job-status ${job.status}">${getStatusText(job.status)}</div>
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
                  <div class="job-stats">
                      <div class="job-stat">
                          <div class="job-stat-number">${job.candidates}</div>
                          <div class="job-stat-label">Candidatos</div>
                      </div>
                      <div class="job-stat">
                          <div class="job-stat-number">${job.views}</div>
                          <div class="job-stat-label">Visualizações</div>
                      </div>
                      <div class="job-stat">
                          <div class="job-stat-number">${job.pendingReviews}</div>
                          <div class="job-stat-label">Pendentes</div>
                      </div>
                  </div>
                  <div class="job-actions">
                      <button class="job-action" onclick="editJob(${job.id})">Editar</button>
                      <button class="job-action primary" onclick="viewCandidates(${job.id})">Ver Candidatos</button>
                      <button class="job-action" onclick="openJobModal(${job.id})">Mais</button>
                  </div>
              </div>
          `,
        )
        .join("")
    }
  
    function renderJobsList() {
      jobsList.innerHTML = filteredJobs
        .map(
          (job) => `
              <div class="job-list-item" data-job-id="${job.id}">
                  <div class="job-list-content">
                      <h3 class="job-list-title">${job.title}</h3>
                      <div class="job-list-meta">
                          <span><i class="fas fa-briefcase"></i> ${job.area}</span>
                          <span><i class="fas fa-dollar-sign"></i> R$ ${job.salary.toLocaleString()}</span>
                          <span><i class="fas fa-users"></i> ${job.candidates} candidatos</span>
                          <span class="job-status ${job.status}">${getStatusText(job.status)}</span>
                      </div>
                  </div>
                  <div class="job-list-actions">
                      <button class="job-list-action" onclick="editJob(${job.id})">Editar</button>
                      <button class="job-list-action" onclick="viewCandidates(${job.id})">Candidatos</button>
                      <button class="job-list-action" onclick="openJobModal(${job.id})">Mais</button>
                  </div>
              </div>
          `,
        )
        .join("")
    }
  
    function showEmptyState() {
      jobsGrid.style.display = "none"
      jobsList.style.display = "none"
      emptyState.style.display = "block"
    }
  
    function hideEmptyState() {
      emptyState.style.display = "none"
      if (currentView === "grid") {
        jobsGrid.style.display = "grid"
      } else {
        jobsList.style.display = "flex"
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
  
    function openJobModal(jobId) {
      selectedJobId = jobId
      modal.classList.add("active")
    }
  
    function closeJobModal() {
      modal.classList.remove("active")
      selectedJobId = null
    }
  
    // Modal action buttons event listeners
    if (editJobBtn) {
      editJobBtn.addEventListener("click", () => {
        if (selectedJobId) {
          window.editJob(selectedJobId)
        }
      })
    }
  
    if (viewCandidatesBtn) {
      viewCandidatesBtn.addEventListener("click", () => {
        if (selectedJobId) {
          window.viewCandidates(selectedJobId)
        }
      })
    }
  
    if (pauseJobBtn) {
      pauseJobBtn.addEventListener("click", () => {
        if (selectedJobId) {
          window.pauseJob(selectedJobId)
        }
      })
    }
  
    if (deleteJobBtn) {
      deleteJobBtn.addEventListener("click", () => {
        if (selectedJobId) {
          window.deleteJob(selectedJobId)
        }
      })
    }
  
    console.log("[v0] Jobs page initialized successfully")
    console.log("[v0] Total jobs loaded:", jobPostings.length)
  })
  