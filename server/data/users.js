const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const users = mongoCollections.users;
const restrooms = mongoCollections.restrooms;
const { hashPassword, comparePassword } = require("../utils/users");
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
};

const getUserById = async (id) => {
  if (!id) {
    throw `You must provide an id to search for`;
  }
  checkString(id);
  if (!ObjectId.isValid(id)) {
    throw `id is not a valid ObjectId`;
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw "Error: No user with that id";
  const reviews = await getUserReviews(user._id);
  const reports = await getUserReports(user._id);
  return {
    user,
    reviews,
    reports,
  };
};

const getUserReviews = async (userId) => {
  const restroomsCollection = await restrooms();
  return await restroomsCollection
    .aggregate([
      {
        $match: {
          reviews: {
            $elemMatch: {
              userId: `${userId}`,
            },
          },
        },
      },
      {
        $unwind: {
          path: "$reviews",
          includeArrayIndex: "idx",
        },
      },
      {
        $replaceWith: {
          review: "$reviews",
        },
      },
    ])
    .toArray();
  console.log("aggreate data ", data);
};

const getUserReports = async (userId) => {
  const restroomsCollection = await restrooms();
  return await restroomsCollection
    .aggregate([
      {
        $match: {
          reports: {
            $elemMatch: {
              userId: `${userId}`,
            },
          },
        },
      },
      {
        $unwind: {
          path: "$reports",
          includeArrayIndex: "idx",
        },
      },
      {
        $replaceWith: {
          report: "$reports",
        },
      },
    ])
    .toArray();
};

const getUserByEmail = async (input) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ email: input });
  return user;
};

const userAuth = async (emailInput, userPass) => {
  const { _id, email, hashedPassword, fullName } = await getUserByEmail(
    emailInput
  );
  const doPasswordsMatch = await comparePassword(userPass, hashedPassword);

  if (!doPasswordsMatch) throw new Error("Invalid username or password");

  const token = jwt.sign(
    {
      user: {
        _id,
        email,
      },
    },
    "CS546"
  );
  return {
    user: { _id, fullName, email },
    token,
  };
};

const login = async ({ email, password }) => {
  return await userAuth(email, password);
};

const createUser = async ({ fullName, city, state, email, password }) => {
  const reviewIds = [],
    reportIds = [];
  email = email.toLowerCase();
  const userCollection = await users();
  const userFound = await getUserByEmail(email);
  if (!!userFound) {
    throw "User already exists";
  }

  const hashedPassword = await hashPassword(password);
  const insertInfo = await userCollection.insertOne({
    fullName,
    city,
    state,
    email,
    hashedPassword,
    reviewIds,
    reportIds,
  });
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add user";

  await getUserById(insertInfo.insertedId.toString());

  const newUser = await userAuth(email, password);
  return newUser;
};

const updateUser = async (id, updateInfo) => {
  if (!id) {
    throw `id is missing, should input the id your want to update`;
  }
  if (!updateInfo) {
    return await this.getUserById(id);
  }
  checkString(id);
  const userCollection = await users();
  let updatedUserData = {};
  let gotten = await this.getUserById(id);
  if (JSON.stringify(updateInfo) == JSON.stringify(gotten)) {
    return await this.getUserById(id);
  }

  if (updateInfo.firstName) {
    updatedUserData.fisrtName = updateInfo.firstName;
  }
  if (updateInfo.lastName) {
    updatedUserData.lastName = updateInfo.lastName;
  }
  if (updateInfo.city) {
    updatedUserData.city = updateInfo.city;
  }
  if (updateInfo.state) {
    updatedUserData.state = updateInfo.state;
  }
  if (updateInfo.zipCode) {
    updatedUserData.zipCode = updateInfo.zipCode;
  }
  if (updateInfo.email) {
    updatedUserData.email = updateInfo.email;
  }
  if (updateInfo.hashedPassword) {
    updatedUserData.hashedPassword = updateInfo.hashedPassword;
  }

  if (updatedUserData == {}) {
    return await this.getUserById(id);
  }
  const updateUserInfo = await userCollection.updateOne(
    { _id: id },
    { $set: updatedUserData }
  );
  if (updateUserInfo.modifiedCount === 0 && updateUserInfo.deletedCount === 0) {
    throw `could not update user`;
  }
  return await this.getUserById(id);
};

function checkString(input) {
  if (typeof input != "string" || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

const verifyJwtToken = async (req, res, next) => {
  if (!(req.url.includes("login") || req.url.includes("logout"))) {
    try {
      const { token } = req.cookies;
      if (!token) throw new Error("no token found, please login.");

      try {
        const { user } = jwt.verify(token, "CS546");
        const { user: existingUser } = await getUserById(user._id);
        if (user.email !== existingUser.email)
          throw new Error("Not the same user");
        req.user = user;
        next();
      } catch (e) {
        res.clearCookie("token");
        res.status(401).json({ error: "Invalid token" });
      }
    } catch (e) {
      res.status(401).json({ error: "No valid token found" });
    }
  } else {
    next();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
  login,
  verifyJwtToken,
};
