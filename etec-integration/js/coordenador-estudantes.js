document.addEventListener("DOMContentLoaded", () => {
    // Ensure all modals are closed on page load
    document.getElementById("students-modal").style.display = "none"
    document.getElementById("student-form-modal").style.display = "none"

    // Sample data for classes
    const turmas = [
        {
            id: 1,
            nome: "1C",
            curso: "Informática para Internet",
            modulo: "1º Módulo",
            turno: "Manhã",
            alunos: [
                { id: 1, nome: "Ana Silva", rm: "12001", email: "ana.silva@etec.sp.gov.br" },
                { id: 2, nome: "Bruno Santos", rm: "12002", email: "bruno.santos@etec.sp.gov.br" },
                { id: 3, nome: "Carla Oliveira", rm: "12003", email: "carla.oliveira@etec.sp.gov.br" },
            ],
        },
        {
            id: 2,
            nome: "2C",
            curso: "Informática para Internet",
            modulo: "2º Módulo",
            turno: "Manhã",
            alunos: [
                { id: 4, nome: "Diego Costa", rm: "11001", email: "diego.costa@etec.sp.gov.br" },
                { id: 5, nome: "Elena Rodrigues", rm: "11002", email: "elena.rodrigues@etec.sp.gov.br" },
            ],
        },
        {
            id: 3,
            nome: "3C",
            curso: "Informática para Internet",
            modulo: "3º Módulo",
            turno: "Manhã",
            alunos: [
                { id: 6, nome: "Felipe Lima", rm: "10001", email: "felipe.lima@etec.sp.gov.br" },
                { id: 7, nome: "Gabriela Mendes", rm: "10002", email: "gabriela.mendes@etec.sp.gov.br" },
                { id: 8, nome: "Hugo Alves", rm: "10003", email: "hugo.alves@etec.sp.gov.br" },
                { id: 9, nome: "Isabela Cruz", rm: "10004", email: "isabela.cruz@etec.sp.gov.br" },
            ],
        },
        {
            id: 4,
            nome: "1A",
            curso: "Administração",
            modulo: "1º Módulo",
            turno: "Tarde",
            alunos: [
                { id: 10, nome: "João Pedro", rm: "12101", email: "joao.pedro@etec.sp.gov.br" },
                { id: 11, nome: "Larissa Souza", rm: "12102", email: "larissa.souza@etec.sp.gov.br" },
            ],
        },
        {
            id: 5,
            nome: "2A",
            curso: "Administração",
            modulo: "2º Módulo",
            turno: "Tarde",
            alunos: [
                { id: 12, nome: "Marcos Silva", rm: "11101", email: "marcos.silva@etec.sp.gov.br" },
                { id: 13, nome: "Natália Santos", rm: "11102", email: "natalia.santos@etec.sp.gov.br" },
                { id: 14, nome: "Otávio Lima", rm: "11103", email: "otavio.lima@etec.sp.gov.br" },
            ],
        },
    ]

    let currentTurma = null
    let editingStudent = null

    // Modal elements
    const studentsModal = document.getElementById("students-modal")
    const studentFormModal = document.getElementById("student-form-modal")

    // Close modal buttons
    document.getElementById("close-students-modal").addEventListener("click", () => {
        studentsModal.style.display = "none"
    })

    document.getElementById("close-student-form-modal").addEventListener("click", () => {
        studentFormModal.style.display = "none"
        resetStudentForm()
    })

    // Add student button
    document.getElementById("add-student-btn").addEventListener("click", () => {
        editingStudent = null
        document.getElementById("student-form-title").textContent = "Adicionar Aluno"
        resetStudentForm()
        studentFormModal.style.display = "flex"
    })

    // Save student button
    document.getElementById("save-student-btn").addEventListener("click", () => {
        saveStudent()
    })

    // Render classes
    function renderTurmas() {
        const classesGrid = document.getElementById("classes-grid")
        classesGrid.innerHTML = ""

        turmas.forEach((turma) => {
            const classCard = document.createElement("div")
            classCard.className = "class-card"

            const shiftClass = turma.turno === "Manhã" ? "morning" : turma.turno === "Tarde" ? "afternoon" : "night"

            classCard.innerHTML = `
        <div class="class-header">
          <div class="class-name">${turma.nome}</div>
          <div class="class-shift ${shiftClass}">${turma.turno}</div>
        </div>
        <div class="class-info">
          <p><strong>Curso:</strong> ${turma.curso}</p>
          <p><strong>Módulo:</strong> ${turma.modulo}</p>
          <p class="student-count">${turma.alunos.length} alunos</p>
        </div>
        <button class="button primary-button full-width" onclick="showStudents(${turma.id})">
          <i class="fas fa-eye"></i> Analisar
        </button>
      `

            classesGrid.appendChild(classCard)
        })
    }

    // Global function to show students
    window.showStudents = (turmaId) => {
        currentTurma = turmas.find((t) => t.id === turmaId)
        if (!currentTurma) return

        document.getElementById("students-modal-title").textContent = `Alunos da Turma ${currentTurma.nome}`
        document.getElementById("students-modal-description").textContent =
            `${currentTurma.curso} - ${currentTurma.modulo} - ${currentTurma.turno}`

        renderStudentsList()
        studentsModal.style.display = "flex"
    }

    function renderStudentsList() {
        if (!currentTurma) return

        const studentsList = document.getElementById("students-list")
        studentsList.innerHTML = ""

        currentTurma.alunos.forEach((aluno) => {
            const row = document.createElement("tr")
            row.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.rm}</td>
        <td>${aluno.email}</td>
        <td>
          <div class="table-actions">
            <button class="table-action edit" onclick="editStudent(${aluno.id})" title="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button class="table-action delete" onclick="deleteStudent(${aluno.id})" title="Excluir">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `
            studentsList.appendChild(row)
        })
    }

    // Global functions for student management
    window.editStudent = (studentId) => {
        if (!currentTurma) return

        editingStudent = currentTurma.alunos.find((a) => a.id === studentId)
        if (!editingStudent) return

        document.getElementById("student-form-title").textContent = "Editar Aluno"
        document.getElementById("student-name").value = editingStudent.nome
        document.getElementById("student-rm").value = editingStudent.rm
        document.getElementById("student-email").value = editingStudent.email
        document.getElementById("student-password").value = "" // Don't show current password

        studentFormModal.style.display = "flex"
    }

    window.deleteStudent = (studentId) => {
        if (!currentTurma) return

        const student = currentTurma.alunos.find((a) => a.id === studentId)
        if (!student) return

        if (confirm(`Tem certeza que deseja excluir o aluno ${student.nome}?`)) {
            const index = currentTurma.alunos.findIndex((a) => a.id === studentId)
            if (index > -1) {
                currentTurma.alunos.splice(index, 1)
                renderStudentsList()
                renderTurmas() // Update the class card with new student count
                alert("Aluno excluído com sucesso!")
            }
        }
    }

    function saveStudent() {
        const name = document.getElementById("student-name").value.trim()
        const rm = document.getElementById("student-rm").value.trim()
        const email = document.getElementById("student-email").value.trim()
        const password = document.getElementById("student-password").value.trim()

        // Validation
        if (!name || !rm || !email || !password) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        // Check if RM already exists (excluding current student if editing)
        const existingRM = turmas.some((turma) =>
            turma.alunos.some((aluno) => aluno.rm === rm && (!editingStudent || aluno.id !== editingStudent.id)),
        )

        if (existingRM) {
            alert("Este RM já está cadastrado para outro aluno.")
            return
        }

        // Check if email already exists (excluding current student if editing)
        const existingEmail = turmas.some((turma) =>
            turma.alunos.some((aluno) => aluno.email === email && (!editingStudent || aluno.id !== editingStudent.id)),
        )

        if (existingEmail) {
            alert("Este email já está cadastrado para outro aluno.")
            return
        }

        if (editingStudent) {
            // Update existing student
            editingStudent.nome = name
            editingStudent.rm = rm
            editingStudent.email = email
            alert("Aluno atualizado com sucesso!")
        } else {
            // Add new student
            if (!currentTurma) {
                alert("Selecione uma turma primeiro.")
                return
            }

            const newStudent = {
                id: Date.now(), // Simple ID generation
                nome: name,
                rm: rm,
                email: email,
            }

            currentTurma.alunos.push(newStudent)
            alert("Aluno adicionado com sucesso!")
        }

        studentFormModal.style.display = "none"
        resetStudentForm()
        renderStudentsList()
        renderTurmas() // Update the class card with new student count
    }

    function resetStudentForm() {
        document.getElementById("student-name").value = ""
        document.getElementById("student-rm").value = ""
        document.getElementById("student-email").value = ""
        document.getElementById("student-password").value = ""
        editingStudent = null
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === studentsModal) {
            studentsModal.style.display = "none"
        }
        if (e.target === studentFormModal) {
            studentFormModal.style.display = "none"
            resetStudentForm()
        }
    })

    // Initial render
    renderTurmas()
})
