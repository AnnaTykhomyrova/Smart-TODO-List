exports.up = function(knex, Promise) {  
    return Promise.all([
      knex.schema.createTable('users_lists', function(table){
        table.increments('id');
        table 
        .foreign('id')
        .references('id')
        .inTable('users');
      })
    ])
  };
  
  exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.dropTable('users_lists')
    ])
  };