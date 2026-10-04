// Development-only test; the site itself needs no Node or dependencies.
// Run with: node tests/recommendations.test.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const source = readFileSync(new URL('app.js', root), 'utf8');
const context = vm.createContext({ document: { querySelector: () => ({ addEventListener() {} }) } });
vm.runInContext(source, context); // Parse the whole app, including UI functions.
const { recipes, recommend, questions } = vm.runInContext('({ recipes, recommend, questions })', context);
assert.equal(recipes.length, 32);
assert.equal(recipes.filter(r => r.diet === 'vegetarian').length, 24);
assert.equal(new Set(recipes.map(r => r.id)).size, 32);
assert.equal(questions.length, 4);
for (const recipe of recipes) {
  assert.ok(existsSync(fileURLToPath(new URL(recipe.image, root))));
  assert.ok(recipe.minutes > 0 && recipe.description.length > 20);
  assert.ok(recipe.recipeUrl === null || recipe.recipeUrl.startsWith('https://'));
}
for (const region of ['east-asia', 'south-asia', 'europe', 'latin-america']) {
  assert.equal(recipes.filter(r => r.region === region).length, 8);
  assert.equal(recipes.filter(r => r.region === region && r.diet === 'vegetarian').length, 6);
}

function randomFor(seed) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
}
let combinations = 0;
let selections = 0;
const surpriseRegions = new Set();
let meatSeen = false;
let quickSeenWithNoRush = false;
let longSeenWithNoRush = false;
for (const diet of ['vegetarian', 'any']) {
  for (const spice of ['mild', 'hot']) {
    for (const region of ['east-asia', 'south-asia', 'europe', 'latin-america', 'surprise']) {
      for (const time of ['quick', 'any']) {
        combinations++;
        const preferences = { diet, spice, region, time };
        for (let seed = 1; seed <= 100; seed++) {
          const random = randomFor(seed);
          const picks = recommend(preferences, [], random);
          const previousIds = picks.map(r => r.id);
          const reroll = recommend(preferences, previousIds, random);
          assert.ok(reroll.some(r => !previousIds.includes(r.id)), 'Reroll must include a fresh dish');
          for (const selection of [picks, reroll]) {
            selections++;
            assert.equal(selection.length, 3);
            assert.equal(new Set(selection.map(r => r.id)).size, 3);
            if (diet === 'vegetarian') assert.ok(selection.every(r => r.diet === 'vegetarian'));
            if (region !== 'surprise') assert.ok(selection.every(r => r.region === region));
            if (time === 'quick') assert.ok(selection.every(r => r.minutes <= 30));
            if (region === 'surprise') selection.forEach(r => surpriseRegions.add(r.region));
            if (diet === 'any' && selection.some(r => r.diet === 'meat')) meatSeen = true;
            if (time === 'any') {
              if (selection.some(r => r.minutes <= 30)) quickSeenWithNoRush = true;
              if (selection.some(r => r.minutes > 30)) longSeenWithNoRush = true;
            }
          }
        }
      }
    }
  }
}
assert.equal(surpriseRegions.size, 4);
assert.ok(meatSeen && quickSeenWithNoRush && longSeenWithNoRush);
console.log(`PASS: ${combinations} preference combinations, ${selections} selections; vegetarian, all regions, surprise, both time options, unique picks and fresh rerolls.`);
