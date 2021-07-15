const express = require('express');

const server = express();

const db = require('../data/db-config');


server.use(express.json());

server.get('/api/recipes/:id', async (req, res, next) => {
  // SELECT
  // recipe_name, created_at, step_number, instructions, ingredient_name, quantity
  // FROM recipes
  // LEFT JOIN steps
  // ON recipes.recipe_id = steps.recipe_id
  // LEFT JOIN step_ingredients
  // ON steps.step_id = step_ingredients.step_id
  // LEFT JOIN ingredients
  // ON step_ingredients.ingredient_id = ingredients.ingredient_id
  // WHERE recipes.recipe_id = 2
  // ORDER BY step_number
  try {
    const queryRes = await db('recipes')
          .select(
            'recipes.*', 'steps.*', 'ingredient_name', 'quantity'
          )
          .leftJoin('steps', 'recipes.recipe_id', 'steps.recipe_id')
          .leftJoin('step_ingredients', 'steps.step_id', 'step_ingredients.step_id')
          .leftJoin('ingredients', 'step_ingredients.ingredient_id', 'ingredients.ingredient_id')
          .where({'recipes.recipe_id': req.params.id})
          .orderBy('step_number');
    const ripRecipe = queryRes.reduce((acc, curr) => {
      const currStep = null;
      return {
        ...acc,
        recipe_id: curr.recipe_id,
        recipe_name: curr.recipe_name,
        created_at: curr.created_at,
        steps: [...acc.steps, currStep]
      };
    }, {
      recipe_id: null,
      recipe_name: null,
      created_at: null,
      steps: []
    });

    res.json(ripRecipe);
  } catch (err) {
    next(err);
  }
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
