function initCustomCursor() {
  const cursor = document.getElementById("cursor-indicator");
  const dibujaText = document.querySelector(".dibuja-text");
  if (!cursor || !dibujaText) return;

  document.body.style.cursor = "none";

  let mouseX = 0;
  let mouseY = 0;
  let rect = dibujaText.getBoundingClientRect();
  let isOver = false;

  // Actualiza mouseX/Y en evento mousemove, pero no modificamos el DOM aquí
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Actualizamos rect solo cuando el tamaño/posicion del texto puede cambiar
  window.addEventListener("resize", () => {
    rect = dibujaText.getBoundingClientRect();
  });

  function animateCursor() {
    // Mueve cursor una vez por frame
    cursor.style.top = mouseY + "px";
    cursor.style.left = mouseX + "px";
    cursor.style.transform = "translate(-50%, -50%)";

    // Solo recalcula si el cursor está dentro del rectángulo
    const nowOver = (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    );

    // Solo si cambia el estado over, actualizamos clases (evitar toggle repetitivo)
    if (nowOver !== isOver) {
      isOver = nowOver;
      cursor.classList.toggle("over-text", isOver);
      dibujaText.classList.toggle("hovered", isOver);
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

document.addEventListener("DOMContentLoaded", initCustomCursor);
