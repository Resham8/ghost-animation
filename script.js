const ghostButton = document.getElementById("ghostButton");
const ghost = document.getElementById("ghost");
const glow = document.getElementById("glow");

let isMoving = false;

function getRandomPosition() {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  const margin = 100;
  const maxX = containerRect.width - margin;
  const maxY = containerRect.height - margin;

  const x = Math.random() * (maxX - margin) + margin;
  const y = Math.random() * (maxY - margin) + margin;

  return { x, y };
}

function moveGhost() {
  if (isMoving) return;

  isMoving = true;
  const newPos = getRandomPosition();

  ghost.classList.add("scared");
  ghost.style.opacity = "0";
  ghost.style.transform = "scale(0.5)";

  setTimeout(() => {
    ghostButton.style.left = newPos.x + "px";
    ghostButton.style.top = newPos.y + "px";
    ghostButton.style.transform = "translate(0, 0)";

    setTimeout(() => {
      ghost.style.opacity = "1";
      ghost.style.transform = "scale(1)";
      ghost.classList.remove("scared");
      isMoving = false;
    }, 100);
  }, 300);
}

ghostButton.addEventListener("mouseenter", () => {
  glow.style.opacity = "1";
  moveGhost();
});

ghostButton.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});

ghostButton.addEventListener("click", (e) => {
  e.preventDefault();
  moveGhost();
});

ghostButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  glow.style.opacity = "1";
  moveGhost();
});

window.addEventListener("load", () => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  ghostButton.style.left = centerX + "px";
  ghostButton.style.top = centerY + "px";
  ghostButton.style.transform = "translate(-50%, -50%)";
});
