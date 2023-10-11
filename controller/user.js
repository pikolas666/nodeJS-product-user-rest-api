const { ObjectId } = require("mongodb");

const UserModel = require("../models/user");

const GET_ALL_USERS = async (req, res) => {
  try {
    const response = await UserModel.find();
    return res.status(200).json({ users: response });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ response: "something went wrong" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const response = await UserModel.findById(req.params.id);
    return res.status(200).json({ user: response });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ response: "something went wrong" });
  }
};

const GET_USER_BY_ID_WITH_CART = async (req, res) => {
  try {
    const response = await UserModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "userCartProducts",
          foreignField: "id",
          as: "user_cart_data",
        },
      },
      { $match: { _id: new ObjectId(req.params.id) } },
    ]).exec();

    console.log(response);
    return res.status(200).json({ user: response });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ response: "something went wrong" });
  }
};

const UPDATE_USER = async (req, res) => {
  try {
    const response = await UserModel.updateOne(
      { _id: '651fe2e6176dd80bc3988c42' },
      { ...req.body }
    );
    return res.status(200).json({ status: "User was updated", response });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ response: "something went wrong" });
  }
};

const EMPTY_CART = async (req, res) => {
  try {
    const result = await UserModel.updateOne(
      { _id: '651fe2e6176dd80bc3988c42' },
      { $set: { userCartProducts: [] }
    });

    if (result.nModified > 0) {
      console.log('Cleared the "userCartProducts" array for user "Gintas"');
      res.status(200).json({ message: 'Cart cleared successfully' });
    } else {
      console.log('No changes made to the "userCartProducts" array.');
      res.status(200).json({ message: 'Cart was already empty' });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const ADD_USER = async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    userCartProducts: [],
  });

  try {
    const dbResponse = await user.save();
    return res.status(201).json({ response: "User was added", user: dbResponse });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ response: "something went wrong" });
  }
};


const DELETE_USER = async (req, res)=>{
  const id = req.params.id;
  try{
   
    const deletedUser = await UserModel.findByIdAndRemove(id);
    
    if (!deletedUser) {
        // Product not found
        return res.status(404).json({ message: 'User with the provided ID was not found' });
    }

    // Return the deleted product
    res.json({ message: `User id: ${id} deleted`, deletedUser });

  } catch (err){
    console.log("error: ", err);
    return  res.status(500).json({ response: "something went wrong" });
  }
}

module.exports = {
  GET_ALL_USERS,
  ADD_USER,
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_CART,
  UPDATE_USER,
  DELETE_USER,
  EMPTY_CART
};