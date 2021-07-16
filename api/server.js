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

    const returnVal = {
      recipe_id: null,
      recipe_name: null,
      created_at: null,
      steps: []
    };

    const getSingle = (keyString) => queryRes.find(elem => elem[keyString])[keyString];
    returnVal.recipe_id = getSingle("recipe_id");
    returnVal.recipe_name = getSingle("recipe_name");
    returnVal.created_at = getSingle("created_at");

    const formatIngredients = ({ingredient_name, quantity}) => {
      return ingredient_name !== null ?
        { ingredient_name, quantity } :
      null;
    };

    const stepSet = new Set(queryRes.map(elem => elem.step_id));
    stepSet.forEach(step_id => {

      const found = queryRes.find(elem => elem.step_id === step_id);

      const stepRows = queryRes
            .filter(elem => elem.step_id === step_id)
            .map(formatIngredients)
            .filter(elem => elem);

      returnVal.steps.push({
        step_id,
        step_number: found.step_number,
        instructions: found.instructions,
        ingredients: stepRows
      });

    });

    res.json(returnVal);
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
