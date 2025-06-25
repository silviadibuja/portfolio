import SplitType from "https://cdn.jsdelivr.net/npm/split-type@0.3.2/+esm";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm";

window.addEventListener("load", () => {
  const split = new SplitType(".dibuja-text", {
    types: "words, chars"
  });

  const timeline = gsap.timeline();

  split.chars.forEach((char, index) => {
    timeline.from(char, {
      y: gsap.utils.random(-550, 650),
      x: gsap.utils.random(-300, 300),
      rotate: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0, 2),
      opacity: 0,
      duration: 5,
      ease: "back.out",
      delay: index * 0.01
    }, 0);

    timeline.from(char, {
      color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
      duration: 2
    }, "-=2");
  });

  // 👇 Al final de la animación, revertimos la estructura generada por SplitType
  timeline.call(() => {
    split.revert();
  });
});
