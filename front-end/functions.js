const userID = '651fe2e6176dd80bc3988c42';
const usersURL = 'http://127.0.0.1:3000/';
const listUsers = 'users';
const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'products';
const productId = localStorage.getItem('productId');
export async function addToCart(productId) {
    try {
      // Prepare the update object for the database
      const update = {
        $push: { userCartProducts: productId }, // Add the productId to the array
      };
      console.log(update)
      // Make a PUT request to update the user's cart in the database
      const response = await fetch(`${usersURL}${listUsers}/${userID}`, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
      });
  
      if (response.ok) {
        console.log("Success, product added to Cart!");
      } else {
        console.log("Failed to add product to Cart");
      }
    } catch (err) {
      console.error("Failed to add product to Cart:", err);
    }
  }
  
  export function deleteProduct(productId) {
    // Send a DELETE request to your server to delete the product
    fetch(`${productsURL}${listProducts}/${productId}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
            // Product deleted successfully, you can handle this as needed
            console.log(`Product ${productId} deleted successfully`);
            // You might also want to remove the product from the UI
        } else {
            // Error occurred while deleting the product
            console.error('Error deleting product');
        }
    })
    .catch((error) => {
        // Handle network errors or other errors
        console.error('Network error:', error);
    });
  }