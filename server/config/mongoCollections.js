const dbConnection = require("./mongoConnection");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    if (collection == "restrooms") {
      _col.createIndex({ loc: "2dsphere" });
    }

    return _col;
  };
};

module.exports = {
  users: getCollectionFn("users"),
  restrooms: getCollectionFn("restrooms"),
  reviews: getCollectionFn("reviews"),
  reports: getCollectionFn("reports"),
};
