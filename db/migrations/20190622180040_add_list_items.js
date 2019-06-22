
exports.up = function(knex, Promise) {
    return Promise.all([
        knex('list_items')
        .insert([{user_description: 'Harry Potter'}, {user_description: 'Pizza Pizza'}, {user_description: 'Mac Book'}, {user_description: 'Moby Dick'}])
    ]);
};

exports.down = function(knex, Promise) {
    return knex('list_items').del()
    .then(function () {
    });
};
