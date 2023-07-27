const productDOM = document.querySelector(".product"),
  url = "https://course-api.com/javascript-store-single-product?id=";

const fetchProducts = async () => {
  productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(`${url}${id}`);
    if (!response.ok) {
      throw new Error("There was an error");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    productDOM.innerHTML = `<h4 class="product-loading">There was a problem loading the product. Please try again later.</h4>`;
  }
};
const displayProducts = (item) => {
  const { company, name: title, price, description } = item.fields;
  const { url: img } = item.fields.image[0];
  const formatPrice = price / 100;
  const { colors } = item.fields;

  const colorLists = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color};"></span>`;
    })
    .join("");

  document.title = title.toUpperCase();

  const format = `<div class="product-wrapper">
  <img src="${img}" alt="${title}" class="img">
  <div class="product-info">
      <h3>${title}</h3>
      <h5>${company}</h5>
      <span>$${formatPrice}</span>
      <div class="colors">
          ${colorLists}
          <p>${description}
          </p>
          <button class="btn">add to cart</button>
      </div>
  </div>
</div>`;

  productDOM.innerHTML = format;
};
const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
