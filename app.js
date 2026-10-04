"use strict";

// Illustrations are local 4 × 4 food atlases. recipeUrl stays null until a
// specific, matching recipe has been verified. No network requests are needed.
const recipeRows = [
  ["miso-ramen", "Spicy miso ramen", "vegetarian", "hot", "east-asia", 25, "A cozy miso broth, springy noodles, mushrooms and greens. Big slurp energy; use vegetable stock."],
  ["sesame-noodles", "Sesame noodles", "vegetarian", "mild", "east-asia", 20, "Silky noodles in a nutty sesame sauce, finished with crunchy cucumber and a shower of scallions."],
  ["fried-rice", "Veggie fried rice", "vegetarian", "mild", "east-asia", 20, "Yesterday’s cooked rice, today’s excellent decision. Golden egg, crisp vegetables and a splash of soy."],
  ["tofu-stir-fry", "Tofu & broccoli stir-fry", "vegetarian", "mild", "east-asia", 30, "Crisp-edged tofu and broccoli tossed in a glossy garlic-soy sauce. A weeknight wok win."],
  ["mapo-tofu", "Mushroom mapo tofu", "vegetarian", "hot", "east-asia", 30, "Soft tofu, savory mushrooms and a bold Sichuan-style sauce. All the tingle, with no meat or meat stock."],
  ["bibimbap", "Veggie bibimbap", "vegetarian", "hot", "east-asia", 40, "A rainbow of vegetables over rice, a golden egg and spicy gochujang. Mix it up and dig in."],
  ["teriyaki-chicken", "Teriyaki chicken bowl", "meat", "mild", "east-asia", 30, "Sticky, sweet-savory chicken over fluffy rice, with bright green broccoli for good measure."],
  ["kung-pao", "Kung pao chicken", "meat", "hot", "east-asia", 30, "Chili-kissed chicken, crunchy peanuts and peppers in a punchy sauce. Better clear some table space."],
  ["chana-masala", "Chana masala", "vegetarian", "hot", "south-asia", 30, "Canned chickpeas simmered in a tangy, spiced tomato sauce. Scoop it up with warm naan or rice."],
  ["red-lentil-dal", "Creamy red lentil dal", "vegetarian", "mild", "south-asia", 30, "Soft red lentils, warming cumin and a golden turmeric glow. Comfort food with a very small effort budget."],
  ["palak-paneer", "Palak paneer", "vegetarian", "mild", "south-asia", 40, "Tender paneer tucked into a silky spinach sauce. A very good excuse for an extra piece of naan."],
  ["veg-biryani", "Vegetable biryani", "vegetarian", "mild", "south-asia", 50, "Fragrant basmati layered with colorful vegetables and warm spices. Worth taking your time over."],
  ["paneer-jalfrezi", "Paneer jalfrezi", "vegetarian", "hot", "south-asia", 30, "Paneer, peppers and onions in a lively tomato-chili sauce. Bright, bold and made for scooping."],
  ["coconut-curry", "Coconut vegetable curry", "vegetarian", "mild", "south-asia", 30, "A gently spiced coconut sauce packed with vegetables. Creamy, cozy and ready for a bowl of rice."],
  ["butter-chicken", "Butter chicken", "meat", "mild", "south-asia", 50, "Tender chicken in a velvety tomato-butter sauce. A rich, gently spiced dinner worth lingering over."],
  ["chicken-biryani", "Chicken biryani", "meat", "hot", "south-asia", 65, "Spiced chicken and fragrant rice, layered and steamed together. The kitchen is about to smell incredible."],
  ["aglio-olio", "Spaghetti aglio e olio", "vegetarian", "mild", "europe", 20, "Golden garlic, olive oil and parsley tangled through spaghetti. Pantry staples, main-character dinner."],
  ["arrabbiata", "Penne arrabbiata", "vegetarian", "hot", "europe", 25, "Penne in a fiery garlic-tomato sauce. A little chili, a lot of personality; finish with fresh basil."],
  ["pesto-gnocchi", "Pesto gnocchi", "vegetarian", "mild", "europe", 20, "Pillowy gnocchi, basil pesto and juicy tomatoes. Choose vegetarian pesto and cheese for this green dream."],
  ["mushroom-risotto", "Mushroom risotto", "vegetarian", "mild", "europe", 45, "Slow-stirred rice with golden mushrooms and vegetable stock. Finish with a vegetarian hard cheese."],
  ["margherita", "Margherita pizza", "vegetarian", "mild", "europe", 40, "Crisp ready-made dough, bright tomato, vegetarian mozzarella and fresh basil. A classic for a reason."],
  ["white-bean-stew", "Spicy white bean stew", "vegetarian", "hot", "europe", 30, "Creamy canned beans in smoky tomato sauce with chili. Add crusty bread and call it a very good night."],
  ["bolognese", "Spaghetti bolognese", "meat", "mild", "europe", 60, "A rich, slow-simmered beef and tomato sauce wrapped around spaghetti. Proper stay-in comfort."],
  ["sausage-pasta", "Spicy sausage pasta", "meat", "hot", "europe", 30, "Sizzling sausage, punchy tomato and a little chili heat. All tangled up with your favorite pasta."],
  ["black-bean-tacos", "Black bean tacos", "vegetarian", "hot", "latin-america", 25, "Spiced black beans, sweet corn and avocado in warm tortillas. Taco night pretty much plans itself."],
  ["quesadillas", "Cheese quesadillas", "vegetarian", "mild", "latin-america", 20, "Crisp golden tortillas, stretchy vegetarian cheese and fresh pico de gallo. Simple, melty happiness."],
  ["mushroom-fajitas", "Mushroom fajitas", "vegetarian", "hot", "latin-america", 25, "Sizzling mushrooms and sweet peppers with smoky chili spices. Grab a tortilla and build your perfect bite."],
  ["burrito-bowl", "Black bean burrito bowl", "vegetarian", "mild", "latin-america", 30, "Rice, black beans, corn, avocado and a big squeeze of lime. All your favorite bits in one bowl."],
  ["enchiladas", "Black bean enchiladas", "vegetarian", "hot", "latin-america", 45, "Bean-filled tortillas baked under red chili sauce and vegetarian cheese. Golden edges are the best bit."],
  ["sweet-potato-tacos", "Sweet potato tacos", "vegetarian", "mild", "latin-america", 40, "Roasted sweet potato, crunchy slaw and a bright lime drizzle. Sweet, savory and seriously colorful."],
  ["chicken-fajitas", "Chicken fajitas", "meat", "mild", "latin-america", 30, "Juicy chicken strips, charred peppers and warm tortillas. A sizzling dinner everyone can make their own."],
  ["beef-chili", "Smoky beef chili", "meat", "hot", "latin-america", 55, "A Tex-Mex favorite: beef, beans and smoky chili simmered into a hearty bowl. Bring your biggest spoon."]
];

const recipes = recipeRows.map(([id, title, diet, spice, region, minutes, description], index) => ({
  id, title, diet, spice, region, minutes, description,
  image: index < 16 ? "assets/recipes-asia.jpg" : "assets/recipes-europe-americas.jpg",
  imageIndex: index % 16,
  recipeUrl: null
}));

const regions = { "east-asia": "East Asia", "south-asia": "South Asia", europe: "Europe", "latin-america": "Latin America", surprise: "Surprise me" };
const questions = [
  { key: "diet", kicker: "FIRST, THE NON-NEGOTIABLES.", title: "VEGGIE TONIGHT? 🥦", description: "Plants only, or a little bit of everything?", caption: "GOOD FOOD.<br>GOOD MOOD.", choices: [
    { value: "vegetarian", label: "HELL YES 🌱", note: "Keep it vegetarian." },
    { value: "any", label: "MEAT’S FINE 🍗", note: "Meat or veggies. I’m easy." }
  ] },
  { key: "spice", kicker: "LET’S TURN UP THE FLAVOR.", title: "HOW HOT ARE WE GOING? 🌶️", description: "A cozy little kick, or a full-on flavor firework?", caption: "A LITTLE<br>EXTRA HEAT.", choices: [
    { value: "mild", label: "KEEP IT CHILL 😌", note: "Easy on the chili, please." },
    { value: "hot", label: "BRING THE HEAT 🔥", note: "Let’s spice things up." }
  ] },
  { key: "region", kicker: "NEXT STOP: SOMETHING DELICIOUS.", title: "WHERE ARE WE GOING? 🌏", description: "Pick a craving. No passport required.", caption: "A WORLD<br>OF FLAVOR.", choices: [
    { value: "east-asia", label: "🥢 EAST ASIA" }, { value: "south-asia", label: "🍛 SOUTH ASIA" },
    { value: "europe", label: "🍝 EUROPE" }, { value: "latin-america", label: "🌮 LATIN AMERICA" },
    { value: "surprise", label: "🎲 SURPRISE ME" }
  ] },
  { key: "time", kicker: "ONE LAST THING. THEN WE EAT.", title: "HOW HUNGRY ARE YOU? ⏰", description: "Is this a quick fix or a take-your-time kind of night?", caption: "DINNER IS<br>SO CLOSE.", choices: [
    { value: "quick", label: "I’M STARVING ⚡", note: "Around 30 minutes or less." },
    { value: "any", label: "I’VE GOT TIME 👨‍🍳", note: "Longer recipes are welcome, too." }
  ] }
];

// Diet is the only exclusion. Region > time > spice; bounded jitter breaks
// ties. A small repeat penalty gives rerolls variety without losing relevance.
function recommend(preferences, previousIds = [], random = Math.random) {
  const ranked = recipes.filter(recipe => preferences.diet !== "vegetarian" || recipe.diet === "vegetarian")
    .map(recipe => ({ recipe, score:
      (preferences.region !== "surprise" && recipe.region === preferences.region ? 16 : 0) +
      (preferences.time === "quick" && recipe.minutes <= 30 ? 10 : 0) +
      (recipe.spice === preferences.spice ? 3 : 0) + random() * 2 -
      (previousIds.includes(recipe.id) ? 4 : 0)
    }))
    .sort((a, b) => b.score - a.score);
  const picks = ranked.slice(0, 3).map(candidate => candidate.recipe);
  // When the strongest three still repeat, use the highest-ranked fresh dish.
  if (previousIds.length && picks.every(recipe => previousIds.includes(recipe.id))) {
    const fresh = ranked.find(candidate => !previousIds.includes(candidate.recipe.id));
    if (fresh) picks[2] = fresh.recipe;
  }
  return picks;
}

const state = { step: 0, answers: {}, picks: [], busy: false, screen: "landing" };
const $ = selector => document.querySelector(selector);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => { screen.hidden = screen.id !== id; });
  state.screen = id;
  document.body.dataset.screen = id;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function focusHeading(selector) { $(selector).focus({ preventScroll: true }); }

function renderQuestion() {
  const question = questions[state.step];
  showScreen("quiz");
  $("#quiz").dataset.step = state.step;
  $("#question-kicker").textContent = question.kicker;
  $("#question-title").textContent = question.title;
  $("#question-description").textContent = question.description;
  $("#step-count").textContent = `0${state.step + 1} / 04`;
  $("#progress").setAttribute("aria-label", `Question ${state.step + 1} of 4`);
  $("#progress").innerHTML = questions.map((_, index) => `<span class="${index < state.step ? "complete" : index === state.step ? "current" : ""}" aria-hidden="true"></span>`).join("");
  $("#choices").className = `choices${question.key === "region" ? " region-choices" : ""}`;
  $("#choices").replaceChildren(...question.choices.map(choice => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.value = choice.value;
    button.setAttribute("aria-pressed", String(state.answers[question.key] === choice.value));
    button.innerHTML = `<span class="choice-label">${choice.label}${choice.note ? `<span class="choice-note">${choice.note}</span>` : ""}</span><span class="choice-arrow" aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => answer(question.key, choice.value));
    return button;
  }));
  $("#quiz-art-caption").innerHTML = question.caption;
  const illustration = [null, recipes[12], recipes[24], recipes[17]][state.step];
  const art = $(".quiz-food");
  art.classList.toggle("sheet", Boolean(illustration));
  $("#quiz-food-image").src = illustration ? illustration.image : "assets/ramen-hero.jpg";
  if (illustration) setTile(art, illustration.imageIndex);
  // Replay a short entrance animation; controls are already ready to use.
  const copy = $(".question-copy");
  copy.style.animation = "none";
  void copy.offsetWidth;
  copy.style.animation = "";
  focusHeading("#question-title");
}

function answer(key, value) {
  if (state.busy || state.screen !== "quiz" || questions[state.step].key !== key) return;
  state.answers[key] = value;
  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
  } else revealResults(false);
}

function setTile(element, index) {
  element.style.setProperty("--x", `${-(index % 4) * 100}%`);
  element.style.setProperty("--y", `${-Math.floor(index / 4) * 100}%`);
}

function matchNote(recipe) {
  const notes = [];
  if (state.answers.region !== "surprise") notes.push(recipe.region === state.answers.region ? "Your flavor destination" : "A little beyond your chosen region");
  if (state.answers.time === "quick") notes.push(recipe.minutes <= 30 ? "Quick enough for tonight" : "A little longer, worth the wait");
  if (recipe.spice !== state.answers.spice) notes.push(state.answers.spice === "mild" ? "Spicier than your preference — ease up on chili" : "A milder pick — add chili to taste");
  return notes.join(" · ");
}

function recipeCard(recipe, featured = false) {
  const article = document.createElement("article");
  article.className = `recipe-card${featured ? " featured" : ""}`;
  article.dataset.recipeId = recipe.id;
  article.dataset.diet = recipe.diet;
  const note = matchNote(recipe);
  article.innerHTML = `<div class="recipe-art"><img src="${recipe.image}" alt="Food illustration of ${recipe.title.toLowerCase()}" width="1254" height="1254"></div><div class="recipe-info">${featured ? '<span class="pick-label">✦ OUR PICK ✦</span>' : ""}<span class="recipe-region">${regions[recipe.region].toUpperCase()}</span><h3>${recipe.title}</h3><div class="recipe-meta"><span>◷ ~${recipe.minutes} min</span><span>${recipe.diet === "vegetarian" ? "🌱 Veg" : "🍗 Meat"}</span><span>${recipe.spice === "hot" ? "🔥 Spicy" : "◌ Mild"}</span></div><p class="recipe-description">${recipe.description}</p>${note ? `<p class="match-note">${note}</p>` : ""}<div class="recipe-action"></div></div>`;
  setTile(article.querySelector(".recipe-art"), recipe.imageIndex);
  const action = article.querySelector(".recipe-action");
  const validUrl = recipe.recipeUrl && /^https:\/\//.test(recipe.recipeUrl);
  const link = document.createElement(featured || validUrl ? "a" : "button");
  link.className = "button recipe-link";
  link.textContent = featured ? "BUY THIS →" : "VIEW RECIPE →";
  if (featured) {
    link.href = "./bought.html";
    link.setAttribute("aria-label", `Buy ${recipe.title} (demo purchase)`);
    link.setAttribute("aria-describedby", `link-status-${recipe.id}`);
  } else if (validUrl) {
    link.href = recipe.recipeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `View recipe for ${recipe.title} (opens in a new tab)`);
  } else {
    link.disabled = true;
    link.setAttribute("aria-describedby", `link-status-${recipe.id}`);
  }
  action.append(link);
  if (featured || !validUrl) {
    const status = document.createElement("p");
    status.id = `link-status-${recipe.id}`;
    status.className = "link-status";
    status.textContent = featured ? "Just a demo. No payment needed." : "Recipe link coming soon";
    action.append(status);
  }
  return article;
}

function renderResults() {
  $("#featured").replaceChildren(recipeCard(state.picks[0], true));
  $("#alternatives").replaceChildren(...state.picks.slice(1).map(recipe => recipeCard(recipe)));
  const summary = [state.answers.diet === "vegetarian" ? "🌱 Vegetarian" : "🍗 Meat & veggies", state.answers.spice === "hot" ? "🔥 Bring the heat" : "◌ Keep it chill", state.answers.region === "surprise" ? "🎲 Any destination" : regions[state.answers.region], state.answers.time === "quick" ? "◷ Around 30 min" : "◷ No rush"];
  $("#preference-summary").replaceChildren(...summary.map(text => { const span = document.createElement("span"); span.textContent = text; return span; }));
  showScreen("results");
  focusHeading("#results-title");
}

function revealResults(reroll) {
  if (state.busy) return;
  state.busy = true;
  const previousIds = reroll ? state.picks.map(recipe => recipe.id) : [];
  state.picks = recommend(state.answers, previousIds);
  showScreen("cooking");
  focusHeading("#cooking-title");
  window.setTimeout(() => { state.busy = false; renderResults(); }, 800);
}

$("#start").addEventListener("click", () => { state.step = 0; renderQuestion(); });
$("#back").addEventListener("click", () => {
  if (state.step > 0) { state.step -= 1; renderQuestion(); }
  else { showScreen("landing"); $("#start").focus({ preventScroll: true }); }
});
$("#reroll").addEventListener("click", () => revealResults(true));
$("#change-answers").addEventListener("click", () => { state.step = 0; renderQuestion(); });
