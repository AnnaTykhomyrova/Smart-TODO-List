exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Bob', password:'AL03'}),
        knex('users').insert({id: 2, username: 'Rachel', password:'D0G'}),
        knex('users').insert({id: 3, username: 'Ron', password:'G0D'})
      ]);
    });
};
