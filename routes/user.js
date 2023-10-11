const express = require("express");
const router = express.Router();
const {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_CART,
  EMPTY_CART,
  DELETE_USER,
  UPDATE_USER,
} = require("../controller/user");

router.get("/users", GET_ALL_USERS);

router.get("/users/:id", GET_USER_BY_ID);

router.get("/users/:id/cart", GET_USER_BY_ID_WITH_CART);

router.post("/users", ADD_USER);


//add to cart:
router.put("/users/:id", UPDATE_USER);

router.delete("/users/:id", DELETE_USER);

router.put("/users/:id/empty", EMPTY_CART);





module.exports = router;