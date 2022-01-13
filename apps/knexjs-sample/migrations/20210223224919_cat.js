exports.up = function (knex) {
  return knex.schema.createTable('cat', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.interger('age').notNullable();
    table.string('breed', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cat');
};
