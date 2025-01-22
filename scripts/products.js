// menu
const menuBtn = document.querySelector(".menu"),
  nav = document.querySelector("nav"),
  ul = document.querySelector("nav ul"),
  cartCount = document.querySelector("[data-cart-count]"),
  filterBtns = document.querySelector(".filter_list")

let cart = (JSON.parse(localStorage.getItem("ratanCart")) || []).filter(
  (prod) => prod && typeof prod === "object",
)
cartCount.style.display = cart.length ? "inline" : "none"
cartCount.innerText = cart.length || ""

menuBtn.addEventListener("click", () => ul.classList.toggle("open"))
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) {
    ul.classList.remove("open")
  }
})

// dom
const products = document.querySelector("[data-products]")

// body (products)
window.addEventListener("sanityReady", () => {
  let productsHTML = ""
  for (let product of window._prods) {
    productsHTML += `<a href="products/${product.slug}.html" class="product">
            <img height="400" width="400" src="${product.image}" decoding="async" loading="lazy" />
            <strong>${product.title}</strong>
          </a>`
  }
  products.innerHTML = productsHTML
  products.classList.remove("skeleton")
})

filterBtns.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return

  const allBtns = e.currentTarget.querySelectorAll("li")
  allBtns.forEach((btn) => {
    btn.classList.remove("active")
    btn.dataset.filterActive = false
  })

  const filter = e.target.dataset.filter

  switch (filter) {
    case "dupatta":
      filterProds("Dupatta", e)
      break
    case "saree":
      filterProds("Saree", e)
      break
    case "dress":
      filterProds("Dress", e)
      break
    case "topMaterial":
      filterProds("Top Material", e)
      break
    default:
      filterProds("all", e)
  }
})

const filterProds = (type, e) => {
  const isActive = e.target.dataset.filterActive === "true"
  e.target.dataset.filterActive = !isActive
  if (isActive) e.target.classList.remove("active")
  else e.target.classList.add("active")

  let productsHTML = ""
  if (type === "all") {
    window._prods.forEach((prod) => {
      productsHTML += `<a href="products/${prod.slug}.html" class="product">
                    <img height="400" width="400" src="${prod.image}" decoding="async" loading="lazy" />
                    <strong>${prod.title}</strong>
                  </a>`
    })
  } else {
    window._prods
      .filter((prod) => prod.type === type)
      .forEach((prod) => {
        productsHTML += `<a href="products/${prod.slug}.html" class="product">
            <img height="400" width="400" src="${prod.image}" decoding="async" loading="lazy" />
            <strong>${prod.title}</strong>
          </a>`
      })
  }
  products.innerHTML = productsHTML
}
