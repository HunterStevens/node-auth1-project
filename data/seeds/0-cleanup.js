const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return cleaner
  .clean(knex, {
    model:'delete',
    restartIdentity:true,
    ignoreTables:['knex-migrations','knex_migrations_lock']
  }).then(() => console.log('all tables truncated,ready to seed'));
};
