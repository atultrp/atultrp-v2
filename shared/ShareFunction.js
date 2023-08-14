// Scroll Smooth Function for Nav Items
export const scrollNavItemSmooth = (e, id) => {
  e.preventDefault()
  document.querySelector(id)?.scrollIntoView({
    behavior: 'smooth'
  })
}