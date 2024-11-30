// Load data
const azkarData = async () => {
  const res = await fetch("./azkar.json");
  const data = await res.json();
  return data;
};
const catsData = async () => {
  const res = await fetch("./categories.json");
  const data = await res.json();
  return await data;
};
const azkar = await azkarData();
const cats = await catsData();

// The select
const select = document.getElementById("select");

cats.forEach(({ cat_name }) => {
  const option = document.createElement("option");
  option.value = cat_name;
  option.innerHTML = cat_name;
  select.appendChild(option);
});

const container = document.getElementById("zekrContainer");
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

select.addEventListener(`change`, (e) => {
  container.innerHTML = ``;
  azkar
    .filter(({ category }) => category === e.target.value)
    .forEach((zekrItem) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "bg-white",
        "shadow",
        "p-4",
        "text-center",
        "break-words"
      );
      card.style.border = `3px solid ${getRandomColor()}`;

      const zekrText = document.createElement("p");
      const zekrCount = document.createElement("small");
      zekrText.classList.add("text-lg", "font-semibold");
      zekrText.innerText = zekrItem.zekr;

      zekrCount.innerText = `[${zekrItem.count ? zekrItem.count : 1}]`;

      zekrText.addEventListener("click", () => {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(zekrItem.zekr);
        utterance.lang = "ar-SA";

        speechSynthesis.speak(utterance);
      });

      card.appendChild(zekrText);
      card.appendChild(zekrCount);
      container.appendChild(card);
    });
});

function applyTheme(theme) {
  document.body.classList.remove("dark-mode", "light-mode");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

const currentTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (currentTheme === "dark") {
  applyTheme("dark-mode");
} else if (currentTheme === "light") {
  applyTheme("light-mode");
} else if (prefersDarkScheme.matches) {
  applyTheme("dark-mode");
} else {
  applyTheme("light-mode");
}

const themeToggleBtn = document.getElementById("theme-toggle");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      applyTheme("light-mode");
    } else {
      applyTheme("dark-mode");
    }
  });
}

prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    if (e.matches) {
      applyTheme("dark-mode");
    } else {
      applyTheme("light-mode");
    }
  }
});
