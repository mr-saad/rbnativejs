const addBtn = document.querySelector("[data-add-to-cart]")
cartCount = document.querySelector("[data-cart-count]")

let cart = (JSON.parse(localStorage.getItem("ratanCart")) || []).filter(
  (prod) => prod && typeof prod === "object",
)

cartCount.innerText = cart.length || ""

const queryUrl =
  "https://zmj6x1jl.api.sanity.io/v2022-03-07/data/query/production"

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
}
const removeFromCart = (_id) => {
  cart = cart
    .filter((prod) => prod && typeof prod === "object")
    .filter((prod) => prod._id !== _id)
  localStorage.setItem("ratanCart", JSON.stringify(cart))
}

//custom cart update event
const cartUpdateEvent = () => new CustomEvent("cart:update", { bubbles: true })

document.addEventListener("cart:update", (e) => {
  cartCount.innerText = cart.length || ""
})

window.onload = async () => {
  const q = `*[_type=="product"&&_id==$id][0]{_id,title,type,"slug":slug.current,description,specs,"image":images[0].asset->{url}}`
  const product = await query(q, { id: addBtn.dataset.prodId })

  updateUI()
  addBtn.addEventListener("click", () => updateBtn(product))
  addBtn.style.display = "block"
}
