
exports.up = function(knex) {
  return knex.schema.createTable('profile', pro =>{
      pro.increments();
      pro.string('name', 255).notNullable().unique();
  })
  .createTable('accounts', account =>{
      account.increments();
      account.string('username').notNullable().unique();
      account.string('password',255).notNullable();

      account.integer('profile_id').unsigned()
      .references('profile.id')
      .onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile')
  .dropTableIfExists('accounts');
};
