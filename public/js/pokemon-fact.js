const pokemonFactsEndpoint = "https://pokefacts.vercel.app/";
const pokemonFactsCacheKey = "pokemon-fact:last";
const pokemonFactsCacheTtl = 5 * 60 * 1000;
const pokemonFactsTimeout = 7000;
const pokemonFactsCount = 1;
const defaultButtonLabel = "Get Pokemon Fact";
const defaultHeading = "Pokemon Fact";

function getCachedFact() {
  try {
    const cached = sessionStorage.getItem(pokemonFactsCacheKey);

    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached);

    if (Date.now() - data.savedAt > pokemonFactsCacheTtl || typeof data.fact !== "string") {
      return null;
    }

    return data.fact;
  } catch {
    return null;
  }
}

function setCachedFact(fact) {
  try {
    sessionStorage.setItem(
      pokemonFactsCacheKey,
      JSON.stringify({
        savedAt: Date.now(),
        fact,
      }),
    );
  } catch {
    return;
  }
}

function createFallbackTemplate() {
  const template = document.createElement("template");
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const status = document.createElement("p");
  const button = document.createElement("button");

  heading.dataset.role = "heading";
  status.dataset.role = "status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  button.type = "button";
  button.dataset.role = "load-button";

  article.append(heading, status, button);
  template.content.append(article);

  return template;
}

class PokemonFactCard extends HTMLElement {
  static observedAttributes = ["heading"];

  connectedCallback() {
    this.abortController = null;
    this.template = document.getElementById("pokemon-fact-template") ?? createFallbackTemplate();
    this.fallbackText = this.textContent.trim();
    this.render();
    this.setIdle();

    const cachedFact = getCachedFact();

    if (cachedFact) {
      this.setFact(cachedFact);
    }
  }

  disconnectedCallback() {
    this.abortCurrentRequest();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "heading" || oldValue === newValue || !this.isConnected || !this.heading) {
      return;
    }

    this.heading.textContent = this.headingText;
  }

  render() {
    const fragment = this.template.content.cloneNode(true);

    this.replaceChildren(fragment);
    this.heading = this.querySelector('[data-role="heading"]') ?? this.querySelector("h3");
    this.status = this.querySelector('[data-role="status"]');
    this.button = this.querySelector('[data-role="load-button"]');

    if (!this.heading || !this.button || !this.status) {
      this.setState("error");
      return;
    }

    this.heading.textContent = this.headingText;
    this.button.addEventListener("click", () => {
      this.loadFacts();
    });
  }

  setState(state) {
    this.dataset.state = state;
    this.setAttribute("state", state);
    this.setAttribute("aria-busy", state === "loading" ? "true" : "false");
  }

  setIdle() {
    this.setState("idle");
    this.status.textContent = "Press the button to load a random Pokemon fact.";
    this.button.textContent = this.buttonLabel;
    this.button.disabled = false;
  }

  setLoading() {
    this.setState("loading");
    this.status.textContent = "Loading a Pokemon fact...";
    this.button.textContent = "Loading...";
    this.button.disabled = true;
  }

  setError(message) {
    this.setState("error");
    this.status.textContent = this.fallbackText ? `${message} ${this.fallbackText}` : message;
    this.button.textContent = "Try Again";
    this.button.disabled = false;
  }

  setFact(fact) {
    this.setState("ready");
    this.status.textContent = fact;
    this.button.textContent = "Get Another Fact";
    this.button.disabled = false;
  }

  abortCurrentRequest() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  async loadFacts() {
    this.abortCurrentRequest();
    this.setLoading();

    const controller = new AbortController();
    this.abortController = controller;

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, pokemonFactsTimeout);

    try {
      const url = new URL(pokemonFactsEndpoint);
      url.searchParams.set("count", String(pokemonFactsCount));
      url.searchParams.set("request", String(Date.now()));

      const response = await fetch(url, {
        headers: {
          accept: "application/json",
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Pokemon facts request failed with status ${response.status}.`);
      }

      const payload = await response.json();
      const facts = Array.isArray(payload.data) ? payload.data.filter((fact) => typeof fact === "string") : [];

      if (facts.length === 0) {
        this.setState("idle");
        this.status.textContent = "No Pokemon facts were returned. Try again.";
        this.button.textContent = "Try Again";
        this.button.disabled = false;
        return;
      }

      setCachedFact(facts[0]);
      this.setFact(facts[0]);
    } catch (error) {
      if (controller.signal.aborted && this.abortController !== controller) {
        return;
      }

      if (error.name === "AbortError") {
        this.setError("The Pokemon facts request timed out. Try again.");
      } else {
        this.setError("Pokemon facts are unavailable right now. Try again later.");
      }
    } finally {
      window.clearTimeout(timeoutId);

      if (this.abortController === controller) {
        this.abortController = null;
      }
    }
  }

  get buttonLabel() {
    return defaultButtonLabel;
  }

  get headingText() {
    return this.getAttribute("heading") || defaultHeading;
  }
}

customElements.define("pokemon-fact-card", PokemonFactCard);
