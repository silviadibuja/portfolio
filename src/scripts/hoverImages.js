function setupHoverVideos() {
  const cards = document.querySelectorAll(".card-media-wrapper");

  cards.forEach((wrapper) => {
    const img = wrapper.querySelector('[data-type="image"]');
    const video = wrapper.querySelector('[data-type="video"]');

    const showVideo = () => {
      img.style.display = "none";
      video.style.display = "block";
      video.currentTime = 0;
      video.play();
    };

    const showImage = () => {
      video.pause();
      video.style.display = "none";
      img.style.display = "block";
    };

    wrapper.addEventListener("mouseenter", showVideo);
    wrapper.addEventListener("mouseleave", showImage);

    // Para móvil
    wrapper.addEventListener("touchstart", showVideo);
    wrapper.addEventListener("touchend", showImage);
  });

  const allCards = document.querySelectorAll(".card");

  const animateCards = () => {
    allCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.remove("visible"); // reiniciamos
        // Forzamos reflow para reiniciar la animación
        void card.offsetWidth;
        card.classList.add("visible");
      }, i * 1000); // delay en cascada
    });
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        animateCards();
        observer.disconnect(); // Solo la primera vez
      }
    },
    {
      threshold: 0.4,
    }
  );

  allCards.forEach((card) => observer.observe(card));

  // Repetir cada 60 segundos
  setInterval(animateCards, 60000);
}

document.addEventListener("DOMContentLoaded", setupHoverVideos);
