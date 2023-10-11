import { addToCart, deleteProduct } from "./functions.js";
const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'products';
const usersURL = 'http://127.0.0.1:3000/';
const listUsers = 'users'
const userID = '651fe2e6176dd80bc3988c42'
const productWrapper = document.getElementById('product-wrapper');


async function addProduct() {
  const productTitle = document.getElementById('title').value;

  const product = {
    title: productTitle,
  };
  // inputValidation()


  try {
    const response = await fetch(productsURL + listProducts, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      console.log("Success, product added!");
      
    } else {
      console.log("Failed to add product");
    }
  } catch (err) {
    showMessage("Failed to add product");
  }
  displayData()
}


async function fetchData() {
  try {
    const response = await fetch(productsURL+listProducts);
    const productsArray = await response.json();
    return productsArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}





async function displayData() {
  const dataToDisplay = await fetchData();
  console.log(dataToDisplay)
  productWrapper.innerHTML = '';
  
  dataToDisplay.forEach(product => {
    const card = document.createElement('a');
    card.setAttribute('class', "card");
    card.href = "./product.html";
    card.addEventListener('click', () => {
      console.log("hit")
      localStorage.setItem('productId', product._id);
    });
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
    card.append(id,title,description,quantity,price);
    // card.innerHTML = `${id} ${title} ${description} ${quantity} ${price}`;

    productWrapper.append(card);
  });

  
}

displayData();

const addBtn = document.getElementById("add-product");
addBtn.addEventListener('click', addProduct)