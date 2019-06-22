exports.up = function(knex, Promise) {  
    return Promise.all([
      knex.schema.createTable('list_items', function(table){
        table.increments('id');
        table.string('user_description');
        table.string('api_response');
        table.integer('category_id').references('id').inTable('categories');
        table.integer('list_id').references('id').inTable('users_lists');
      })
    ])
  };
  
  exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.dropTable('list_items')
    ])
  };