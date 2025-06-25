const slider = document.getElementById("slider");
const viewport = document.getElementById("viewport"); 

let currentStep = 0;
let isScrolling = false;
let forwardDirection = true; 
let lastScrollTime = 0;
const throttleDelay = 200; // ms

// Las "steps" ahora solo definen las multiplicaciones de vw/vh
// Los valores en píxeles se calcularán dinámicamente
const stepMultipliers = [
  { x: 0, y: 0 },
  { x: 0, y: -1 }, 
  { x: -1, y: -1 }, 
  { x: -1, y: -2 }   
];


// --- FUNCIONES PARA OBTENER LA ALTURA/ANCHO REAL DEL VIEWPORT ---
function getViewportDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function updateTransform() {
  const { width: viewportWidth, height: viewportHeight } = getViewportDimensions();
  const step = stepMultipliers[currentStep];

  // Calcula la posición en píxeles
  const translateX = step.x * viewportWidth;
  const translateY = step.y * viewportHeight;

  slider.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function scrollTo(nextIndex) {
  if (isScrolling || nextIndex < 0 || nextIndex >= stepMultipliers.length) return;

  forwardDirection = nextIndex > currentStep;
  currentStep = nextIndex;
  
  // Llama a updateTransform para aplicar el nuevo paso
  updateTransform();

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 1000); // Ajusta este tiempo para que coincida con tu transición CSS si es diferente
}

// --- MANEJADORES DE EVENTOS ---

// Evento de rueda del ratón
function handleWheel(e) {
  const now = Date.now();
  if (isScrolling || now - lastScrollTime < throttleDelay) return;
  lastScrollTime = now;

  const delta = e.deltaY;
  if (delta > 0) {
    scrollTo(currentStep + 1);
  } else if (delta < 0) {
    scrollTo(currentStep - 1);
  }
}

window.addEventListener("wheel", handleWheel);

// Eventos táctiles para swipe
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  if (isScrolling) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  if (isScrolling) return;

  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = e.changedTouches[0].clientY - touchStartY;

  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  const swipeThreshold = 30; // Mueve a una constante para fácil ajuste

  if (absY > absX) { // Movimiento vertical dominante
    if (deltaY < -swipeThreshold) scrollTo(currentStep + 1); // Swipe hacia arriba (adelante)
    else if (deltaY > swipeThreshold) scrollTo(currentStep - 1); // Swipe hacia abajo (atrás)
  } else { // Movimiento horizontal dominante
    
  }

  // Si se hizo un swipe válido y se inició el scroll
  if (absX > swipeThreshold || absY > swipeThreshold) {
    isScrolling = true; // Marca como desplazando solo si se detectó un swipe significativo
    setTimeout(() => { isScrolling = false }, 1000); // Ajusta esto al tiempo de tu transición CSS
  }
});


window.addEventListener("resize", updateTransform);

document.addEventListener('DOMContentLoaded', updateTransform);

updateTransform();