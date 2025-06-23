document.addEventListener("DOMContentLoaded", () => {
    // Profile data (would come from database in real application)
    const profileData = {
        nome: "João Silva Santos",
        email: "joao.silva@etec.sp.gov.br",
        telefone: "(11) 99999-8888",
        instituicao: "ETEC Prof. Basilides de Godoy",
        codigoInstituicao: "001",
        dataCadastro: "15/01/2025",
        foto: null,
    }

    // Modal elements
    const editProfileModal = document.getElementById("edit-profile-modal")

    // Button elements
    const editProfileBtn = document.getElementById("edit-profile-btn")
    const changePhotoBtn = document.getElementById("change-photo-btn")
    const photoInput = document.getElementById("photo-input")
    const saveProfileBtn = document.getElementById("save-profile-btn")
    const closeEditModalBtn = document.getElementById("close-edit-modal")

    // Event listeners
    editProfileBtn.addEventListener("click", () => {
        populateEditForm()
        editProfileModal.style.display = "flex"
    })

    changePhotoBtn.addEventListener("click", () => {
        photoInput.click()
    })

    photoInput.addEventListener("change", (e) => {
        handlePhotoChange(e)
    })

    saveProfileBtn.addEventListener("click", () => {
        saveProfile()
    })

    closeEditModalBtn.addEventListener("click", () => {
        editProfileModal.style.display = "none"
    })

    // Functions
    function populateEditForm() {
        document.getElementById("edit-name").value = profileData.nome
        document.getElementById("edit-email").value = profileData.email
        document.getElementById("edit-phone").value = profileData.telefone
        document.getElementById("edit-institution").value = profileData.codigoInstituicao
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Por favor, selecione apenas arquivos de imagem.")
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("A imagem deve ter no máximo 5MB.")
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const profilePhoto = document.getElementById("profile-photo")
                profilePhoto.innerHTML = `<img src="${e.target.result}" alt="Foto do perfil">`
                profileData.foto = e.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    function saveProfile() {
        // Get form values
        const nome = document.getElementById("edit-name").value.trim()
        const telefone = document.getElementById("edit-phone").value.trim()
        const codigoInstituicao = document.getElementById("edit-institution").value

        // Validation
        if (!nome) {
            alert("Por favor, preencha o nome completo.")
            return
        }

        if (!telefone) {
            alert("Por favor, preencha o telefone.")
            return
        }

        // Phone validation (basic)
        const phoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/
        if (!phoneRegex.test(telefone)) {
            alert("Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.")
            return
        }

        // Update profile data
        profileData.nome = nome
        profileData.telefone = telefone
        profileData.codigoInstituicao = codigoInstituicao

        // Update institution name based on code
        const institutions = {
            "001": "ETEC Prof. Basilides de Godoy",
            "002": "ETEC Albert Einstein",
            "003": "ETEC Getúlio Vargas",
        }
        profileData.instituicao = institutions[codigoInstituicao] || "ETEC"

        // Update display
        updateProfileDisplay()

        // Close modal
        editProfileModal.style.display = "none"

        // Show success message
        alert("Perfil atualizado com sucesso!")
    }

    function updateProfileDisplay() {
        // Update profile name in header and profile section
        document.querySelector(".user-name").textContent =
            profileData.nome.split(" ")[0] + " " + profileData.nome.split(" ")[1]
        document.querySelector(".profile-name").textContent = profileData.nome

        // Update profile information
        document.getElementById("display-name").textContent = profileData.nome
        document.getElementById("display-email").textContent = profileData.email
        document.getElementById("display-phone").textContent = profileData.telefone
        document.getElementById("display-institution").textContent = profileData.instituicao
        document.getElementById("display-institution-code").textContent = profileData.codigoInstituicao
        document.getElementById("display-register-date").textContent = profileData.dataCadastro
    }

    // Phone input formatting
    document.getElementById("edit-phone").addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "")

        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        } else if (value.length >= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
        } else if (value.length >= 6) {
            value = value.replace(/(\d{2})(\d{4})/, "($1) $2")
        } else if (value.length >= 2) {
            value = value.replace(/(\d{2})/, "($1) ")
        }

        e.target.value = value
    })

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === editProfileModal) {
            editProfileModal.style.display = "none"
        }
    })

    // Initialize profile display
    updateProfileDisplay()

    // Simulate loading user stats
    updateUserStats()

    function updateUserStats() {
        // Simulate API call to get user statistics
        const stats = {
            eventosCreados: Math.floor(Math.random() * 10) + 20,
            alunosGerenciados: Math.floor(Math.random() * 20) + 140,
            parceriasAtivas: Math.floor(Math.random() * 5) + 5,
            palestrasRealizadas: Math.floor(Math.random() * 8) + 8,
        }

        // Update stats display
        const statNumbers = document.querySelectorAll(".stat-number")
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = stats.eventosCreados
            statNumbers[1].textContent = stats.alunosGerenciados
            statNumbers[2].textContent = stats.parceriasAtivas
            statNumbers[3].textContent = stats.palestrasRealizadas
        }
    }
})
