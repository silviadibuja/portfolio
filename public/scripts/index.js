const slider = document.getElementById("slider");
const viewport = document.getElementById("viewport");

let currentStep = 0;
let isScrolling = false;

const steps = [
  { x: 0, y: 0 },        // Sección 1
  { x: 0, y: -100 },     // Sección 2
  { x: -100, y: -100 },  // Sección 3
  { x: -100, y: -200 }   // Sección 4
];

const forwardCursors = [
  // S1 → S2 ↓
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 21l-8-8h6V3h4v10h6z\'/%3E%3C/svg%3E") 16 16, auto',
  // S2 → S3 →
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M10 17l5-5-5-5v10z\'/%3E%3C/svg%3E") 16 16, auto',
  // S3 → S4 ↓
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 21l-8-8h6V3h4v10h6z\'/%3E%3C/svg%3E") 16 16, auto',
  // S4 → fin
  'auto'
];

const backwardCursors = [
  // S1 ← inicio
  'auto',
  // S2 → S1 ↑
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 3l8 8h-6v10h-4V11H4z\'/%3E%3C/svg%3E") 16 16, auto',
  // S3 → S2 ←
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M14 7l-5 5 5 5V7z\'/%3E%3C/svg%3E") 16 16, auto',
  // S4 → S3 ↑
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\' fill=\'black\'%3E%3Cpath d=\'M12 3l8 8h-6v10h-4V11H4z\'/%3E%3C/svg%3E") 16 16, auto'
];

function updateCursor() {
  // Si estás en la última sección, cursor = atrás
  if (currentStep === steps.length - 1) {
    viewport.style.cursor = backwardCursors[currentStep];
  }
  // Si estás en la primera sección, cursor = adelante
  else if (currentStep === 0) {
    viewport.style.cursor = forwardCursors[currentStep];
  } else {
    // Mostrar la dirección dependiendo de si el usuario va a subir o bajar
    viewport.style.cursor = forwardDirection ? forwardCursors[currentStep] : backwardCursors[currentStep];
  }
}

let forwardDirection = true;

function moveToStep(index) {
  const step = steps[index];
  slider.style.transform = `translate(${step.x}vw, ${step.y}vh)`;
  updateCursor();
}

function scrollTo(nextIndex) {
  if (nextIndex < 0 || nextIndex >= steps.length) return;

  forwardDirection = nextIndex > currentStep;
  currentStep = nextIndex;
  moveToStep(currentStep);
}

function handleWheel(e) {
  if (isScrolling) return;
  isScrolling = true;

  const delta = e.deltaY;

  if (delta > 0 && currentStep < steps.length - 1) {
    scrollTo(currentStep + 1);
  } else if (delta < 0 && currentStep > 0) {
    scrollTo(currentStep - 1);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

window.addEventListener("wheel", handleWheel);

// Touch swipe
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = e.changedTouches[0].clientY - touchStartY;

  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (isScrolling) return;

  if (absY > absX) {
    if (deltaY < -30) scrollTo(currentStep + 1); // swipe up
    else if (deltaY > 30) scrollTo(currentStep - 1); // swipe down
  } else {
    if (deltaX < -30) scrollTo(currentStep + 1); // swipe left
    else if (deltaX > 30) scrollTo(currentStep - 1); // swipe right
  }

  isScrolling = true;
  setTimeout(() => { isScrolling = false }, 1000);
});

// Init
moveToStep(currentStep);


