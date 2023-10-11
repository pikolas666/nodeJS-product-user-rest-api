const casual = require('casual');
const TaskModel = require("../models/task");
const UserModel = require("../models/user");

const addProduct =  (req, res) => {
    const product = new TaskModel({ 
        title: req.body.title,
        price: Math.floor(Math.random()*100),
        description: casual.text,
        quantity: Math.floor(Math.random()*100),
        isOnSale: false 
    });
    const id = product._id.toString();
    product.id = id;
  
    product.save().then((dbResponse) => {
        return res
          .status(201)
          .json({ response: "product was added", product: dbResponse });
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        res.status(500).json({ response: "something went wrong" });
      });
  };

const getProducts  = async (req, res) => {
    try{
    await TaskModel.find().then((response) => {
        // console.log("response: ", response)
      return res.json(response);
    })
} catch(err)  {
        console.log("ERROR: ", err);
        console.log("ERROR: ", err);
        res.status(500).json({ response: "something went wrong" });
      };
  };  

const getProductById  = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await TaskModel.findOne({ id: id })
        // const response = await TaskModel.find();
        console.log(response)

        if (!response) {
        return res.status(404).json({ response: "Document not found" });
        }

        console.log("response: ", response);
        return res.json(response);
    } catch (err) {
        console.log("ERROR: ", err);
        return res.status(500).json({ response: "Something went wrong" });
    }
    }

const getProductsQty = (req, res) => {
    const number = parseInt(req.query.number) || 10; // Convert 'number' to an integer
    if (!isNaN(number)) {
        if (number >= 0) {
            const slicedProducts = products.slice(0, number); // Include 'number' in the slice range
            return res.json(slicedProducts);
        } else {
            return res.status(400).json({ error: 'Invalid negative number parameter' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid number parameter' });
    }
}


const SetProductToisOnSaleById = async (req, res) => {
    const id = req.params.id;

    try {
        // Find the product in the database
        const product = await TaskModel.findOne({ _id: id });

        if (!product) {
            // Product not found
            return res.status(404).json({ message: 'Product with the provided ID was not found' });
        }

        // Update the product
        product.isOnSale = true;

        // Save the changes
        await product.save();

        // Return the updated product
        res.json({ message: 'Product marked as for Sale', product });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
    // TaskModel[indexOfProduct] = {...TaskModel[indexOfProduct], ...req.body};

    const updateProduct = (req, res) => {
        TaskModel.updateOne({ _id: req.params.id }, { ...req.body })
          .then((response) => {
            if (response.nModified > 0) {
              // Product was successfully updated
              return res.status(200).json({ status: "Product was updated", response: response });
            } else {
              // No changes were made to the product
              return res.status(200).json({ status: "Product was not modified", response: response });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            return res.status(500).json({ status: "Error updating product", error: error });
          });
      };
      
      
   
    const DeleteProductById = async (req, res) => {
        const id = req.params.id;
    
        try {
            // Find the product by ID and remove it from the database
            const deletedProduct = await TaskModel.findByIdAndRemove(id);
    
            if (!deletedProduct) {
                // Product not found
                return res.status(404).json({ message: 'Product with the provided ID was not found' });
            }
    
            // Return the deleted product
            res.json({ message: `Product id: ${id} deleted`, deletedProduct });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
   // const SetProductToisOnSaleById = (req, res) => {
//     const id = req.params.id;
//     const indexOfProduct = products.findIndex((product)=> product.id === id);
//     if(indexOfProduct === -1){
//         return res.status(404).json({ response: "Product not found"})
//     } products[indexOfProduct].isOnSale = true;
//     //updating from req body
//     products[indexOfProduct] = {...products[indexOfProduct], ...req.body};



//     return res.json({ response: products[indexOfProduct] });

// }



const DeleteAllProducts = (req, res) => {
    products = [];
    return res.json({ response: products });

}

module.exports = {addProduct, getProducts, updateProduct, SetProductToisOnSaleById, getProductById, DeleteProductById, DeleteAllProducts, getProductsQty};