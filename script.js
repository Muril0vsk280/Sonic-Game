const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const fundo = document.querySelector(".fundo");
let gameOver = false;

// pulo do

const jump = () => {
  if (!sonic.classList.contains("jump") && !gameOver) {
    sonic.classList.add("jump");
    sonic.src = "./Arquivos/Sonic-Jump.gif";

    setTimeout(() => {
      sonic.classList.remove("jump");
      sonic.src = "./Arquivos/Sonic.gif";
    }, 900);
  }
};

// loopzinho que fica checando se o eggman encostou no sonic
const loop = setInterval(() => {
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  // se bater faz com que aparece a tela de game over 
  if (eggmanPosition < 110 && eggmanPosition > 0 && sonicPosition < 220) {
    gameOver = true;
    eggman.style.animation = "none";
    eggman.style.left = `${eggmanPosition}px`;
    sonic.style.animation = "none";
    sonic.src = "./Arquivos/Sonic-Loss.gif";
    sonic.style.width = "220px";
    fundo.src = "./Arquivos/GameoverSMB-1.png";
    fundo.style.width = "100%";
    clearInterval(timerInterval); // para o cronômetro pq o sonic morreu
  }
}, 10);
// clique pra fazer o sonic pular
document.addEventListener("click", jump);
// espaço ou seta pra cima também faz ele subir
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") jump();
});
// cronômetro funcionando
let tempo = 0;
let timerInterval = setInterval(() => {
  tempo++;
  document.getElementById("timer").textContent = "Tempo: " + tempo + "s";
}, 1000);
// se clicar depois que morreu, reinicia tudo
document.addEventListener("click", () => {
  if (gameOver) {
    location.reload();
  }
});
