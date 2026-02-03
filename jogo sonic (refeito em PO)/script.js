class Personagem {
  constructor(seletor) {
    this.element = document.querySelector(seletor);
  }
}

class Sonic extends Personagem {
  constructor(seletor) {
    super(seletor);
    this.isJumping = false;
  }

  jump() {
    if (this.isJumping) return;

    this.isJumping = true;
    this.element.classList.add("jump");
    this.element.src = "./Arquivos/Sonic-Jump.gif";

    setTimeout(() => {
      this.element.classList.remove("jump");
      this.element.src = "./Arquivos/Sonic.gif";
      this.isJumping = false;
    }, 900);
  }

  lose() {
    this.element.style.animation = "none";
    this.element.src = "./Arquivos/Sonic-Loss.gif";
    this.element.style.width = "240px";
  }

  getBottom() {
    return Number(
      window.getComputedStyle(this.element).bottom.replace("px", "")
    );
  }
}

class Eggman extends Personagem {
  stop() {
    const position = this.element.offsetLeft;
    this.element.style.animation = "none";
    this.element.style.left = `${position}px`;
    return position;
  }

  getPosition() {
    return this.element.offsetLeft;
  }
}


class Game {
  constructor() {
    this.sonic = new Sonic(".sonic");
    this.eggman = new Eggman(".eggman");
    this.fundo = document.querySelector(".fundo");
    this.loop = null;
  }

  start() {
    this.loop = setInterval(() => {
      const eggmanPosition = this.eggman.getPosition();
      const sonicPosition = this.sonic.getBottom();

      if (eggmanPosition < 110 && eggmanPosition > 0 && sonicPosition < 220) {
        this.eggman.stop();
        this.sonic.lose();
        this.fundo.src = "./Arquivos/GameoverSMB-1.png";
        clearInterval(this.loop);
      }
    }, 10);
  }

  controls() {
    document.addEventListener("click", () => {
      this.sonic.jump();
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        this.sonic.jump();
      }
    });
  }
}

const game = new Game();
game.controls();
game.start();
