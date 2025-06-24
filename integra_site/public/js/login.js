document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked trigger and corresponding content
      trigger.classList.add("active")
      const tabId = trigger.getAttribute("data-tab")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Form submissions
  const forms = document.querySelectorAll(".login-form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const formId = this.id
      let redirectUrl = ""

      // Determine redirect URL based on form ID
      if (formId === "estudante-form") {
        redirectUrl = "dashboard/estudante/index.html"
      } else if (formId === "coordenador-form") {
        redirectUrl = "dashboard/coordenador/index.html"
      } else if (formId === "administrador-form") {
        redirectUrl = "dashboard/administrador/index.html"
      } else if (formId === "empresa-form") {
        redirectUrl = "dashboard/empresa/index.html"
      } else if (formId === "palestrante-form") {
        redirectUrl = "dashboard/palestrante/index.html"
      }

      // Redirect to dashboard
      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    })
  })
})
