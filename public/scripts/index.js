const slider = document.getElementById("slider");
const viewport = document.getElementById("viewport"); // Asegúrate de que este elemento existe y es tu contenedor principal

let currentStep = 0;
let isScrolling = false;
let forwardDirection = true; // Variable ya definida en tu código, la mantengo

// Las "steps" ahora solo definen las multiplicaciones de vw/vh
// Los valores en píxeles se calcularán dinámicamente
const stepMultipliers = [
  { x: 0, y: 0 },    // Sección 1
  { x: 0, y: -1 },   // Sección 2 (multiplicado por viewportHeight)
  { x: -1, y: -1 },  // Sección 3 (multiplicado por viewportWidth y viewportHeight)
  { x: -1, y: -2 }   // Sección 4 (multiplicado por viewportWidth y 2*viewportHeight)
];

// --- Definiciones de cursores (¡Esto debe ir antes de las funciones que los usan!) ---
const forwardCursors = [
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 21l-8-8h6V3h4v10h6z\'/%3E%3C/svg%3E") 16 16, auto',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M10 17l5-5-5-5v10z\'/%3E%3C/svg%3E") 16 16, auto',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 21l-8-8h6V3h4v10h6z\'/%3E%3C/svg%3E") 16 16, auto',
  'auto'
];

const backwardCursors = [
  'auto',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 3l8 8h-6v10h-4V11H4z\'/%3E%3C/svg%3E") 16 16, auto',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M14 7l-5 5 5 5V7z\'/%3E%3C/svg%3E") 16 16, auto',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 3l8 8h-6v10h-4V11H4z\'/%3E%3C/svg%3E") 16 16, auto'
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
  updateCursor();
}

function updateCursor() {
  // Tu lógica de cursor actual.
  // Asegúrate de que 'viewport' es el elemento donde quieres cambiar el cursor.
  if (currentStep === stepMultipliers.length - 1) {
    viewport.style.cursor = backwardCursors[currentStep];
  } else if (currentStep === 0) {
    viewport.style.cursor = forwardCursors[currentStep];
  } else {
    viewport.style.cursor = forwardDirection ? forwardCursors[currentStep] : backwardCursors[currentStep];
  }
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
  if (isScrolling) return;
  const delta = e.deltaY;
  if (delta > 0) { // Scroll hacia abajo/adelante
    scrollTo(currentStep + 1);
  } else if (delta < 0) { // Scroll hacia arriba/atrás
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
    // Aquí puedes decidir si quieres que los swipes horizontales también cambien de sección
    // Si tus secciones solo se mueven en un eje (vertical o horizontal a la vez),
    // esta parte del if/else puede necesitar ajuste.
    // Para tu estructura de steps, parece que S1->S2 es vertical, S2->S3 es horizontal, S3->S4 es vertical.
    // Esto hace que el swipe sea un poco más complejo. Necesitarás una lógica más sofisticada
    // para decidir si un swipe horizontal cambia de sección verticalmente o viceversa.
    // Para simplificar, asumiré que los swipes son principalmente verticales para tu secuencia de steps.
    // Si quieres que los swipes horizontales también muevan entre S2 y S3, por ejemplo,
    // necesitarás adaptar tu función scrollTo y la lógica de steps.
  }

  // Si se hizo un swipe válido y se inició el scroll
  if (absX > swipeThreshold || absY > swipeThreshold) {
    isScrolling = true; // Marca como desplazando solo si se detectó un swipe significativo
    setTimeout(() => { isScrolling = false }, 1000); // Ajusta esto al tiempo de tu transición CSS
  }
});


// --- INICIALIZACIÓN Y MANEJO DE REDIMENSIONAMIENTO ---

// Muy importante: recalcular la posición cuando la ventana cambia de tamaño
// Esto captura la rotación del dispositivo o la aparición/desaparición de la barra de navegación
window.addEventListener("resize", updateTransform);

// Inicializa la posición al cargar la página
document.addEventListener('DOMContentLoaded', updateTransform);

// También es buena idea llamar a updateTransform() una vez al inicio
// para asegurar que las secciones estén en la posición correcta desde el primer momento.
updateTransform();