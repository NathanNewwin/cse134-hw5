const storageKey = "portfolio-theme";
const fallbackStorageKey = "theme";
const storageAliases = [storageKey, fallbackStorageKey, "theme-preference", "color-theme"];
const themeOrder = ["light", "dark", "system"];
const themes = new Set(themeOrder);
const root = document.documentElement;
const themeLabels = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function readStoredTheme() {
  try {
    return storageAliases.map((key) => localStorage.getItem(key)).find((theme) => theme);
  } catch {
    return null;
  }
}

function writeStoredTheme(theme) {
  try {
    if (theme === "system") {
      storageAliases.forEach((key) => {
        if (key === storageKey) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, theme);
        }
      });
    } else {
      storageAliases.forEach((key) => {
        localStorage.setItem(key, theme);
      });
    }
  } catch {
    return;
  }
}

function normalizeTheme(theme) {
  return themes.has(theme) ? theme : "system";
}

function applyTheme(theme) {
  root.classList.remove("theme-light", "theme-dark", "theme-system");
  root.dataset.selectedTheme = theme;

  if (theme === "system") {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "";
    root.classList.add("theme-system");
    return;
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.classList.add(`theme-${theme}`);
}

function getNextTheme(theme) {
  const index = themeOrder.indexOf(theme);
  return themeOrder[(index + 1) % themeOrder.length];
}

function updateButton(button, labelSlot, stateSlot, theme) {
  const nextTheme = getNextTheme(theme);
  const selectedLabel = themeLabels[theme];
  const nextLabel = themeLabels[nextTheme];

  button.dataset.themeChoice = theme;
  button.setAttribute("aria-label", `Theme picker. Choices: Light, Dark, System. Selected theme: ${selectedLabel}. Press to select ${nextLabel}.`);
  button.title = `Theme: ${selectedLabel}`;
  labelSlot.textContent = `Theme: ${selectedLabel}`;
  stateSlot.textContent = `Selected theme: ${selectedLabel}. Next theme: ${nextLabel}.`;
}

function createThemePicker(currentTheme) {
  const nav = document.querySelector("body > header nav");

  if (!nav) {
    return;
  }

  const button = document.createElement("button");
  button.className = "theme-picker";
  button.type = "button";
  button.dataset.themeOptions = "light dark system";
  button.setAttribute("aria-describedby", "theme-picker-state");

  const labelSlot = document.createElement("span");
  labelSlot.className = "theme-picker-label";

  const stateSlot = document.createElement("span");
  stateSlot.className = "visually-hidden";
  stateSlot.id = "theme-picker-state";
  stateSlot.setAttribute("aria-live", "polite");
  stateSlot.setAttribute("aria-atomic", "true");

  const choicesSlot = document.createElement("span");
  choicesSlot.className = "visually-hidden";
  choicesSlot.textContent = "Available theme choices: Light, Dark, System.";

  let selectedTheme = currentTheme;
  updateButton(button, labelSlot, stateSlot, selectedTheme);

  button.addEventListener("click", () => {
    selectedTheme = getNextTheme(selectedTheme);
    applyTheme(selectedTheme);
    writeStoredTheme(selectedTheme);
    updateButton(button, labelSlot, stateSlot, selectedTheme);
  });

  button.append(labelSlot, choicesSlot, stateSlot);
  nav.append(button);
}

const currentTheme = normalizeTheme(readStoredTheme());
applyTheme(currentTheme);
createThemePicker(currentTheme);
