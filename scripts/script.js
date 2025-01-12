// By Saad Khatri (SXVD)

const queryUrl =
  "https://zmj6x1jl.api.sanity.io/v2022-03-07/data/query/production"

// menu
const menuBtn = document.querySelector(".menu"),
  nav = document.querySelector("nav"),
  ul = document.querySelector("nav ul"),
  cartCount = document.querySelector("[data-cart-count]")

let cart = (JSON.parse(localStorage.getItem("ratanCart")) || []).filter(
  (prod) => prod && typeof prod === "object",
)
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

const query = async (q = "", params = {}) => {
  let p = ""
  if (params) {
    for (const key in params) {
      p += `&$${key}="${params[key]}"`
    }
  }
  try {
    const res = await (
      await fetch(queryUrl + `?query=${encodeURIComponent(q)}${p}`)
    ).json()
    return res.result
  } catch (error) {
    alert(error.message)
    console.error(error)
    throw error
  }
}

window.onload = async () => {
  // queries
  const headerQ = `*[_type=="headerImage"][0]{image{asset->{url}}}`
  const headerRes = query(headerQ)
  const carouselQ = `*[_type=="product"]|order(_createdAt desc){_id,title,type,"slug":slug.current,description,specs,"image":images[0].asset->{url}}`
  const carouselRes = query(carouselQ)

  // resolving all parallelly
  const [img, carouselProds] = await Promise.all([headerRes, carouselRes])

  // setting ui =============
  // header Image
  headerImage.classList.remove("skeleton")
  headerImage.src = img.image.asset.url

  // carousel
  let carouselHTML = ""
  for (const prod of carouselProds.slice(0, 4)) {
    carouselHTML += `
      <div class="slide">
            <div>
              <h3 style="font-size:1.5rem">${prod.title}</h3>
              <p>
                ${prod.description}
              </p>
              <a href="/products/${prod.slug}.html">More</a>
            </div>
            <img
              width="400"
              src=${prod.image.url}
              alt="Nature"
            />
      </div>`
  }
  carousel.classList.remove("skeleton")
  carousel.innerHTML = carouselHTML

  // dupatta
  let dupattaHTML = ""
  for (const prod of carouselProds
    .filter((prod) => prod.type === "Dupatta")
    .slice(0, 3)) {
    dupattaHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image.url}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  dupatta.classList.remove("skeleton")
  dupatta.innerHTML = dupattaHTML

  // dress
  let dressHTML = ""
  for (const prod of carouselProds
    .filter((prod) => prod.type === "Dress")
    .slice(0, 3)) {
    dressHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image.url}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  dress.classList.remove("skeleton")
  dress.innerHTML = dressHTML

  // saree
  let sareeHTML = ""
  for (const prod of carouselProds
    .filter((prod) => prod.type === "Saree")
    .slice(0, 3)) {
    sareeHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image.url}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  saree.classList.remove("skeleton")
  saree.innerHTML = sareeHTML

  // topMaterial
  let topMaterialHTML = ""
  for (const prod of carouselProds
    .filter((prod) => prod.type === "Top Material")
    .slice(0, 3)) {
    topMaterialHTML += `
        <a href="products/${prod.slug}.html" class="product">
              <img
                width="400"
                src=${prod.image.url}
                alt=${prod.title}
              />
              <strong>${prod.title}</strong>
        </a>`
  }
  topMaterial.classList.remove("skeleton")
  topMaterial.innerHTML = topMaterialHTML
}
