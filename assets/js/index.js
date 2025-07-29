const svg = document.getElementById("animatedIcon");
svg.addEventListener("mouseenter", () => {
  const clone = svg.cloneNode(true);
  svg.replaceWith(clone);
});

const tabs = document.querySelectorAll("[data-tab]");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    contents.forEach((content) => {
      content.classList.toggle(
        "hidden",
        content.getAttribute("data-content") !== target
      );
    });

    tabs.forEach((t) => {
      t.classList.remove(
        "bg-[#161b22]",
        "text-[#5fcf9c]",
        "text-blue-300",
        "text-fuchsia-300"
      );
      t.classList.add("text-[#8b949e]");
    });

    tab.classList.remove("text-[#8b949e]");
    tab.classList.add("bg-[#161b22]");

    if (target === "yooz") {
      tab.classList.add("text-[#5fcf9c]");
    } else if (target === "flow") {
      tab.classList.add("text-blue-300");
    } else if (target === "bash") {
      tab.classList.add("text-fuchsia-300");
    }
  });
});

const commands = {
  "connect --email": () =>
    (location.href = "mailto:farzam.valizadeh.2020@gmail.com"),
  "connect --telegram": () => window.open("https://t.me/Debug_Zone", "_blank"),
  "connect --web": () => (location.href = "/"),
  "connect --github": () =>
    window.open("https://github.com/farzamvalizade", "_blank"),
  "cd --about": () => (location.href = "#about"),
  "cd --skills": () => (location.href = "#skills"),
  "cd --projects": () => (location.href = "#projects"),
};

function handleCommand(e) {
  if (e.key !== "Enter") return;
  const cmd = e.target.value.trim();
  commands[cmd]?.();
  e.target.value = "";
  document.getElementById("preview").innerText = "";
}

function suggestCommand(value) {
  const preview = document.getElementById("preview");
  const match = Object.keys(commands).find((c) => c.startsWith(value));
  if (match && value) {
    preview.innerHTML = `<span class="text-gray-500">suggestion:</span> <span class="text-[#75d693] font-semibold">${match}</span>`;
  } else {
    preview.innerHTML = "";
  }
}
