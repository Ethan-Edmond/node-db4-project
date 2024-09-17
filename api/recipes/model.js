const db = require('../../data/db-config');

exports.getRecipeById = async (id) => {
  const queryRes = await db('recipes')
    .select(
      'recipes.*', 'steps.*', 'ingredients.*', 'quantity'
    )
    .leftJoin('steps', 'recipes.recipe_id', 'steps.recipe_id')
    .leftJoin('step_ingredients', 'steps.step_id', 'step_ingredients.step_id')
    .leftJoin('ingredients', 'step_ingredients.ingredient_id', 'ingredients.ingredient_id')
    .where({'recipes.recipe_id': id})
    .orderBy('step_number');

  const firstOrNone = queryRes.find(elem => elem);
  return {
    recipe_id: firstOrNone.recipe_id,
    recipe_name: firstOrNone.recipe_name,
    created_at: firstOrNone.created_at,
    steps: queryRes.reduceRight((acc, curr, index) => {
      const ingredient = {
        ingredient_id: curr.ingredient_id,
        ingredient_name: curr.ingredient_name,
        quantity: curr.quantity
      };

      if (acc.find(elem => elem.step_id === curr.step_id)) {
        curr.ingredient_id !== null && acc[0].ingredients.unshift(ingredient);
        return acc;
      } else {
        return [{
          step_id: curr.step_id,
          step_number: curr.step_number,
          instructions: curr.instructions,
          ingredients: curr.ingredient_id !== null ? [ingredient] : []
        }, ...acc];
      }
    }, [])
  };
};
