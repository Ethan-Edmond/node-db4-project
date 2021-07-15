const stepMaker = (step_number, instructions, recipe_id) => {
  return {step_number, instructions, recipe_id};
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        stepMaker(1, "Put tomato on bread", 1),
        stepMaker(2, "Close bread", 1),
        stepMaker(1, "Put peach in cobbler", 2),
        stepMaker(2, "Close cobbler", 2),
        stepMaker(1, "Put rhubarb in cake", 3),
        stepMaker(2, "Close cake", 3),
        stepMaker(1, "Put butter on bun", 4),
        stepMaker(2, "Close bun", 4)
      ]);
    });
};
