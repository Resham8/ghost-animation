const characterButton = document.getElementById("characterButton");
const characterContainer = document.getElementById("characterContainer");
const glow = document.getElementById("glow");
const selectorOptions = document.querySelectorAll(".selector-option");

let isMoving = false;
let currentCharacter = "ghost";

const characters = {
  ghost: `
                <div class="ghost" id="character">
                    <div class="ghost-eyes">
                        <div class="eye"></div>
                        <div class="eye"></div>
                    </div>
                    <div class="ghost-mouth"></div>
                </div>
            `,
  pumpkin: `
                <div class="pumpkin" id="character">
                    <div class="pumpkin-lines">
                        <div class="pumpkin-line"></div>
                        <div class="pumpkin-line"></div>
                        <div class="pumpkin-line"></div>
                    </div>
                    <div class="pumpkin-face">
                        <div class="pumpkin-eye"></div>
                        <div class="pumpkin-eye"></div>
                        <div class="pumpkin-mouth"></div>
                    </div>
                </div>
            `,
  monster: `
                <div class="monster" id="character">
                    <div class="monster-horns">
                        <div class="horn"></div>
                        <div class="horn"></div>
                    </div>
                    <div class="monster-eyes">
                        <div class="monster-eye"></div>
                        <div class="monster-eye"></div>
                    </div>
                    <div class="monster-mouth">
                        <div class="monster-teeth">
                            <div class="tooth"></div>
                            <div class="tooth"></div>
                            <div class="tooth"></div>
                            <div class="tooth"></div>
                        </div>
                    </div>
                    <div class="monster-arms">
                        <div class="arm arm-left"></div>
                        <div class="arm arm-right"></div>
                    </div>
                </div>
            `,
  bat: `
                <div class="bat" id="character">
                    <div class="bat-body">
                        <div class="bat-head">
                            <div class="bat-ears">
                                <div class="bat-ear"></div>
                                <div class="bat-ear"></div>
                            </div>
                            <div class="bat-eyes">
                                <div class="bat-eye"></div>
                                <div class="bat-eye"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bat-wings">
                        <div class="bat-wing bat-wing-left"></div>
                        <div class="bat-wing bat-wing-right"></div>
                    </div>
                </div>
            `,
  witch: `
                <div class="witch-hat" id="character">
                    <div class="hat-top"></div>
                    <div class="hat-buckle"></div>
                    <div class="hat-brim"></div>
                </div>
            `,
  skull: `
                <div class="skull" id="character">
                    <div class="skull-head">
                        <div class="skull-eyes">
                            <div class="skull-eye"></div>
                            <div class="skull-eye"></div>
                        </div>
                        <div class="skull-nose"></div>
                    </div>
                    <div class="skull-jaw">
                        <div class="skull-teeth">
                            <div class="skull-tooth"></div>
                            <div class="skull-tooth"></div>
                            <div class="skull-tooth"></div>
                            <div class="skull-tooth"></div>
                            <div class="skull-tooth"></div>
                        </div>
                    </div>
                </div>
            `,
  cat: `
                <div class="black-cat" id="character">
                    <div class="cat-head">
                        <div class="cat-ears">
                            <div class="cat-ear">
                                <div class="cat-ear-inner"></div>
                            </div>
                            <div class="cat-ear">
                                <div class="cat-ear-inner"></div>
                            </div>
                        </div>
                        <div class="cat-eyes">
                            <div class="cat-eye"></div>
                            <div class="cat-eye"></div>
                        </div>
                        <div class="cat-nose"></div>
                        <div class="cat-whiskers">
                            <div class="whisker whisker-left-1"></div>
                            <div class="whisker whisker-left-2"></div>
                            <div class="whisker whisker-right-1"></div>
                            <div class="whisker whisker-right-2"></div>
                        </div>
                    </div>
                    <div class="cat-body"></div>
                    <div class="cat-tail"></div>
                </div>
            `,
  candy: `
                <div class="candy-corn" id="character">
                    <div class="candy-section candy-top"></div>
                    <div class="candy-section candy-middle"></div>
                    <div class="candy-section candy-bottom"></div>
                </div>
            `,
};

function setCharacter(type) {
  characterContainer.innerHTML = characters[type];
  currentCharacter = type;
}

function getRandomPosition() {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  const margin = 100;
  const maxX = containerRect.width - margin;
  const maxY = containerRect.height - margin - 100;

  const x = Math.random() * (maxX - margin) + margin;
  const y = Math.random() * (maxY - margin) + margin;

  return { x, y };
}

function moveCharacter() {
  if (isMoving) return;

  isMoving = true;
  const character = document.getElementById("character");
  const newPos = getRandomPosition();

  character.classList.add("scared");
  character.style.opacity = "0";
  character.style.transform = "scale(0.5)";

  setTimeout(() => {
    characterButton.style.left = newPos.x + "px";
    characterButton.style.top = newPos.y + "px";
    characterButton.style.transform = "translate(0, 0)";

    setTimeout(() => {
      character.style.opacity = "1";
      character.style.transform = "scale(1)";
      character.classList.remove("scared");
      isMoving = false;
    }, 100);
  }, 300);
}

characterButton.addEventListener("mouseenter", () => {
  glow.style.opacity = "1";
  moveCharacter();
});

characterButton.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});

characterButton.addEventListener("click", (e) => {
  e.preventDefault();
  moveCharacter();
});

characterButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  glow.style.opacity = "1";
  moveCharacter();
});

selectorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectorOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    const characterType = option.dataset.character;
    setCharacter(characterType);
  });
});

window.addEventListener("load", () => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  characterButton.style.left = centerX + "px";
  characterButton.style.top = centerY + "px";
  characterButton.style.transform = "translate(-50%, -50%)";
  setCharacter("ghost");
});
