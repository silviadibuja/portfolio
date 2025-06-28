// import SplitType from "https://cdn.jsdelivr.net/npm/split-type@0.3.2/+esm";
// import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm";

// window.addEventListener("load", () => {
//   const split = new SplitType(".dibuja-text", {
//     types: "words, chars"
//   });

//   const timeline = gsap.timeline();

//   split.chars.forEach((char, index) => {
//     timeline.from(char, {
//       y: gsap.utils.random(-550, 650),
//       x: gsap.utils.random(-300, 300),
//       rotate: gsap.utils.random(-360, 360),
//       scale: gsap.utils.random(0, 2),
//       opacity: 0,
//       duration: 1.9,
//       ease: "back.out",
//       delay: index * 0.01
//     }, 0);

//     timeline.from(char, {
//       duration: 2
//     }, "-=2");
//   });

//   // 👇 Al final de la animación, revertimos la estructura generada por SplitType
//   timeline.call(() => {
//     split.revert();
//   });
// });
 // Este archivo NO debe usar export
import { gsap } from "gsap";

export function runAnimations() {
  gsap.to(".viewport", {
    height: "100vh",
    duration: 1.2,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(".overlay", {
        y: "-100%",
        duration: 1,
        delay: 0.4,
        ease: "power2.inOut"
      });
      gsap.to(".content", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power2.out"
      });
    }
  });
}
