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
  root.setAttribute("data-selected-theme", theme);
  root.setAttribute("data-theme", theme);

  if (theme === "system") {
    root.classList.add("theme-system");
    return;
  }

  root.classList.add(`theme-${theme}`);
}

function updateThemePicker(fieldset, stateSlot, theme) {
  const selectedLabel = themeLabels[theme];

  fieldset.dataset.themeChoice = theme;
  stateSlot.textContent = `Selected theme: ${selectedLabel}.`;
}

function createThemePicker(currentTheme) {
  const picker = document.querySelector("[data-theme-picker]");
  const nav = document.querySelector("body > header nav");

  if (!picker && !nav) {
    return;
  }

  const fieldset = picker ?? document.createElement("fieldset");
  let stateSlot = fieldset.querySelector("#theme-picker-state");

  if (!picker) {
    fieldset.className = "theme-picker";
    fieldset.dataset.themePicker = "";
    fieldset.dataset.themeOptions = "light dark system";
    fieldset.setAttribute("aria-describedby", "theme-picker-state");
    fieldset.replaceChildren();

    const legend = document.createElement("legend");
    legend.textContent = "Theme";

    const options = document.createElement("span");
    options.className = "theme-picker-options";

    themeOrder.forEach((theme) => {
      const option = document.createElement("span");
      const input = document.createElement("input");
      const label = document.createElement("label");
      const id = `theme-picker-${theme}`;

      input.type = "radio";
      input.id = id;
      input.name = "theme";
      input.value = theme;
      label.htmlFor = id;
      label.textContent = themeLabels[theme];
      option.append(input, label);
      options.append(option);
    });

    stateSlot = document.createElement("span");
    stateSlot.className = "visually-hidden";
    stateSlot.id = "theme-picker-state";
    stateSlot.setAttribute("aria-live", "polite");
    stateSlot.setAttribute("aria-atomic", "true");
    fieldset.append(legend, options, stateSlot);
    nav.append(fieldset);
  }

  fieldset.hidden = false;

  fieldset.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.checked = input.value === currentTheme;
    input.addEventListener("change", () => {
      if (!input.checked) {
        return;
      }

      const selectedTheme = normalizeTheme(input.value);
      applyTheme(selectedTheme);
      writeStoredTheme(selectedTheme);
      updateThemePicker(fieldset, stateSlot, selectedTheme);
    });
  });

  updateThemePicker(fieldset, stateSlot, currentTheme);
}

const currentTheme = normalizeTheme(readStoredTheme());
applyTheme(currentTheme);
createThemePicker(currentTheme);
