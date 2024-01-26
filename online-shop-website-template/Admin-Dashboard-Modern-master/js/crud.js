// Lấy dữ liệu products từ localStorage
var products = JSON.parse(localStorage.getItem('products'));
fetch(`http://localhost:3000/product1`)
  .then((data) => data.json())
  .then((products) => {
    console.log(products);
    showProduct(products);
  });
const showProduct = (products) => {
  const product_arr = products.map((product) => {
    console.log(product);
    return ` <tr data-product-id='${product.id}'>
                    <td>#${product.id}</td>
                    <td>
                      <div class="client">
                        <div
                          class="client-img bg-img"
                          style="background-image: url(${product.images})"
                        ></div>
                        <div class="client-info">
                          <h4>${product.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td class="description">${product.description}</td>
                    <td class="prices">${Intl.NumberFormat(
                      'vi-VN',
                      'currency'
                    ).format(product.price)}</td>
                    <td class="amenities">${product.amenities}</td>
                    
                    <td>
                    <div class="actions delete edit">
                    <button onclick="eventDom(event)" class="edit">Sửa</button>  
                      <button onclick="eventDom(event)" class="delete">Xóa</button>  
                </div>
                      
                    </td>
                    </tr>`;
  });
  document.querySelector('#products').innerHTML += product_arr.join('');
};

function removeProduct(id) {
  // id.preventDefault();
  // Gọi API delete của json-server
  fetch(`http://localhost:3000/product1/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => {
      console.log('Deleted product from json server');
    })
    .catch((err) => {
      console.log('Error deleting product from json server');
    });
  console.log('delete');
}

// lay phan tu
const add = document.getElementById('add');
const edit = document.querySelectorAll('.edit');
const del = document.querySelectorAll('.delete');
function eventDom(event) {
  // lay phan tu
  // event.preventDefault();
  // console.log(event);
  const tr = event.target.closest('tr');
  const productId = tr.dataset.productId;
  const isDel = event.target.classList.contains('delete');
  const isEdit = event.target.classList.contains('edit');
  console.log(productId);
  // console.log(isDel);
  // console.log(isEdit);

  if (isEdit) {
    console.log('edit');
    let productID = [];
    productID.push({ productID: +productId });
    localStorage.setItem('productID', JSON.stringify(productID));
    location.href = './formEdit.html';
  } else if (isDel) {
    alert('Xóa thành công');
    removeProduct(productId);
    tr.remove();
  }

  // console.log(edit);
}
const showAdd = () => {
  location.href = './formAdd.html';
};
add.addEventListener('click', showAdd);
