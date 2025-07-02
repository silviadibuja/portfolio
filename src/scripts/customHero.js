import { gsap } from "gsap";

export const runHeroAnimation = () => {
  const tl = gsap.timeline();

  // Expande la línea
  tl.fromTo(
    ".loading-line",
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1,
      ease: "power4.inOut",
    }
  );

  // Aparece el texto principal
  tl.fromTo(
    ".dibuja-text",
    {
      opacity: 0,
      y: 60,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power4.out",
    },
    "-=0.5"
  );

  // Desvanece el overlay completamente
  tl.to(
    ".loading-overlay",
    {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        document.querySelector(".loading-overlay").style.display = "none";
      },
    },
    "+=0.2"
  );
};
