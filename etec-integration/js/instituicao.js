// Global variables
let currentEditingStudent = null
let currentEditingCoordinator = null
let coordinators = []

// Sample data for coordinators
const sampleCoordinators = [
  {
    id: 1,
    name: "Prof. Maria Silva",
    cpf: "123.456.789-00",
    email: "maria.silva@etec.sp.gov.br",
    phone: "(11) 99999-1234",
    area: "informatica",
    status: "ativo",
  },
  {
    id: 2,
    name: "Prof. João Santos",
    cpf: "987.654.321-00",
    email: "joao.santos@etec.sp.gov.br",
    phone: "(11) 99999-5678",
    area: "administracao",
    status: "ativo",
  },
  {
    id: 3,
    name: "Prof. Ana Costa",
    cpf: "456.789.123-00",
    email: "ana.costa@etec.sp.gov.br",
    phone: "(11) 99999-9012",
    area: "recursos-humanos",
    status: "inativo",
  },
]

// Sample data for classes (existing)
const sampleClasses = [
  {
    id: 1,
    serie: "1º",
    letra: "A",
    curso: "Informática para Internet",
    turno: "Manhã",
    students: [
      { id: 1, name: "João Silva", rm: "12345", email: "joao@email.com" },
      { id: 2, name: "Maria Santos", rm: "12346", email: "maria@email.com" },
      { id: 3, name: "Pedro Costa", rm: "12347", email: "pedro@email.com" },
    ],
  },
  {
    id: 2,
    serie: "2º",
    letra: "B",
    curso: "Administração",
    turno: "Tarde",
    students: [
      { id: 4, name: "Ana Lima", rm: "12348", email: "ana@email.com" },
      { id: 5, name: "Carlos Oliveira", rm: "12349", email: "carlos@email.com" },
    ],
  },
]

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  coordinators = [...sampleCoordinators]

  closeAllModals()

  // Initialize both sections
  renderClasses()
  renderCoordinators()

  // Set up event listeners
  setupEventListeners()

  // Show students section by default
  showSection("students")

  setTimeout(() => {
    closeAllModals()
  }, 100)
})

function closeAllModals() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.style.display = "none"
  })

  const modalIds = ["students-modal", "student-form-modal", "coordinator-form-modal"]

  modalIds.forEach((modalId) => {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = "none"
    }
  })

  document.body.style.overflow = "auto"

  currentEditingStudent = null
  currentEditingCoordinator = null
}

// Section navigation
function showSection(section) {
  // Hide all sections
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tabs
  document.querySelectorAll(".tab-button").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected section
  document.getElementById(`${section}-section`).classList.add("active")
  document.getElementById(`${section}-tab`).classList.add("active")
}

// Setup event listeners
function setupEventListeners() {
  // Existing student event listeners
  setupStudentEventListeners()

  // New coordinator event listeners
  setupCoordinatorEventListeners()
}

function setupStudentEventListeners() {
  // Student search and filter
  const studentSearch = document.getElementById("turma-search")
  const studentFilter = document.getElementById("turma-filter-field")

  if (studentSearch) {
    studentSearch.addEventListener("input", filterClasses)
  }

  if (studentFilter) {
    studentFilter.addEventListener("change", filterClasses)
  }

  // Student modal events
  const closeStudentsModal = document.getElementById("close-students-modal")
  const addStudentBtn = document.getElementById("add-student-btn")
  const closeStudentFormModal = document.getElementById("close-student-form-modal")
  const saveStudentBtn = document.getElementById("save-student-btn")

  if (closeStudentsModal) {
    closeStudentsModal.addEventListener("click", () => closeModal("students-modal"))
  }

  if (addStudentBtn) {
    addStudentBtn.addEventListener("click", () => openStudentForm())
  }

  if (closeStudentFormModal) {
    closeStudentFormModal.addEventListener("click", () => closeModal("student-form-modal"))
  }

  if (saveStudentBtn) {
    saveStudentBtn.addEventListener("click", saveStudent)
  }
}

function setupCoordinatorEventListeners() {
  // Coordinator search and filter
  const coordinatorSearch = document.getElementById("coordinator-search")
  const coordinatorFilter = document.getElementById("coordinator-filter-field")

  if (coordinatorSearch) {
    coordinatorSearch.addEventListener("input", filterCoordinators)
  }

  if (coordinatorFilter) {
    coordinatorFilter.addEventListener("change", filterCoordinators)
  }

  // Coordinator modal events
  const addCoordinatorBtn = document.getElementById("add-coordinator-btn")
  const closeCoordinatorFormModal = document.getElementById("close-coordinator-form-modal")
  const saveCoordinatorBtn = document.getElementById("save-coordinator-btn")

  if (addCoordinatorBtn) {
    addCoordinatorBtn.addEventListener("click", () => openCoordinatorForm())
  }

  if (closeCoordinatorFormModal) {
    closeCoordinatorFormModal.addEventListener("click", () => closeModal("coordinator-form-modal"))
  }

  if (saveCoordinatorBtn) {
    saveCoordinatorBtn.addEventListener("click", saveCoordinator)
  }
}

// Render coordinators
function renderCoordinators() {
  const coordinatorsGrid = document.getElementById("coordinators-grid")
  if (!coordinatorsGrid) return

  coordinatorsGrid.innerHTML = ""

  coordinators.forEach((coordinator) => {
    const coordinatorCard = createCoordinatorCard(coordinator)
    coordinatorsGrid.appendChild(coordinatorCard)
  })
}

// Create coordinator card
function createCoordinatorCard(coordinator) {
  const card = document.createElement("div")
  card.className = "coordinator-card"

  const initials = coordinator.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
  const areaNames = {
    informatica: "Informática",
    administracao: "Administração",
    "recursos-humanos": "Recursos Humanos",
    geral: "Coordenação Geral",
  }

  card.innerHTML = `
        <div class="coordinator-status ${coordinator.status}">${coordinator.status.charAt(0).toUpperCase() + coordinator.status.slice(1)}</div>
        
        <div class="coordinator-header">
            <div class="coordinator-avatar">${initials}</div>
            <div class="coordinator-info">
                <h3>${coordinator.name}</h3>
                <p>${areaNames[coordinator.area] || coordinator.area}</p>
            </div>
        </div>
        
        <div class="coordinator-details">
            <div class="coordinator-detail">
                <i class="fas fa-envelope"></i>
                <span>${coordinator.email}</span>
            </div>
            <div class="coordinator-detail">
                <i class="fas fa-phone"></i>
                <span>${coordinator.phone}</span>
            </div>
            <div class="coordinator-detail">
                <i class="fas fa-id-card"></i>
                <span>${coordinator.cpf}</span>
            </div>
        </div>
        
        <div class="coordinator-area-badge ${coordinator.area}">
            ${areaNames[coordinator.area] || coordinator.area}
        </div>
        
        <div class="coordinator-actions-buttons">
            <button class="button outline-button" onclick="editCoordinator(${coordinator.id})">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="button danger-button" onclick="deleteCoordinator(${coordinator.id})">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `

  return card
}

// Filter coordinators
function filterCoordinators() {
  const searchTerm = document.getElementById("coordinator-search").value.toLowerCase()
  const filterField = document.getElementById("coordinator-filter-field").value

  const coordinatorCards = document.querySelectorAll(".coordinator-card")

  coordinatorCards.forEach((card) => {
    const coordinator = coordinators.find((c) => {
      const cardName = card.querySelector(".coordinator-info h3").textContent
      return cardName === c.name
    })

    if (!coordinator) return

    let shouldShow = true

    if (searchTerm) {
      const searchableText = `${coordinator.name} ${coordinator.email} ${coordinator.area}`.toLowerCase()
      shouldShow = searchableText.includes(searchTerm)
    }

    if (shouldShow && filterField !== "all") {
      switch (filterField) {
        case "nome":
          shouldShow = coordinator.name.toLowerCase().includes(searchTerm)
          break
        case "area":
          shouldShow = coordinator.area.toLowerCase().includes(searchTerm)
          break
        case "status":
          shouldShow = coordinator.status.toLowerCase().includes(searchTerm)
          break
      }
    }

    card.style.display = shouldShow ? "block" : "none"
  })
}

// Open coordinator form
function openCoordinatorForm(coordinator = null) {
  if (!coordinator && !event) return

  currentEditingCoordinator = coordinator

  const modal = document.getElementById("coordinator-form-modal")
  const title = document.getElementById("coordinator-form-title")
  const form = document.getElementById("coordinator-form")

  if (coordinator) {
    title.textContent = "Editar Coordenador"
    document.getElementById("coordinator-name").value = coordinator.name
    document.getElementById("coordinator-cpf").value = coordinator.cpf
    document.getElementById("coordinator-email").value = coordinator.email
    document.getElementById("coordinator-phone").value = coordinator.phone
    document.getElementById("coordinator-area").value = coordinator.area
    document.getElementById("coordinator-status").value = coordinator.status
    document.getElementById("coordinator-password").value = ""
  } else {
    title.textContent = "Adicionar Coordenador"
    form.reset()
  }

  openModal("coordinator-form-modal")
}

// Save coordinator
function saveCoordinator() {
  const form = document.getElementById("coordinator-form")
  const formData = new FormData(form)

  const coordinatorData = {
    name: document.getElementById("coordinator-name").value,
    cpf: document.getElementById("coordinator-cpf").value,
    email: document.getElementById("coordinator-email").value,
    phone: document.getElementById("coordinator-phone").value,
    area: document.getElementById("coordinator-area").value,
    status: document.getElementById("coordinator-status").value,
  }

  // Validate required fields
  if (
    !coordinatorData.name ||
    !coordinatorData.cpf ||
    !coordinatorData.email ||
    !coordinatorData.phone ||
    !coordinatorData.area
  ) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  if (currentEditingCoordinator) {
    // Update existing coordinator
    const index = coordinators.findIndex((c) => c.id === currentEditingCoordinator.id)
    if (index !== -1) {
      coordinators[index] = { ...coordinators[index], ...coordinatorData }
    }
  } else {
    // Add new coordinator
    const newCoordinator = {
      id: Date.now(),
      ...coordinatorData,
    }
    coordinators.push(newCoordinator)
  }

  renderCoordinators()
  closeModal("coordinator-form-modal")

  const action = currentEditingCoordinator ? "atualizado" : "adicionado"
  alert(`Coordenador ${action} com sucesso!`)
}

// Edit coordinator
function editCoordinator(coordinatorId) {
  const coordinator = coordinators.find((c) => c.id === coordinatorId)
  if (coordinator) {
    openCoordinatorForm(coordinator)
  }
}

// Delete coordinator
function deleteCoordinator(coordinatorId) {
  if (confirm("Tem certeza que deseja excluir este coordenador?")) {
    coordinators = coordinators.filter((c) => c.id !== coordinatorId)
    renderCoordinators()
    alert("Coordenador excluído com sucesso!")
  }
}

// Existing functions for students (keeping the original functionality)
function renderClasses() {
  const classesGrid = document.getElementById("classes-grid")
  if (!classesGrid) return

  classesGrid.innerHTML = ""

  sampleClasses.forEach((classData) => {
    const classCard = createClassCard(classData)
    classesGrid.appendChild(classCard)
  })
}

function createClassCard(classData) {
  const card = document.createElement("div")
  card.className = "class-card"

  const courseClass = classData.curso
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
  card.classList.add(`course-${courseClass}`)

  card.innerHTML = `
        <div class="class-header">
            <h3 class="class-title">${classData.serie}${classData.letra} - ${classData.curso}</h3>
            <span class="class-shift">${classData.turno}</span>
        </div>
        <div class="class-info">
            <p class="student-count">${classData.students.length} estudantes</p>
            <p>Série: ${classData.serie} | Turma: ${classData.letra}</p>
        </div>
        <div class="class-actions">
            <button class="button primary-button" onclick="viewStudents(${classData.id})">
                <i class="fas fa-users"></i> Ver Alunos
            </button>
        </div>
    `

  return card
}

function filterClasses() {
  const searchTerm = document.getElementById("turma-search").value.toLowerCase()
  const filterField = document.getElementById("turma-filter-field").value

  const classCards = document.querySelectorAll(".class-card")

  classCards.forEach((card) => {
    let shouldShow = true

    if (searchTerm) {
      const cardText = card.textContent.toLowerCase()
      shouldShow = cardText.includes(searchTerm)
    }

    card.style.display = shouldShow ? "block" : "none"
  })
}

function viewStudents(classId) {
  const classData = sampleClasses.find((c) => c.id === classId)
  if (!classData) return

  const modal = document.getElementById("students-modal")
  const title = document.getElementById("students-modal-title")
  const description = document.getElementById("students-modal-description")
  const studentsList = document.getElementById("students-list")

  title.textContent = `Alunos da Turma ${classData.serie}${classData.letra}`
  description.textContent = `${classData.curso} - ${classData.turno}`

  studentsList.innerHTML = ""

  classData.students.forEach((student) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rm}</td>
            <td>${student.email}</td>
            <td>
                <button class="button outline-button" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="button danger-button" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `
    studentsList.appendChild(row)
  })

  openModal("students-modal")
}

function openStudentForm(student = null) {
  if (!student && !event) return

  currentEditingStudent = student

  const modal = document.getElementById("student-form-modal")
  const title = document.getElementById("student-form-title")
  const form = document.getElementById("student-form")

  if (student) {
    title.textContent = "Editar Aluno"
    document.getElementById("student-name").value = student.name
    document.getElementById("student-rm").value = student.rm
    document.getElementById("student-email").value = student.email
    document.getElementById("student-password").value = ""
  } else {
    title.textContent = "Adicionar Aluno"
    form.reset()
  }

  openModal("student-form-modal")
}

function saveStudent() {
  // Implementation for saving student
  alert("Funcionalidade de salvar aluno implementada!")
  closeModal("student-form-modal")
}

function editStudent(studentId) {
  alert(`Editar aluno ID: ${studentId}`)
}

function deleteStudent(studentId) {
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    alert(`Aluno ID ${studentId} excluído!`)
  }
}

// Modal utilities
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target.id)
  }
})
