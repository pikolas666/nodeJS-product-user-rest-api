const usersURL = 'http://127.0.0.1:3000/';
const listUsers = 'users'
const userID = '651fe2e6176dd80bc3988c42';
const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'products';
const userWrapper = document.getElementById('user-wrapper');


async function addUser() {
  const userName = document.getElementById('user-name').value;
  const userEmail = document.getElementById('user-email').value;
  const user = {
    name: userName,
    email: userEmail
  };
  // inputValidation()


  try {
    const response = await fetch(usersURL + listUsers, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      console.log("Success, user added!");
      
    } else {
      console.log("Failed to add user");
    }
  } catch (err) {
    showMessage("Failed to add user");
  }
  displayData()
}


async function fetchData() {
  try {
    const response = await fetch(usersURL + listUsers);
    const usersArray = await response.json();
    console.log(usersArray)
    return usersArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function fetchCartData() {
  try {
    const response = await fetch(usersURL+listUsers+ "/" +userID  + "/cart");
    const cartArray = await response.json();
    console.log(cartArray)
    return cartArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


function deleteUser(userId) {
  // Send a DELETE request to your server to delete the product
  fetch(`${usersURL}${listUsers}/${userId}`, {
      method: 'DELETE',
  })
  .then((response) => {
      if (response.ok) {
          // Product deleted successfully, you can handle this as needed
          console.log(`User ${userId} deleted successfully`);
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

async function emptyShoppingCart() {
  fetch(`${usersURL}${listUsers}/${userID}/empty`, {
    method: 'PUT',
})
.then((response) => {
    if (response.ok) {
        // Product deleted successfully, you can handle this as needed
        console.log(`User ${userID} removed products from cart successfully`);
        // You might also want to remove the product from the UI
    } else {
        // Error occurred while deleting the product
        console.error('Error removing product from cart');
    }
})
.catch((error) => {
    // Handle network errors or other errors
    console.error('Network error:', error);
});
}



async function displayData() {
  const dataToDisplay = await fetchData();
  const cartDatatoDisplay = await fetchCartData();
  const productCartArray = cartDatatoDisplay.user[0].user_cart_data
  console.log(cartDatatoDisplay.user[0].user_cart_data);
  //kodel abjekta meta jei neirasau users.
  console.log(dataToDisplay.users)
  userWrapper.innerHTML = '';
  
  dataToDisplay.users.forEach(user => {
    const card = document.createElement('div');
    card.setAttribute('class', "user-card")
    const username = document.createElement('div');
    username.textContent = "Username: " + user.name;
    const email = document.createElement('div');
    email.textContent = "Email: "+ user.email;
    const userCartProducts = document.createElement('div');
    userCartProducts.setAttribute("class", "user-cart");
    userCartProducts.textContent = "userCartProducts: "+ user.userCartProducts;
    const cartContainer = document.createElement('div');
    // const shoppingCart = document.createElement('button');
    // shoppingCart.textContent = "Shopping cart";
    productCartArray.forEach((obj)=>{
      const userCartProcuctData = document.createElement('div');
      userCartProcuctData.innerHTML = `<div class="cart-product-data">Title:${obj.title}, Price: ${obj.price}, Quantity: ${obj.quantity};
    </div>`;
    cartContainer.append(userCartProcuctData);
    })
    
    const emptyCart = document.createElement('button');
    emptyCart.textContent = "Empty the shopping cart";
    emptyCart.addEventListener('click', () => {
      emptyShoppingCart();
      setTimeout(() => {
        location.reload();
    }, 1000);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete user";
    deleteBtn.addEventListener('click', () => {
      // Call deleteProduct with the product ID when the button is clicked
      deleteUser(user._id);
      setTimeout(() => {
        location.reload();
    }, 1000);
      
  });
    card.append(username,email,userCartProducts ,cartContainer, deleteBtn, emptyCart);
    // card.innerHTML = `${id} ${title} ${description} ${quantity} ${price}`;

    userWrapper.append(card);
  });

  
}

displayData();

const addBtn = document.getElementById("add-user");
addBtn.addEventListener('click', addUser)