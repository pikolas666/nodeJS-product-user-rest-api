import { addToCart, deleteProduct } from "./functions.js";
const userID = '651fe2e6176dd80bc3988c42';
const usersURL = 'http://127.0.0.1:3000/';
const listUsers = 'users';
const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'products';
const productId = localStorage.getItem('productId');

const productWrapper = document.getElementById('product-wrapper');

 
async function getProductCard(productId) {
    console.log(productId)
    try {
      const response = await fetch(productsURL+listProducts+"/"+productId);
      const product = await response.json();
      console.log(product)
      return product
      
    } catch (err){
      console.log("error", err)
    }
    }
async function updateProductInfo(productId) {
  const productTitle = document.getElementById('titleInput').value;
  const productDescription = document.getElementById('descriptionInput').value;
  const productQuantity = document.getElementById('quantityInput').value;
  const productPrice = document.getElementById('priceInput').value;
  const product = {
    title: productTitle,
    price: productPrice,
    description: productDescription,
    quantity: productQuantity,
    
    };

    if (!productTitle || !productDescription || !productQuantity || !productPrice) {
      console.error('Please fill in all fields');
      // Optionally, you can display an error message to the user
      return;
    }
  await fetch(productsURL+listProducts+"/"+productId, {
    method: 'PUT', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })

.then((response) => {
    if (response.ok) {
        
        console.log(`${productId} Product info updated`);
        // You might also want to remove the product from the UI
    } else {
        // Error occurred while deleting the product
        console.error('Error updating product info');
    }
})
.catch((error) => {
    // Handle network errors or other errors
    console.error('Network error:', error);
});
}


    function updateCardUI(product) {
        const cardElement = document.createElement('div');
        cardElement.setAttribute('class', 'product-card');
        const id = document.createElement('div');
        id.textContent = "Id: " + product._id;
        const title = document.createElement('div');
        title.textContent = "Title: "+ product.title;
        const description = document.createElement('div');
        description.textContent = "Description: "+ product.description;
        const quantity = document.createElement('div');
        quantity.textContent = "Quantity: "+ product.quantity;
        const price = document.createElement('div');
        price.textContent = "Price: "+ product.price + "$";
        const titleInput = document.createElement('input');
        titleInput.placeholder = 'title';
        titleInput.setAttribute('id',"titleInput");
        const descriptionInput = document.createElement('input');
        descriptionInput.placeholder = 'description';
        descriptionInput.setAttribute('id',"descriptionInput");
        const quantityInput = document.createElement('input');
        quantityInput.placeholder = 'quantity';
        quantityInput.setAttribute('id',"quantityInput");
        const priceInput = document.createElement('input');
        priceInput.placeholder = 'price';
        priceInput.setAttribute('id',"priceInput");
        const updateInfo = document.createElement('button');
        updateInfo.textContent = "Update info";
        updateInfo.addEventListener('click', ()=>{
          updateProductInfo(product._id)
          // setTimeout(() => {
          //   location.reload();}, 1000)
        })
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener('click',()=>{
            addToCart(product._id);
        })
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete product";
        deleteBtn.addEventListener('click', () => {
            // Call deleteProduct with the product ID when the button is clicked
            deleteProduct(product._id);
            setTimeout(() => {
            productWrapper.innerHTML = '';
            location.href = './index.html';
        }, 1000);
        
        });
        cardElement.append(id,title,description,quantity,price,titleInput,descriptionInput,quantityInput, priceInput,updateInfo, deleteBtn, addToCartBtn);
      

        productWrapper.append(cardElement);
    }
  
    async function init() {
        const product = await getProductCard(productId);
        if (product) {
          updateCardUI(product);
        }
      }
      
      init();
            