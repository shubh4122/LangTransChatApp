const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  searchUsers,
  addFriend
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.post("/friends/:userId/:friendId", addFriend);
router.route("/search/:identifier/:self").get(searchUsers);
//this identifier can either be a name or an email. Remove self from results
//-------- Note: we can use protect instead of passing self as param --------

module.exports = router;
