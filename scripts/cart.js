const menuBtn = document.querySelector(".menu"),
  ul = document.querySelector("nav ul"),
  cartCount = document.querySelector("[data-cart-count]"),
  grid = document.querySelector(".grid-three-columns")

menuBtn.addEventListener("click", () => ul.classList.toggle("open"))

let cart = (JSON.parse(localStorage.getItem("ratanCart")) || []).filter(
  (prod) => prod && typeof prod === "object",
)
cartCount.style.display = cart.length ? "inline" : "none"
cartCount.innerText = cart.length || ""

let cartHTML = ""
for (const prod of cart) {
  cartHTML += `
          <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
          </a>
        `
}
grid.innerHTML = cartHTML
