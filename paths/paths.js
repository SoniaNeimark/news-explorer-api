const usersCollection = '/users';
const articlesCollection = '/articles';
const article = `${articlesCollection}/:id`;
const user = `${usersCollection}/:id`;
const ownerProfile = `${usersCollection}/me`;
module.exports = {
  usersCollection,
  articlesCollection,
  article,
  user,
  ownerProfile,
};
