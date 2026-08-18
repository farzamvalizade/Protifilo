/* --------------------------------
       Cursor
    -------------------------------- */

const cursor = document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;

  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* --------------------------------
       Cursor hover
    -------------------------------- */
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.opacity = "0.65";
  });

  element.addEventListener("mouseleave", () => {
    cursor.style.opacity = "1";
  });
});
/* --------------------------------
       Magnetic elements
    -------------------------------- */

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

/* --------------------------------
       Menu
    -------------------------------- */

const menuButton = document.getElementById("menuButton");

const menuPanel = document.getElementById("menuPanel");

menuButton.addEventListener("click", () => {
  const open = menuPanel.classList.toggle("open");

  menuButton.classList.toggle("open", open);

  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuPanel.classList.remove("open");
    menuButton.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* --------------------------------
       Reveal animations
    -------------------------------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 40, 350)}ms`;

  observer.observe(element);
});

/* --------------------------------
       Liquid drag
    -------------------------------- */

const gooMain = document.getElementById("goo-main");

const gooTail = document.getElementById("goo-tail");

let gooX = window.innerWidth / 2;
let gooY = window.innerHeight / 2;

let targetX = gooX;
let targetY = gooY;

let dragging = false;

document.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;

  dragging = true;

  targetX = event.clientX;
  targetY = event.clientY;
});

document.addEventListener("mousemove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

function animateLiquid() {
  const dx = targetX - gooX;
  const dy = targetY - gooY;

  gooX += dx * (dragging ? 0.2 : 0.08);
  gooY += dy * (dragging ? 0.2 : 0.08);

  const distance = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx);

  const stretch = Math.min(distance, 80);

  gooMain.setAttribute("cx", gooX);
  gooMain.setAttribute("cy", gooY);

  const tailDistance = dragging ? Math.max(8, stretch * 0.65) : 0;

  const tailX = gooX - Math.cos(angle) * tailDistance;

  const tailY = gooY - Math.sin(angle) * tailDistance;

  gooTail.setAttribute("cx", tailX);
  gooTail.setAttribute("cy", tailY);

  gooTail.setAttribute("r", dragging ? Math.min(20, 8 + stretch * 0.15) : 12);

  requestAnimationFrame(animateLiquid);
}

animateLiquid();

/* --------------------------------
       3D project tilt
    -------------------------------- */

document.querySelectorAll(".project").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 4;

    const rotateY = (x - 0.5) * 4;

    card.style.transform = `
              perspective(1000px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-8px)
            `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* --------------------------------
       Escape closes menu
    -------------------------------- */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuPanel.classList.remove("open");
    menuButton.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
  }
});
