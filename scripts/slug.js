const addBtn = document.querySelector("[data-add-to-cart]")
cartCount = document.querySelector("[data-cart-count]")

let cart = (JSON.parse(localStorage.getItem("ratanCart")) || []).filter(
  (prod) => prod && typeof prod === "object",
)
cartCount.style.display = cart.length ? "inline" : "none"
cartCount.innerText = cart.length || ""

//custom cart update event
const cartUpdateEvent = () => new CustomEvent("cart:update", { bubbles: true })

const isInCart = () => cart.some((prod) => prod?._id === addBtn.dataset.prodId)
const updateUI = () => {
  addBtn.innerText = isInCart() ? "Remove From Cart" : "Add to Cart"
}

const updateBtn = (product) => {
  let findedProduct = cart.find((prod) => prod?._id === addBtn.dataset.prodId)
  if (findedProduct) {
    removeFromCart(findedProduct?._id)
    updateUI()
  } else {
    addToCart(product)
    updateUI()
  }
  document.dispatchEvent(cartUpdateEvent())
}

const addToCart = (product) => {
  cart.push(product)
  cart = cart.filter((prod) => prod && typeof prod === "object")
  localStorage.setItem("ratanCart", JSON.stringify(cart))
  cartCount.style.display = cart.length ? "inline" : "none"
}
const removeFromCart = (_id) => {
  cart = cart
    .filter((prod) => prod && typeof prod === "object")
    .filter((prod) => prod._id !== _id)
  localStorage.setItem("ratanCart", JSON.stringify(cart))
  cartCount.style.display = cart.length ? "inline" : "none"
}

updateUI()
document.addEventListener("cart:update", () => {
  cartCount.innerText = cart.length || ""
})

const product = {
  _id: document.querySelector("._id").value,
  title: document.querySelector(".title").value,
  slug: document.querySelector(".slug").value,
  image: document.querySelector(".image").value,
}

addBtn.addEventListener("click", () => updateBtn(product))
