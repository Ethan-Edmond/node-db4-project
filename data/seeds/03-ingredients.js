exports.seed = function(knex) {
  return knex('ingredients').truncate()
    .then(function () {
      return knex('ingredients').insert(
        [
          'Tomato', "Bread", "Butter", "Bun", "Rhubarb", "Cake", "Peach", "Cobbler"
        ].map(ingredient_name => {
          return {
            ingredient_name
          };
        })
      );
    });
};
