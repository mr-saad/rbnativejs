// By Saad Khatri (SXVD)

// menu
const menuBtn = document.querySelector(".menu"),
  nav = document.querySelector("nav"),
  ul = document.querySelector("nav ul"),
  cartCount = document.querySelector("[data-cart-count]")

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

// selecting from dom

const headerImage = document.querySelector("[data-header-image]"),
  carousel = document.querySelector("[data-carousel]"),
  dupatta = document.querySelector("[data-dupatta]"),
  dress = document.querySelector("[data-dress]"),
  saree = document.querySelector("[data-saree]"),
  topMaterial = document.querySelector("[data-top-material]")

window.addEventListener("sanityReady", () => {
  // header Image
  headerImage.classList.remove("skeleton")
  headerImage.src = window._headerImg.image

  // carousel
  let carouselHTML = ""
  for (const prod of window._prods.slice(0, 4)) {
    carouselHTML += `
      <div class="slide">
            <div>
              <h3 class="highlight" style="font-size:1.5rem">${prod.title}</h3>
              <p>
                ${prod.description}
              </p>
              <a href="products/${prod.slug}.html">More</a>
            </div>
            <img
              width="400"
              src=${prod.image}
              alt="Nature"
            />
      </div>`
  }
  carousel.classList.remove("skeleton")
  carousel.innerHTML = carouselHTML

  // dupatta
  let dupattaHTML = ""
  for (const prod of window._prods
    .filter((prod) => prod.type === "Dupatta")
    .slice(0, 3)) {
    dupattaHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  dupatta.classList.remove("skeleton")
  dupatta.innerHTML = dupattaHTML

  // dress
  let dressHTML = ""
  for (const prod of window._prods
    .filter((prod) => prod.type === "Dress")
    .slice(0, 3)) {
    dressHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  dress.classList.remove("skeleton")
  dress.innerHTML = dressHTML

  // saree
  let sareeHTML = ""
  for (const prod of window._prods
    .filter((prod) => prod.type === "Saree")
    .slice(0, 3)) {
    sareeHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  saree.classList.remove("skeleton")
  saree.innerHTML = sareeHTML

  // topMaterial
  let topMaterialHTML = ""
  for (const prod of window._prods
    .filter((prod) => prod.type === "Top Material")
    .slice(0, 3)) {
    topMaterialHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  topMaterial.classList.remove("skeleton")
  topMaterial.innerHTML = topMaterialHTML
})
