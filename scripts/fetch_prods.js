const queryUrl =
  "https://zmj6x1jl.apicdn.sanity.io/v2022-03-07/data/query/production?returnQuery=false"

const query = async (q = "", params = {}) => {
  let p = ""
  if (params) {
    for (const key in params) {
      p += `&$${key}="${params[key]}"`
    }
  }
  try {
    const res = await (
      await fetch(queryUrl + `&query=${encodeURIComponent(q)}${p}`)
    ).json()
    return res.result
  } catch (error) {
    console.error(error)
    throw error
  }
}
const headerQ = `*[_type=="headerImage"][0]{"image":image.asset->url}`
let headerRes = null
if (!window.location.pathname.includes("products")) headerRes = query(headerQ)
const carouselQ = `*[_type=="product"]|order(_createdAt desc){title,type,"slug":slug.current,description,"image":images[0].asset->url}`
const carouselRes = query(carouselQ)

let reqs = [carouselRes, headerRes]

// resolving all parallelly
const fetchData = async () => {
  const [prods, headerImg] = await Promise.all(reqs)
  window._headerImg = headerImg
  window._prods = prods
  const ev = new CustomEvent("sanityReady")
  window.dispatchEvent(ev)
}
fetchData()
