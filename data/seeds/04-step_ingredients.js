const stiMaker = (step_id, ingredient_id, quantity) => {
  return {step_id, ingredient_id, quantity};
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('step_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('step_ingredients').insert([
        stiMaker(1,1,1),
        stiMaker(1,2,1),
        stiMaker(3,7,1),
        stiMaker(3,8,1),
        stiMaker(5,5,1),
        stiMaker(5,6,1),
        stiMaker(7,3,1),
        stiMaker(7,4,1)
      ]);
    });
};
