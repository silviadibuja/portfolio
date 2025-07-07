// src/scripts/hoverImages.js
export function HoverGifSwap() {
  const imgs = document.querySelectorAll('.hover-gif');
  imgs.forEach((img) => {
    const staticSrc = img.dataset.static;
    const gifSrc = img.dataset.gif;

    img.addEventListener('mouseenter', () => img.src = gifSrc);
    img.addEventListener('mouseleave', () => img.src = staticSrc);
    img.addEventListener('touchstart', () => img.src = gifSrc);
    img.addEventListener('touchend', () => img.src = staticSrc);
  });
}
