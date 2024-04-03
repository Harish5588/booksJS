let iconCart=document.querySelector(".iconCart");
let cart=document.querySelector(".cart");
let close=document.querySelector(".close");
let homepage=document.querySelector(".homePage")

iconCart.addEventListener("click",function(){
    if(cart.style.right=="-100%"){
        cart.style.right="0";
       homepage.style.transform="translate(-400px)"; 
       
    }else{
        cart.style.right="-100%";
        homepage.style.transform="translate(0)";
    }
});

close.addEventListener("click",function(){
    cart.style.right="-100%";
    homepage.style.transform="translate(0)";
});


let products = null;
// get data from file json
fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });

//show data products in list
function addDataToHTML() {
  // remove data default from HTML
  let listProductHTML = document.querySelector(".listProduct");
  listProductHTML.innerHTML = "";
  // add new data
  if (products != null) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

      listProductHTML.appendChild(newProduct);
    });
  }
}

//use cookie so the cart doesn't get lost on refresh page
let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
checkCart();
function addCart($idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));

  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct].quantity = 1;
  } else {
    //If this product is already in the cart.
    //I just increased the quantity
    listCart[$idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
}
addCartToHTML();
function addCartToHTML() {
  // clear data default
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalQuantity = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "+":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;

      // if quantity <= 0 then remove product in cart
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;

    default:
      break;
  }
  // save new data in cookie
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}

//Loginpage
var loginbtn=document.querySelector(".login");
var loginPage=document.querySelector(".loginpage");
var logButton=document.querySelector("#logbutton")
loginbtn.addEventListener("click",function(){
  if(loginPage.style.display=="none"){
  loginPage.style.display="block";
  homepage.style.transform="translate(0px,200px)";
  loginPage.style.transform="translate(700px,-1200px)";
  }
  else{
    loginPage.style.display="none";
  homepage.style.transform="translate(0px,0px)";
  }
});

function closelog(){
  loginPage.style.display="none";
  homepage.style.transform="translate(0px,0px)";
}
