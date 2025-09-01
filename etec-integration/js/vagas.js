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
  
    // Preview elements
    const previewTitle = document.getElementById("previewTitle")
    const previewLevel = document.getElementById("previewLevel")
    const previewArea = document.getElementById("previewArea")
    const previewSalary = document.getElementById("previewSalary")
    const previewWorkType = document.getElementById("previewWorkType")
    const previewSchedule = document.getElementById("previewSchedule")
    const previewLocation = document.getElementById("previewLocation")
    const previewDescription = document.getElementById("previewDescription")
    const previewRequirements = document.getElementById("previewRequirements")
  
    // Form inputs
    const jobTitle = document.getElementById("jobTitle")
    const jobArea = document.getElementById("jobArea")
    const jobLevel = document.getElementById("jobLevel")
    const jobSalary = document.getElementById("jobSalary")
    const workType = document.getElementById("workType")
    const workSchedule = document.getElementById("workSchedule")
    const jobLocation = document.getElementById("jobLocation")
    const jobDescription = document.getElementById("jobDescription")
    const jobRequirements = document.getElementById("jobRequirements")
  
    // Real-time preview updates
    function updatePreview() {
      if (previewTitle && jobTitle) {
        previewTitle.textContent = jobTitle.value || "Título da Vaga"
      }
  
      if (previewLevel && jobLevel) {
        previewLevel.textContent = jobLevel.value || "Nível"
        previewLevel.style.display = jobLevel.value ? "inline-block" : "none"
      }
  
      if (previewArea && jobArea) {
        previewArea.textContent = jobArea.value || "Área"
        previewArea.style.display = jobArea.value ? "inline-block" : "none"
      }
  
      if (previewSalary && jobSalary) {
        previewSalary.textContent = jobSalary.value ? `R$ ${Number.parseInt(jobSalary.value).toLocaleString()}` : "R$ --"
      }
  
      if (previewWorkType && workType) {
        previewWorkType.textContent = workType.value || "Modalidade"
      }
  
      if (previewSchedule && workSchedule) {
        previewSchedule.textContent = workSchedule.value || "Horário"
      }
  
      if (previewLocation && jobLocation) {
        previewLocation.textContent = jobLocation.value || "Localização"
      }
  
      if (previewDescription && jobDescription) {
        previewDescription.textContent = jobDescription.value || "Descrição da vaga aparecerá aqui..."
      }
  
      if (previewRequirements && jobRequirements) {
        previewRequirements.textContent = jobRequirements.value || "Requisitos aparecerão aqui..."
      }
    }
  
    // Add event listeners for real-time preview
    const formInputs = [
      jobTitle,
      jobArea,
      jobLevel,
      jobSalary,
      workType,
      workSchedule,
      jobLocation,
      jobDescription,
      jobRequirements,
    ]
  
    formInputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", updatePreview)
        input.addEventListener("change", updatePreview)
      }
    })
  
    // Form validation
    function validateForm() {
      const requiredFields = [
        { field: jobTitle, name: "Título da Vaga" },
        { field: jobArea, name: "Área" },
        { field: jobLevel, name: "Nível" },
        { field: workType, name: "Modalidade" },
        { field: workSchedule, name: "Horário" },
        { field: jobDescription, name: "Descrição da Vaga" },
        { field: jobRequirements, name: "Requisitos" },
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
  
      return errors
    }
  
    // Form submission
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
        const jobData = {
          title: formData.get("jobTitle"),
          area: formData.get("jobArea"),
          level: formData.get("jobLevel"),
          salary: formData.get("jobSalary") ? Number.parseInt(formData.get("jobSalary")) : null,
          description: formData.get("jobDescription"),
          requirements: formData.get("jobRequirements"),
          workType: formData.get("workType"),
          workSchedule: formData.get("workSchedule"),
          location: formData.get("jobLocation"),
          startDate: formData.get("startDate"),
          applicationDeadline: formData.get("applicationDeadline"),
          availableDays: formData.getAll("availableDays"),
          benefits: formData.getAll("benefits"),
          additionalInfo: formData.get("additionalInfo"),
          createdAt: new Date(),
          status: "active",
        }
  
        console.log("Vaga criada:", jobData)
  
        // Show success message
        alert("Vaga publicada com sucesso! Os estudantes já podem visualizá-la e se candidatar.")
  
        // Redirect to job listings or dashboard
        window.location.href = "palestrantes.html"
      })
    }
  
    // Save as draft functionality
    if (saveAsDraftBtn) {
      saveAsDraftBtn.addEventListener("click", () => {
        const formData = new FormData(form)
        const draftData = {
          title: formData.get("jobTitle"),
          area: formData.get("jobArea"),
          level: formData.get("jobLevel"),
          salary: formData.get("jobSalary"),
          description: formData.get("jobDescription"),
          requirements: formData.get("jobRequirements"),
          workType: formData.get("workType"),
          workSchedule: formData.get("workSchedule"),
          location: formData.get("jobLocation"),
          startDate: formData.get("startDate"),
          applicationDeadline: formData.get("applicationDeadline"),
          availableDays: formData.getAll("availableDays"),
          benefits: formData.getAll("benefits"),
          additionalInfo: formData.get("additionalInfo"),
          savedAt: new Date(),
          status: "draft",
        }
  
        // Save to localStorage or send to server
        localStorage.setItem("jobDraft", JSON.stringify(draftData))
  
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
  
    // Load draft if exists
    function loadDraft() {
      const draft = localStorage.getItem("jobDraft")
      if (draft) {
        try {
          const draftData = JSON.parse(draft)
  
          // Fill form with draft data
          if (jobTitle && draftData.title) jobTitle.value = draftData.title
          if (jobArea && draftData.area) jobArea.value = draftData.area
          if (jobLevel && draftData.level) jobLevel.value = draftData.level
          if (jobSalary && draftData.salary) jobSalary.value = draftData.salary
          if (jobDescription && draftData.description) jobDescription.value = draftData.description
          if (jobRequirements && draftData.requirements) jobRequirements.value = draftData.requirements
          if (workType && draftData.workType) workType.value = draftData.workType
          if (workSchedule && draftData.workSchedule) workSchedule.value = draftData.workSchedule
          if (jobLocation && draftData.location) jobLocation.value = draftData.location
  
          // Update preview
          updatePreview()
  
          console.log("Rascunho carregado")
        } catch (error) {
          console.error("Erro ao carregar rascunho:", error)
        }
      }
    }
  
    // Initialize
    updatePreview()
    loadDraft()
  
    console.log("Job creation form initialized successfully")
  })
  