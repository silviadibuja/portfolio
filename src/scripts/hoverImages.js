// src/scripts/hoverImages.js
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
}

document.addEventListener("DOMContentLoaded", setupHoverVideos);

