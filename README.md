# Nathan Nguyen Portfolio

## Local Setup

To run the site locally, install the dependencies first:

```sh
npm install
```

Then start the Astro development server:

```sh
npm run dev
```

To build the static version of the site, run:

```sh
npm run build
```

The build output is generated in the `dist` directory, which is the folder Cloudflare Pages uses for deployment.

## Part 1: Theme Picker

The site initially supports light and dark modes by using `color-scheme` and `prefers-color-scheme` in the CSS. This means that if JavaScript is disabled, the page still follows the user's system setting and stays fully usable (user can still change themes by changing browsers theme setting). I also added a `<noscript>` message to explain that the user will not be able to manually override the color scheme through the theme picker when JavaScript is disabled. The JavaScript version creates a button after the page loads and is able to cycle between `light`, `dark`, and `system`. The selected option is saved in `localStorage` under `portfolio-theme` where when the user picks light or dark mode, the script applies a `data-theme` attribute to the `<html>` element. When the user picks system, the attribute is removed so the CSS can go back to following the system preference. I wrapped the storage logic in `try`/`catch` blocks so the site does not break if `localStorage` is unavailable. The selected state is exposed through the button label and a screen-reader status message, so the control is still understandable for assistive technology. The script is loaded with `defer` from `/js/theme.js` since it isn't an important part of the site.

## Part 2: Pokemon Fact Web Component

For Part 2, I created a custom web component called `<pokemon-fact-card>` which displays a random pokemon fact after clicking the button. It is placed inside the hobbies and interests section on the About page. The component fetches from this API endpoint: `https://pokefacts.vercel.app/?count=1`. The `count=1` value is kept in the request because the API source requires it, but the user does not need to choose a count. They can just press the button again to fetch another random fact. The component supports a `heading` attribute, which lets me change the heading text without editing the component's JavaScript. If no heading is provided, it uses `Pokemon Fact` by default. In the About page, I use the component as `<pokemon-fact-card heading="Pokemon Fact">` and place fallback text inside it for users who do not have JavaScript or network access. The component starts with instruction text, then replaces that text with either a loading message, a fetched fact, or an error message. It also reflects its current state with `state` and `data-state`, using values like `idle`, `loading`, `success`, and `error`. In-flight requests are canceled with `AbortController` if the component disconnects. The response is written with `textContent` instead of `innerHTML`, so remote API text is not treated as HTML. I also added a short `sessionStorage` cache for reloads, while still making the button fetch a fresh fact when clicked.

## Part 3: Astro SSG

I converted the site to Astro so repeated layout pieces would not need to be copied across every page. The shared document structure now lives in `src/layouts/BaseLayout.astro`, which handles the page shell, skip link, main content area, optional contact form, and footer. The shared head content is handled in `src/components/SiteHead.astro`, including metadata, favicon links, stylesheets, and scripts. I also split the header, footer, and contact form into their own components so they can be reused without duplicating the same HTML on every page. The site-wide data is kept in `src/data/site.js`, which stores things like the title, author, year, navigation, and social links. Project information is kept as an Astro content collection in `src/content/projects`, so the projects page, sitemap, homepage featured projects, and generated project detail pages can pull from the same source instead of repeating the same information in multiple files. The project detail pages are generated with `getCollection("projects")` and `getStaticPaths()` in `src/pages/projects/[slug].astro`. This lets the projects page and the individual project pages use the same source data, which reduces repeated markup and makes updates easier. The navigation state is handled in `SiteHeader.astro` with `aria-current="page"` so the current page is exposed properly. Astro was useful here because the portfolio has repeated layout, shared metadata, and developing project pages. I probably would not use a static site generator for a single one-off HTML page, but for this portfolio it makes the structure cleaner and easier to maintain, especially for adding new projects to the project page.
