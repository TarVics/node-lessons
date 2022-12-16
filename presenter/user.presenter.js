const normalize = (user) => {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const normalizeMany = (users) => {
  return users.map(user => normalize(user));
}

// const cutFields = (user) => {
//   user = user.toJSON();
//
//   const arr = [
//       'password',
//       '__v',
//       '_id'
//   ];
//
//   arr.forEach(name => delete user[name]);
//   return user;
// }

module.exports = {
  normalize,
  normalizeMany,
}
