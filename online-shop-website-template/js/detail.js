// var httpss = 'http://localhost:3000/Favorite';
// fetch(httpss)
//   .then((data) => {
//     const data = data.json;
//     console.log(data);
//     data.forEach((element) => {
//       console.log(element);
//     });
//   })
//   .catch(console.log(error));

// donhangchitiet();
function donhangchitiet(id, name, images, price, description, amenities) {
  location.href = 'detail.html';
  // hienchitiet(id, name, images, price, description);
  // id.preventDefault();
  // Khởi tạo mảng details
  let details = [];

  // Thêm phần tử vào mảng
  details.push({
    id: id,
    name: name,
    images: images,
    price: price,
    description: description,
    amenities: amenities,
    quantity: 1,
  });

  // Lưu mảng vào localStorage
  localStorage.setItem('details', JSON.stringify(details));
}
hienchitiet();
// hienchitiet();
function hienchitiet() {
  let storedDetails = JSON.parse(localStorage.getItem('details'));
  storedDetails.forEach((useDetail) => {
    const detail = `  <div class="row px-xl-5" data-product-id="${useDetail.id}">
  <div class="col-lg-5 mb-30">
          <div
            id="product-carousel"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner bg-light">
              <div class="carousel-item active">
                <img class="w-100 h-100" src="${useDetail.images}" alt="Image" />
              </div>
              <div class="carousel-item">
                <img class="w-100 h-100" src="${useDetail.images}" alt="Image" />
              </div>
              <div class="carousel-item">
                <img class="w-100 h-100" src="${useDetail.images}" alt="Image" />
              </div>
              <div class="carousel-item">
                <img class="w-100 h-100" src="${useDetail.images}" alt="Image" />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#product-carousel"
              data-slide="prev"
            >
              <i class="fa fa-2x fa-angle-left text-dark"></i>
            </a>
            <a
              class="carousel-control-next"
              href="#product-carousel"
              data-slide="next"
              >
              <i class="fa fa-2x fa-angle-right text-dark"></i>
              </a>
              </div>
              </div>
              
              <div class="col-lg-7 h-auto mb-30">
              <div class="h-100 bg-light p-30">
              <h3>${useDetail.name}</h3>
            <div class="d-flex mb-3">
              <div class="text-primary mr-2">
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star-half-alt"></small>
                <small class="far fa-star"></small>
                </div>
              <small class="pt-1">(99 Reviews)</small>
            </div>
            <h3 class="font-weight-semi-bold mb-4">${useDetail.price}</h3>
            <p class="mb-4">
             ${useDetail.description}
            </p>
           <div class="amenities">Amenities: ${useDetail.amenities} </div>
            </div>
            <div class="d-flex align-items-center mb-4 pt-2">
              <div class="input-group quantity mr-3" style="width: 130px">
                <div class="input-group-btn" onclick="TangGiam(event)">
                  <button class="btn btn-primary btn-minus">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control bg-secondary border-0 text-center"
                  value="1"
                />
                <div class="input-group-btn">
                <button class="btn btn-primary btn-plus" onclick="TangGiam(event)">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button class="btn btn-primary px-3" onclick="themvaogiohang(${useDetail.id},'${useDetail.name}','${useDetail.images}','${useDetail.price}')">
                <i class="fa fa-shopping-cart mr-1"></i> <a href="cart.html" class="addC">Thêm vào giỏ hàng</a>
              </button>
            </div>
            <div class="d-flex pt-2">
              <strong class="text-dark mr-2">Share on:</strong>
              <div class="d-inline-flex">
                <a class="text-dark px-2" href="">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a class="text-dark px-2" href="">
                  <i class="fab fa-twitter"></i>
                </a>
                <a class="text-dark px-2" href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a class="text-dark px-2" href="">
                  <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          </div>`;
    document.getElementById('orderDetail').innerHTML = detail;
  });
  var cart = JSON.parse(localStorage.getItem('cart'));
}
window.addEventListener('beforeunload', function (e) {
  // Xóa mảng khỏi localStorage
  localStorage.removeItem('details');
});

function TangGiam(event) {
  const input = event.target.closest('.input-group').querySelector('input');
  const isPlusBtn = event.target.classList.contains('btn-plus');
  const isMinusBtn = event.target.classList.contains('btn-minus');
  const details = JSON.parse(localStorage.getItem('details'));
  console.log(details[0].quantity);
  if (isPlusBtn || isMinusBtn) {
    let value = parseInt(input.value) || 0; // Chuyển thành số nếu hợp lệ

    if (isPlusBtn) {
      value = Math.max(value, 0) + 1; // Ngăn giá trị âm
      details[0].quantity = +value;
      localStorage.setItem('details', JSON.stringify(details));

      console.log(value);
    } else if (isMinusBtn) {
      value = Math.max(value - 1, 0); // Ngăn giá trị âm
      details[0].quantity = +value;
      localStorage.setItem('details', JSON.stringify(details));

      console.log(value);
    }
    input.value = value;
    console.log(isPlusBtn);

    // tăng số lượng sản phẩm
    // cập nhật lại localStorage
    // localStorage.setItem('products', JSON.stringify(products));

    // Tìm vị trí sản phẩm cần cập nhật
    // const productIndex = cart.findIndex((item) => item.id == productId);
    // Nếu tồn tại thì cập nhật số lượng mới
    // const indexQuantity = cart[productIndex].quantity;
    // cart[productIndex].quantity = value;
    // tc.textContent = productId1.textContent * value;
    // console.log(productId1 * value);
    // Lưu lại vào localStorage
    // localStorage.setItem('cart', JSON.stringify(cart));
    // console.log(value);
  }
}
function themvaogiohang(event) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  let [storedDetails] = JSON.parse(localStorage.getItem('details'));
  let item = cart.find((item) => item.id === storedDetails.id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id: storedDetails.id,
      name: storedDetails.name,
      image: storedDetails.images,
      price: storedDetails.price,
      quantity: storedDetails.quantity,
    });
  }
  const numCart = document.getElementById('numCart');
  numCart.textContent = cart.length;
  localStorage.setItem('cart', JSON.stringify(cart));
  event.target.preventDefault();
}
