// load data
const azkarData = async () => {
  const res = await fetch("/azkar.json");
  const data = await res.json();
  return data;
};
const catsData = async () => {
  const res = await fetch("/categories.json");
  const data = await res.json();
  return await data;
};
const azkar = await azkarData();
const cats = await catsData();

// the select
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

      card.appendChild(zekrText);
      card.appendChild(zekrCount);
      container.appendChild(card);
    });
});

// THeme section
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeToggleBtn = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
} else if (currentTheme === "light") {
  document.body.classList.add("light-mode");
} else if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.add("light-mode");
}

themeToggleBtn.addEventListener("click", function () {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
});
