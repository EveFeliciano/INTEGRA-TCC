document.addEventListener("DOMContentLoaded", () => {
    // Notification functionality
    const notificationBtn = document.getElementById("notification-btn")
    const notificationDropdown = document.getElementById("notification-dropdown")

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            notificationDropdown.style.display = notificationDropdown.style.display === "block" ? "none" : "block"
        })

        // Close dropdown when clicking outside
        document.addEventListener("click", () => {
            notificationDropdown.style.display = "none"
        })
    }

    // Profile button functionality
    const userProfileBtn = document.getElementById("user-profile-btn")
    if (userProfileBtn) {
        userProfileBtn.addEventListener("click", () => {
            window.location.href = "perfil.html"
        })
    }

    // Update stats with real-time data (simulated)
    updateStats()

    // Update recent activity
    updateRecentActivity()
})

function updateStats() {
    // Simulate real-time stats updates
    const stats = {
        empresas: Math.floor(Math.random() * 5) + 10,
        palestrantes: Math.floor(Math.random() * 3) + 6,
        eventos: Math.floor(Math.random() * 3) + 3,
        estudantes: Math.floor(Math.random() * 20) + 140,
    }

    // Update stat cards
    const statCards = document.querySelectorAll(".stat-content h3")
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.empresas
        statCards[1].textContent = stats.palestrantes
        statCards[2].textContent = stats.eventos
        statCards[3].textContent = stats.estudantes
    }
}

function updateRecentActivity() {
    const activities = [
        {
            icon: "fas fa-calendar-plus",
            iconClass: "blue",
            text: 'Palestra agendada: "Inteligência Artificial na Prática"',
            time: "Hoje, 14:30",
        },
        {
            icon: "fas fa-check-circle",
            iconClass: "green",
            text: "Visita aprovada: TechSolutions - Turma 3º DS",
            time: "Ontem, 16:45",
        },
        {
            icon: "fas fa-user-plus",
            iconClass: "purple",
            text: "Novo aluno: Maria Santos - 2º ADM",
            time: "2 dias atrás",
        },
    ]

    const activityList = document.querySelector(".activity-list")
    if (activityList) {
        activityList.innerHTML = activities
            .map(
                (activity) => `
      <div class="activity-item">
        <div class="activity-icon ${activity.iconClass}">
          <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <p><strong>${activity.text}</strong></p>
          <span class="activity-time">${activity.time}</span>
        </div>
      </div>
    `,
            )
            .join("")
    }
}
