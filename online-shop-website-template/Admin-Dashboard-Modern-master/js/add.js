const container = document.getElementById('container');
container.innerHTML = `<form id="form" class="form">
        <h2>Thêm sản phẩm</h2>
        <div class="form-control">
          <label for="name">Tên</label>
          <input type="text" id="name" placeholder="Nhập tên sản phẩm" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Hình ảnh">Hình ảnh</label>
<input type="file" id="img" accept="img/*">
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Giá">Giá</label>
          <input type="text" id="price" placeholder="Nhập giá" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Mô tả">Mô tả</label>
          <input type="text" id="description" placeholder="Nhập mô tả" />
          <small>Error message</small>
        </div><div class="form-control">
          <label for="Số lượng">Số Lượng</label>
          <input type="text" id="quantity" placeholder="Nhập số lượng" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Tiện nghi">Tiện nghi</label>
          <input type="text" id="amenities" placeholder="Nhập tiện nghi" />
          <small>Error message</small>
        </div>
        <a href="crud.html">Quay lại</a>
        <button type="submit">Thêm sản phẩm</button>
      </form>`;

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

// var products = JSON.parse(localStorage.getItem('products'));
// console.log(products);
const images = document.getElementById('img');
let base64;
images.addEventListener('change', (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    base64 = reader.result;
    // base64 chứa dữ liệu base64 của ảnh
  };

  reader.readAsDataURL(file);
});
function handleSubmit(e) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;
  const description = document.getElementById('description').value;
  const amenities = document.getElementById('amenities').value;
  // e.preventDefault();

  // const id = products.at(-1).id;
  // images = `./img/${images}`;
  // console.log(images);

  const product = {
    // id: id + 1,
    name,
    images: base64,
    price,
    description,
    amenities,
    // quantity: +quantity,
  };
  // products.push(product);
  console.log(product);
  // Lưu vào localStorage
  // localStorage.setItem('products', JSON.stringify(products));
  // post lên json
  fetch(`http://localhost:3000/product1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      location.href = 'crud.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
