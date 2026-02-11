const dot = document.querySelector(".cursor__dot")
const ring = document.querySelector(".cursor__ring")

let mouseX = 0
let mouseY = 0

let ringX = 0
let ringY = 0

// Track mouse position
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// Animation loop
function animateCursor() {
  // Dot follows exactly
  dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

  // Ring follows smoothly (lerp effect)
  ringX += (mouseX - ringX) * 0.1
  ringY += (mouseY - ringY) * 0.1

  ring.style.transform = `translate(${ringX}px, ${ringY}px)`

  requestAnimationFrame(animateCursor)
}

animateCursor()
