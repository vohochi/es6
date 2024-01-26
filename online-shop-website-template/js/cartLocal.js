var cart = JSON.parse(localStorage.getItem('cart'));
const totalPrice = document.getElementById('totalPrice');
const subTotal = document.getElementById('subTotal');
const priceTotal = document.getElementsByClassName('priceTotal');
const fee = document.getElementById('fee');
const numcart = document.getElementById('numcart');
function themvaogio(id, name, images, price) {
  if (cart == null) {
    console.log(id, name, images, price);
    cart = [];
    cart.push({ id: id, name: name, image: images, price: price, quantity: 1 });
  } else {
    let item = cart.find((item) => item.id === id);
    if (item) item.quantity++;
    else
      cart.push({
        id: id,
        name: name,
        image: images,
        price: price,
        quantity: 1,
      });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  numcart.textContent = cart.length;
}
var tt = 0;

function hiendonhang() {
  numcart.textContent = cart.length;
  if (cart)
    cart.forEach((pro, i) => {
      var tc = Intl.NumberFormat('vi-VN', 'currency').format(
        Number(pro.price.replace(/\./g, '')) * pro.quantity
      );
      tt += tc;
      document.getElementById(
        'show_cart'
      ).innerHTML += `   <tr  data-product-id="${pro.id}" >
                <td class="align-middle">
                  <img src="${pro.image}" alt="" style="width: 50px" />
                  ${pro.name}
                </td>
                <td class="align-middle price">${Intl.NumberFormat(
                  'vi-VN',
                  'currency'
                ).format(Number(pro.price.replace(/\./g, '')))}</td>
                <td class="align-middle">
                  <div
                    class="input-group quantity mx-auto"
                    style="width: 100px"
                  >
                    <div class="input-group-btn btn-minus" onclick="tangGiamSoLuong(event)">
                      <button class="btn btn-sm btn-primary btn-minus" >
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input 
                      type="text"
                      class="form-control form-control-sm bg-secondary border-0 text-center priceTotal"   value="${
                        pro.quantity
                      }"
                   onchange="handleQuantity(${Intl.NumberFormat(
                     'vi-VN',
                     'currency'
                   ).format(
                     Number(pro.price.replace(/\./g, ''))
                   )}, this.value, ${i})"
                    />
                    <div class="input-group-btn btn-plus" onclick="tangGiamSoLuong(event)">
                      <button class="btn btn-sm btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="align-middle tc">${tc}</td>
                <td class="align-middle">
                  <button class="btn btn-sm btn-danger removeItems"  >
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </tr>`;
    });
}
hiendonhang();
// onchange

// remove trong locaStorage
function removeProduct(product) {
  // Xóa sản phẩm khỏi mảng cart
  cart.splice(cart.indexOf(product), 1);
  // Xóa sản phẩm khỏi LocalStorage
  const cartStr = JSON.stringify(cart);
  localStorage.setItem('cart', cartStr);
  numcart.textContent = cart.length;
  tongTien();
}
// Lấy tất cả button remove
const removeItems = document.querySelectorAll('.removeItems');
// Duyệt qua từng button
const removeItem = removeItems.forEach(function (button) {
  button.addEventListener('click', function (e) {
    const parent = e.target.closest('tr');
    removeProduct(parent);
    if (parent) {
      // Xóa hàng khỏi bảng
      parent.remove();
      // Xóa khỏi localStorage
      // localStorage.removeItem('cart');
    }
  });
});

function tangGiamSoLuong(event) {
  const input = event.target.closest('.input-group').querySelector('input');
  const isPlusBtn = event.target.classList.contains('btn-plus');
  const isMinusBtn = event.target.classList.contains('btn-minus');
  const productId = input.closest('tr').dataset.productId;
  const productId1 = input.closest('tr').querySelector('.price');
  const tc = input.closest('tr').querySelector('.tc');

  if (input && (isPlusBtn || isMinusBtn)) {
    let value = parseInt(input.value) || 0; // Chuyển thành số nếu hợp lệ
    if (isPlusBtn) {
      value = Math.max(value, 0) + 1; // Ngăn giá trị âm
    } else if (isMinusBtn) {
      value = Math.max(value - 1, 0); // Ngăn giá trị âm
    }
    input.value = value;
    // Tìm vị trí sản phẩm cần cập nhật
    const productIndex = cart.findIndex((item) => item.id == productId);
    // Nếu tồn tại thì cập nhật số lượng mới
    const indexQuantity = cart[productIndex].quantity;
    cart[productIndex].quantity = value;
    tc.textContent = Intl.NumberFormat('vi-VN', 'currency').format(
      Number(productId1.textContent.replace(/\./g, '') * value)
    );

    // console.log(productId1 * value);
    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  if (input.value == 0) {
    const remove = input.closest('tr').remove();
    removeProduct();
  }
  tongTien();
}
const tongTien = () => {
  let total = cart.reduce((acc, item) => {
    return acc + Number(item.price.replace(/\./g, '')) * item.quantity;
  }, 0);
  totalPrice.textContent = Intl.NumberFormat('vi-VN', 'currency').format(
    total + total * 0.05
  );
  subTotal.textContent = Intl.NumberFormat('vi-VN', 'currency').format(total);
  fee.textContent = `${5}%`;
  let carts = [];
  carts.push({
    total: totalPrice.textContent,
  });
  localStorage.setItem('carts', JSON.stringify(carts));
};

window.addEventListener('load', tongTien);
