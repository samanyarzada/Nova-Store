# Nova Store — a professional React project

A responsive online store that combines everything you've learned in one real project.

## Run it

```bash
cd nova-store
npm install
npm run dev
```

Then open the address shown in the terminal (usually `http://localhost:5173`).

## Dark mode

Use the sun/moon button in the top-right corner of the navbar to switch themes.

How it works:

| Step | Where | What happens |
|------|-------|--------------|
| 1. Pick the starting theme | `index.html` (small inline script) | Before the page paints, it reads the saved choice from `localStorage` (`nova:theme`). If there is none, it follows the system setting (`prefers-color-scheme`). This prevents a white flash for dark-mode users. |
| 2. Keep the theme in React state | `src/hooks/useTheme.js` | A `useState` holds `"light"` or `"dark"`. An effect writes it to `<html data-theme="...">`. |
| 3. Remember the choice | `useTheme.js` | Clicking the button saves the choice. Until the user clicks, the site keeps following the system setting live. |
| 4. Change the colours | `src/styles.css` | All colours are CSS variables. `:root` holds the light values and `[data-theme="dark"]` overrides them. Components never hardcode a colour, so they switch automatically. |
| 5. Product tiles | `utils.js` (`gradientFor`) | The tile gradients use CSS variables for saturation and lightness, so they become deeper in dark mode instead of glaring. |

Things to know:

- `--primary-text` is a lighter indigo used for text and links in dark mode, so it stays readable on dark backgrounds. The solid `--primary` stays the same for buttons.
- The hero, the newsletter panel and the footer are dark or coloured blocks in both themes by design.
- `color-scheme: dark` makes native controls (select menus, checkboxes, scrollbars) dark too.
- The theme change animates for about 0.3 seconds. This is switched off for people who prefer reduced motion.

To add a new colour that changes with the theme, define it once in `:root` and again in `[data-theme="dark"]`, then use `var(--your-token)` in your CSS.

## Topics used, and where

| Topic | Where it's used |
|-------|-----------------|
| **useState** | Cart and toast message in `App.jsx`; search and sorting in `Products.jsx`; quantity in `ProductDetail.jsx`; mobile menu in `Navbar.jsx`; light/dark theme in `hooks/useTheme.js` |
| **props** | `ProductCard`, `Rating`, `Field`, `OrderSummary`, plus passing handlers (`onAdd`, `onRemove`, `onUpdateQty`) from `App` down to the pages |
| **routing** | `/`, `/products`, `/products/:id`, `/cart`, `/checkout`, `/success` and a 404 page, using `NavLink`, `useParams`, `useNavigate`, `useSearchParams` and `Navigate` |
| **form validation** | `Checkout.jsx` (name, phone, email, city, state, ZIP, address, terms) and the newsletter form in `Home.jsx` |

## Folder structure

```
src/
  App.jsx            main state + routes
  styles.css         all styling (light and dark design tokens)
  hooks/useTheme.js  dark mode state and persistence
  utils.js           price formatting, totals, helpers
  data/products.js   product data
  components/        Navbar, Footer, ProductCard, Rating, Field, OrderSummary, Toast
  pages/             Home, Products, ProductDetail, Cart, Checkout, Success, NotFound
```

## Ideas to practice

1. Save the cart in `localStorage` with `useEffect`.
2. Add login and sign-up pages (forms + validation).
3. Add a price-range slider to the products page.
4. Build a wishlist.
