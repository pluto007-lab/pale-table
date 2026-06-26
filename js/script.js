const buyButton = document.querySelector(".buy-btn");
const favoriteButton = document.querySelector(".favorite-btn");

buyButton.addEventListener("click", function () {
    alert("カートに追加しました！");
});

favoriteButton.addEventListener("click", function () {
    favoriteButton.classList.toggle("active");

    if (favoriteButton.classList.contains("active")) {
        favoriteButton.textContent = "♥";
    } else {
        favoriteButton.textContent = "♡";
    }
});