const url = "https://course-api.com/javascript-store-products",
  productsDOM = document.querySelector(".products-center");

const fetchProducts = async () => {
  productsDOM.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("There was an error");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    productsDOM.innerHTML = `<p class="error">there was an error</p>`;
  }
};

const displayProducts = (list) => {
  const productlist = list
    .map((product) => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];
      //   id, name, price, img

      const formatPrice = price / 100;

      return `<!-- single product -->
              <a href="product.html?id=${id}" class="single-product">
                <img src="${img}" alt="${title}" class="single-product-img img">
                <footer>
                  <h5 class="name">${title}</h5>
                  <span class="price">$${formatPrice}</span>
                </footer>
              </a>
        `;
    })
    .join("");
  productsDOM.innerHTML = ` <div class="products-container">
        ${productlist}
 </div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
