const buyButton = document.querySelector(".buy-btn");
const favoriteButton = document.querySelector(".favorite-btn");

const cartItems = document.getElementById("cartItems");
const itemTotal = document.getElementById("itemTotal");
const grandTotal = document.getElementById("grandTotal");

const shippingFee = 500;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    {
      id: 1,
      name: "ホワイトリム 深皿",
      price: 2800,
      image: "img/blue.jpg",
      description: "毎日の食卓で使いやすい中くらいサイズの深皿。サラダやスープ、パスタにも使いやすい一枚です。"
    },
    {
      id: 2,
      name: "ホワイトリム マグカップ",
      price: 2400,
      image: "img/mug2.png",
      description: "淡い水色と白い縁がやさしい印象のマグカップ。朝のコーヒーや夜のハーブティーにぴったりです。"
    },
    {
      id: 3,
      name: "ホワイトリム スクエアプレート",
      price: 2600,
      image: "img/square2.png",
      description: "パンやケーキなどをきれいに盛り付けられるスクエアプレートです。"
    },
    {
      id: 4,
      name: "ホワイトリム スプーン",
      price: 900,
      image: "img/spoon2.png",
      description: "シンプルで毎日使いやすいホワイトリムシリーズのスプーンです。"
    }
  ];
  
  let selectedProduct = products[0];

  const productItems = document.querySelectorAll(".product-item");

const mainProductImage = document.getElementById("mainProductImage");
const mainProductName = document.getElementById("mainProductName");
const mainProductPrice = document.getElementById("mainProductPrice");
const mainProductDescription = document.getElementById("mainProductDescription");

// お気に入りボタン
if (favoriteButton) {
  favoriteButton.addEventListener("click", function () {
    favoriteButton.classList.toggle("active");

    if (favoriteButton.classList.contains("active")) {
      favoriteButton.textContent = "♥";
    } else {
      favoriteButton.textContent = "♡";
    }
  });
}

// Add to Cart
if (buyButton) {
  buyButton.addEventListener("click", function () {
    const item = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1
    };

    const existingItem = cart.find(function (product) {
      return product.id === item.id;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }

    saveCart();
    alert("カートに追加しました！");
  });
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(price) {
  return `¥${price.toLocaleString()}`;
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">カートに商品はありません。</p>`;
    itemTotal.textContent = "¥0";
    grandTotal.textContent = "¥0";
    return;
  }

  let total = 0;

  cart.forEach(function (item, index) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>White Rim Collection</p>
          <span>${formatPrice(item.price)}</span>
        </div>

        <div class="quantity">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>

        <p class="subtotal">${formatPrice(subtotal)}</p>
        <button class="remove" onclick="removeItem(${index})">×</button>
      </div>
    `;
  });

  itemTotal.textContent = formatPrice(total);
  grandTotal.textContent = formatPrice(total + shippingFee);
}

function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

if (productItems.length > 0) {
    productItems.forEach(function (productItem, index) {
  
      productItem.addEventListener("click", function () {
  
        selectedProduct = products[index];
  
        productItems.forEach(function (item) {
          item.classList.remove("active");
        });
  
        productItem.classList.add("active");
  
        mainProductImage.src = selectedProduct.image;
        mainProductImage.alt = selectedProduct.name;
        mainProductName.textContent = selectedProduct.name;
        mainProductPrice.textContent = formatPrice(selectedProduct.price);
        mainProductDescription.textContent = selectedProduct.description;
  
      });
  
    });
  }

renderCart();