
exports.seed = function(knex) {
  const users =[
    {
      username: "groot",
      password: "Iamgroot!",
      profile_id: 1,
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      profile_id: 1,
    },
    {
      username: "me",
      password: "changethepass",
      profile_id: 2,
    },
    {
      username: "nobody",
      password: "hasnorole",
    },
    {
      username: "notme",
      password: "hasnorole",
    }
  ];

  return knex('accounts').insert(users)
};
