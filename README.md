# Decide My Dinner

A standalone, buildless dinner picker: four questions, an 800 ms reveal, and three illustrated dinner ideas.

## Open it

Open `index.html` directly in a browser. Everything, including the artwork, is local; no network connection is required.

Or serve this directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Visit `http://127.0.0.1:8765`. There are no packages to install and no build step.

## Files

- `index.html`: accessible screen structure, landing page, quiz, transition and results.
- `styles.css`: responsive poster styling, focus states and reduced-motion support. Uses system fonts.
- `app.js`: 32 recipe records, quiz state, recommendation scoring and rendering.
- `bought.html`: static demo purchase confirmation; no checkout or payment.
- `assets/food-world-map.jpg`: compact generated food-map landing illustration.
- `assets/food-world-map.prompt.txt`: generation prompt and tool provenance.
- `assets/ramen-hero.jpg`: original illustration, retained for the first quiz question.
- `assets/recipes-asia.jpg`, `assets/recipes-europe-americas.jpg`: generated 4 × 4 illustration atlases, one tile per dish.
- `assets/favicon.svg`: a small code-drawn bowl icon.
- `tests/recommendations.test.mjs`: dependency-free development tests; Node is only needed to run these tests.

## Recommendation rules

Vegetarian is a hard filter. “Meat’s fine” allows both meat and vegetarian options. Of 32 dishes, 24 are vegetarian; each region contains eight dishes, six vegetarian.

Candidates receive:

- 16 points for the chosen region. Surprise Me gives no region points.
- 10 points for 30 minutes or less when the user is starving. No time points or exclusions when they have time.
- 3 points for matching spice.
- Between 0 and 2 random points to vary similarly relevant choices.

The three highest scores win. Rerolls subtract four points from the previous three picks; if the same set still wins, the highest-ranked fresh dish replaces the third pick. Each result contains three different dishes. Preferences stay unchanged on reroll. “Change my answers” returns to question one with previous selections retained; Back supports revisiting each question.

Diet is the only hard exclusion. Region, time and spice remain preferences. The current dataset has enough coverage that automated testing found all requested-region and quick-time recommendations matching those preferences. Cards explain any region/time/spice compromise if the dataset changes.

## Art and recipe links

Food illustrations were generated for this project using OpenAI image generation and converted to local JPEGs. No remotely hosted images, fonts, recipe APIs, people, faces or character illustrations are used. Illustrations are stylized serving suggestions, not photographs of tested recipes. Quiz emoji follow the requested copy.

The featured card’s **Buy this** link opens `bought.html`, a static “Hooray, you bought it!” demo confirmation. Both the CTA and confirmation explain that no payment or real order is involved. The page works without JavaScript, with a link back to start another dinner. There is no checkout integration.

All `recipeUrl` values remain deliberately `null`. The two alternative cards’ recipe buttons are disabled and labeled “Recipe link coming soon.” Add a verified matching HTTPS URL to enable an alternative recipe link; those links open in a new tab with `noopener noreferrer`.

Cooking times are approximate idea-level estimates. Some quick dishes assume convenience ingredients (canned beans or cooked rice); descriptions call those out. Vegetarian versions use vegetable stock and vegetarian cheese/pesto where relevant. Latin America is a broad discovery grouping that includes Tex-Mex dishes.

## Landing layout

The landing page uses a smaller food world map, larger 14–17 px value-proposition text, and arrow-based “Next” progression instead of decorative stars. Its layout scales to viewport height, with compact mobile and short-screen styles so the three-step footer stays in view on common screens. Content can still scroll on exceptionally small viewports or with enlarged text rather than being clipped. The 800 ms cooking screen is unchanged. The map is decorative food geography, not a precise atlas.

## Verification

Run:

```sh
node tests/recommendations.test.mjs
```

Verified during implementation:

- JavaScript parses and initializes against a minimal event-registration test stub.
- 40 preference combinations × 100 seeds × first picks and rerolls: **8,000 passing selections**.
- Exactly three unique recipes per result; no meat in vegetarian results.
- Every selected region and Surprise Me; Surprise Me can draw from all four regions.
- Both time settings; quick picks are all ≤30 minutes in this dataset, and no-rush picks include both quick and longer meals.
- Every reroll includes at least one new dish.
- All local image references exist; 32 unique IDs; eight dishes per region.
- Static server returned HTTP 200.
- Generated art visually reviewed: food only, no people or anime characters.
- No backend, database, authentication, external recipe API, MiniFast tracking, fake counters, build system or runtime dependencies.

The owner manually tested the current site locally at `localhost:3001` and accepted it. That session's individual checks and browser-console results were not recorded here. The automated tests above independently verify recommendation behavior.

Before deployment, manually check:

- Landing → four answers → short reveal → three cards, with no console errors.
- Back and Change My Answers retain and allow changing selections.
- Try Again keeps preferences and visibly changes at least one dish.
- Landing fits within common desktop and mobile viewport heights, including the bottom steps; no clipping or horizontal overflow.
- Buy This → demo success → Pick Another Dinner, plus browser Back.
- Layout at 320, 390, 768 and 1440 px; cards stack on mobile.
- Keyboard-only use and reduced-motion preference.
- Direct `file://` opening as well as static HTTP serving.

The project is local-only; it has no configured remote or deployment. External recipe links remain placeholders.
