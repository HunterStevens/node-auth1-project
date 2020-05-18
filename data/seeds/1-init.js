
exports.seed = function(knex) {
  const profiles = [
    {name:'admin'},
    {name:'account'}
  ];
  return knex('profile').insert(profiles);
};
