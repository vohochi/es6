var productID = JSON.parse(localStorage.getItem('productID')) || [];
const id = productID[0].productID;
let base64;
fetch(`http://localhost:3000/product1/${id}`)
  .then((data) => data.json())
  .then((products) => {
    const container = document.getElementById('container');
    console.log(products);
    container.innerHTML = `<form id="form" class="form">
    <h2>Sửa sản phẩm</h2>
        <div class="form-control">
          <label for="name">Tên</label>
          <input type="text" id="name" placeholder="${products.name}" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Hình ảnh">Hình ảnh</label>
<input type="file" id="img" accept="img/*">
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Giá">Giá</label>
          <input type="text" id="price" placeholder="${products.price}" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="Mô tả">Mô tả</label>
          <input type="text" id="description" placeholder="${products.description}" />
          <small>Error message</small>
        </div><div class="form-control">
          <label for="Số lượng">Số Lượng</label>
          <input type="text" id="quantity" placeholder="Nhập số lượng" />
          <small>Error message</small>
          </div>
          <div class="form-control">
          <label for="Tiện nghi">Tiện nghi</label>
          <input type="text" id="amenities" placeholder="${products.amenities}" />
          <small>Error message</small>
        </div>
        <a href="crud.html">Quay lại</a>
        <button type="submit">Sửa sản phẩm</button>
        </form>`;
    const form = document.getElementById('form');
    const images = document.getElementById('img');
    form.addEventListener('submit', handleSubmit);
    images.addEventListener('change', (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        base64 = reader.result;
        // base64 chứa dữ liệu base64 của ảnh
      };

      reader.readAsDataURL(file);
    });
  });

function handleSubmit(products) {
  products.preventDefault();
  console.log(products);
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;
  const description = document.getElementById('description').value;
  const amenities = document.getElementById('amenities').value;
  // e.preventDefault();

  // const id = products.at(-1).id;
  // images = `./img/${images}`;
  // console.log(images);
  const name1 = name == '' ? products.name : name;
  const price1 = price == '' ? products.price : price;
  const description1 = description == '' ? products.description : description;
  const amenities1 = amenities == '' ? products.amenities : amenities;
  // // images == '' ? product.images : images;

  const product = {
    // id: id + 1,
    name: name,
    // images: images,
    price: price,
    description: description,
    amenities: amenities,
    // quantity: +quantity,
  };
  // products.push(product);
  // Lưu vào localStorage
  // localStorage.setItem('products', JSON.stringify(products));
  // post lên json
  fetch(`http://localhost:3000/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  //  location.href = './crud.html';
}
