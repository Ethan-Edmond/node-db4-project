
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert(
        [
          'tomato sandwich', 'peach cobbler', 'Rhubarb Cake', 'butter'
        ].map(recipe_name => {
          return {
            recipe_name
          };
        })
      );
    });
};
