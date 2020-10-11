const sortByCreation = items =>
  items.slice().sort((a, b) => a.createdAt - b.createdAt);

module.exports = {
  sortByCreation
};
