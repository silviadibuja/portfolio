export function initZoomScroll() {
  const services = document.getElementById("services");
  if (!services) return;

  const slides = services.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");
  if (!dotsContainer) return;

  const dots = dotsContainer.querySelectorAll(".dot");

  let current = 0;
  let DoingScroll = false;
  let autoSlideTimeout;
  let userInteracted = false;
  const AUTO_SLIDE_INTERVAL = 5000; // 5 segundos

  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    let nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
  }

  function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    userInteracted = true;
    autoSlideTimeout = setTimeout(() => {
      userInteracted = false;
      autoAdvance();
    }, AUTO_SLIDE_INTERVAL * 2);
  }

  function autoAdvance() {
    if (!userInteracted) {
      nextSlide();
    }
    autoSlideTimeout = setTimeout(autoAdvance, AUTO_SLIDE_INTERVAL);
  }

  // Navegación con rueda
  services.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (DoingScroll) return;

      DoingScroll = true;
      if (e.deltaY > 0 && current < slides.length - 1) {
        current++;
      } else if (e.deltaY < 0 && current > 0) {
        current--;
      }
      showSlide(current);
      resetAutoSlide();
      setTimeout(() => (DoingScroll = false), 600);
    },
    { passive: false }
  );

  // Click en dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      showSlide(index);
      resetAutoSlide();
    });
  });

  // Mostrar primer slide
  showSlide(0);

  // Iniciar auto advance
  autoSlideTimeout = setTimeout(autoAdvance, AUTO_SLIDE_INTERVAL);
}
