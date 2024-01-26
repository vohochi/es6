var cart = JSON.parse(localStorage.getItem('cart'));
// Phân trang
const productsPerPage = 9;
const totalProducts = 27;
const totalPages = Math.ceil(totalProducts / productsPerPage); // = 2
fetch(`http://localhost:3000/Products?_limit=${productsPerPage}`)
  .then((data) => data.json())
  .then((categories) => {
    const shop_arr = categories.map((cat) => {
      return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
        cat.images
      }','${Intl.NumberFormat('vi-VN', 'currency').format(
        cat.price
      )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
        cat.name
      }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
        cat.price
      )}','${cat.description}','${
        cat.amenities
      }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
    });
    document.querySelector('#shop').innerHTML = shop_arr.join('');
    const numcart = document.getElementById('numcart');
    numcart.textContent = cart.length;
  });
let currentPage = 1;

// phan trang
function renderPaginator(currentPage) {
  let html = '';

  // Nút previous
  if (currentPage > 1) {
    html += `
    <button onclick="changePage(${currentPage - 1})">
      <i class="fas fa-angle-left"></i>
    </button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    html += `<button onclick="changePage(${i})">${i}</button>`;
  }

  // Nút next
  if (currentPage < totalPages) {
    html += `
    <button onclick="changePage(${currentPage + 1})">
       <i class="fas fa-angle-right"></i> 
    </button>`;
  }

  document.getElementById('paginator').innerHTML = html;
}

renderPaginator(1);

const ST = document.querySelector('#shop');
function changePage(page) {
  renderPaginator(page);
  currentPage = page;
  ST.innerHTML = '';
  // Tính chỉ số bắt đầu (start)
  let start = (currentPage - 1) * productsPerPage;
  // Tính chỉ số kết thúc (end)
  let end = start + productsPerPage;
  // Nếu end vượt quá tổng số sản phẩm thì set bằng tổng số sản phẩm
  if (end > totalProducts) {
    end = totalProducts;
  }
  fetch(`http://localhost:3000/Products?_start=${start}&_end=${end}`)
    .then((data) => data.json())
    .then((categories) => {
      const shop_arr = categories.map((cat) => {
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = shop_arr.join('');
      const numcart = document.getElementById('numcart');
      numcart.textContent = cart.length;
    });
  // Gọi API lấy data của trang đó
  // Và render lại UI
  // renderProducts();
}
// // Danh sách sản phẩm hiện tại
// let currentProducts = [];

document.getElementById('price-1').addEventListener('click', (e) => {
  document.querySelector('#shop').innerHTML = '';

  fetch(`http://localhost:3000/Products`)
    .then((data) => data.json())
    .then((categories) => {
      const affordableProducts = categories.filter((p) => {
        return p.price >= 0 && p.price <= 5000000;
      });
      const updatedProducts = affordableProducts.map((cat) => {
        // code render sản phẩm tương tự như bên trên
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = updatedProducts.join('');
    });
});

document.getElementById('price-1').addEventListener('click', (e) => {
  document.querySelector('#shop').innerHTML = '';

  fetch(`http://localhost:3000/Products`)
    .then((data) => data.json())
    .then((categories) => {
      const affordableProducts = categories.filter((p) => {
        return p.price >= 0 && p.price <= 5000000;
      });
      const updatedProducts = affordableProducts.map((cat) => {
        // code render sản phẩm tương tự như bên trên
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = updatedProducts.join('');
    });
});
document.getElementById('price-2').addEventListener('click', (e) => {
  document.querySelector('#shop').innerHTML = '';

  fetch(`http://localhost:3000/Products`)
    .then((data) => data.json())
    .then((categories) => {
      const affordableProducts = categories.filter((p) => {
        return p.price >= 5000000 && p.price <= 15000000;
      });
      const updatedProducts = affordableProducts.map((cat) => {
        // code render sản phẩm tương tự như bên trên
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = updatedProducts.join('');
    });
});
document.getElementById('price-3').addEventListener('click', (e) => {
  document.querySelector('#shop').innerHTML = '';

  fetch(`http://localhost:3000/Products`)
    .then((data) => data.json())
    .then((categories) => {
      const affordableProducts = categories.filter((p) => {
        return p.price >= 15000000 && p.price <= 20000000;
      });
      const updatedProducts = affordableProducts.map((cat) => {
        // code render sản phẩm tương tự như bên trên
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = updatedProducts.join('');
    });
});
document.getElementById('price-4').addEventListener('click', (e) => {
  document.querySelector('#shop').innerHTML = '';

  fetch(`http://localhost:3000/Products`)
    .then((data) => data.json())
    .then((categories) => {
      const affordableProducts = categories.filter((p) => {
        return p.price >= 20000000 && p.price <= 30000000;
      });
      const updatedProducts = affordableProducts.map((cat) => {
        // code render sản phẩm tương tự như bên trên
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = updatedProducts.join('');
    });
});
const priceAll = document
  .getElementById('price-all')
  .addEventListener('click', (e) => {
    document.querySelector('#shop').innerHTML = '';

    fetch(`http://localhost:3000/Products`)
      .then((data) => data.json())
      .then((categories) => {
        const affordableProducts = categories.filter((p) => {
          return p.price >= 0 && p.price <= 3000000000;
        });
        const updatedProducts = affordableProducts.map((cat) => {
          // code render sản phẩm tương tự như bên trên
          return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
            cat.images
          }','${Intl.NumberFormat('vi-VN', 'currency').format(
            cat.price
          )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
            cat.name
          }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
            cat.price
          )}','${cat.description}','${
            cat.amenities
          }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
        });
        document.querySelector('#shop').innerHTML = updatedProducts.join('');
      });
  });
// tìm kiếm sản phẩm
document.getElementById('searchInput').addEventListener('input', function () {
  let keyword = this.value.toLowerCase();

  fetch(`http://localhost:3000/products?q=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      // Chuyển từ khóa trong data về chữ thường
      let products = data.map((product) => {
        product.name = product.name.toLowerCase();
        return product;
      });

      // So sánh với từ khóa đã chuyển về chữ thường
      let results = products.filter((product) => {
        return product.name.includes(keyword);
      });
      document.getElementById('shop').innerHTML = '';
      // Hiển thị resultscl
      const shop_arr = data.map((cat) => {
        return `    <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                          <div class="product-item bg-light mb-4">
                              <div class="product-img position-relative overflow-hidden">
                                  <img class="img-fluid w-100" src="${
                                    cat.images
                                  }" alt="">
                                  <div class="product-action">
                                      <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                                        cat.id
                                      },'${cat.name}','${
          cat.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                      <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                      <a class="btn btn-outline-dark btn-square"href="#"
                                      onclick="donhangchitiet(${cat.id},'${
          cat.name
        }','${cat.images}','${Intl.NumberFormat('vi-VN', 'currency').format(
          cat.price
        )}','${cat.description}','${
          cat.amenities
        }')"><i class="fa fa-search"></i></a>
                                  </div>
                              </div>
                              <div class="text-center py-4">
                                  <a class="h6 text-decoration-none text-truncate" href="">${
                                    cat.name
                                  }</a>
                                  <div class="d-flex align-items-center justify-content-center mt-2">
                                      <h5>${Intl.NumberFormat(
                                        'vi-VN',
                                        'currency'
                                      ).format(cat.price)}
                                  </div>
                                  <div class="d-flex align-items-center justify-content-center mb-1">
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small class="fa fa-star text-primary mr-1"></small>
                                      <small>(99)</small>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      });
      document.querySelector('#shop').innerHTML = shop_arr.join('');
      const numcart = document.getElementById('numcart');
      console.log(data);
    });
});
