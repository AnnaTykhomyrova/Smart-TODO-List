
exports.up = function(knex, Promise) {
        return Promise.all([
            knex('categories')
            .returning('id')
            .insert([{name: 'books'}, {name: 'films'}, {name: 'restaurants'}, {name: 'products'}, {name: 'other'}])
        ]);
      };
      
      exports.down = function(knex, Promise) {  
        return Promise.all([
            knex('categories').del()
        ])
    }
    
