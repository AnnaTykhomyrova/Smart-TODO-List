exports.seed = function(knex, Promise) {
    return knex('list_items').del()
      .then(function () {
      });
  };
  