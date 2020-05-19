
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
      profile_id: 2,
    },
    {
      username: "me",
      password: "changethepass",
      profile_id: 3,
    },
    {
      username: "nobody",
      password: "hasnorole",
      profile_id:4
    },
    {
      username: "notme",
      password: "hasnorole",
      profile_id:5
    }
  ];

  return knex('accounts').insert(users)
};
