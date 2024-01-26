var categories = JSON.parse(localStorage.getItem('categories')) || [];
fetch('http://localhost:3000/categories')
  .then((data) => data.json())
  .then((categories) => {
    categories.map((cat) => {
      categories.push({
        id: cat.id,
        name: cat.name,
        images: cat.images,
        price: cat.price,
        quantity: cat.quantity,
      });
    });
    localStorage.setItem('categories', JSON.stringify(categories));
  });
const showCategories = () => {
  console.log(categories[0].name);
  const categories_arr = `  <div class="analytics">
            <div class="card" onclick="bietThu()">
              <div class="card-head">
                <h2>${categories[0].name}</h2>
                <span class="las la-user-friends"></span>
              </div>
              <div class="card-progress">
                <small>Danh mục 12</small>
                <div class="card-indicator">
                  <div class="indicator one" style="width: 60%"></div>
                </div>
              </div>
            </div>

            <div class="card" onclick="Phong()">
              <div class="card-head">
                <h2>${categories[1].name}</h2>
                <span class="las la-eye"></span>
              </div>
              <div class="card-progress">
                <small>Danh mục 10</small>
                <div class="card-indicator">
                  <div class="indicator two" style="width: 80%"></div>
                </div>
              </div>
            </div>

            <div class="card" onclick="hangDong()">
              <div class="card-head">
                <h2>${categories[2].name}</h2>
                <span class="las la-shopping-cart"></span>
              </div>
              <div class="card-progress">
                <small>Danh mục 11</small>
                <div class="card-indicator">
                  <div class="indicator three" style="width: 65%"></div>
                </div>
              </div>
            </div>

            <div class="card" onclick="Coffee()">
              <div class="card-head">
                <h2>${categories[3].name}</h2>
                <span class="las la-envelope"></span>
              </div>
              <div class="card-progress">
                <small>Danh mục 5</small>
                <div class="card-indicator">
                  <div class="indicator four" style="width: 90%"></div>
                </div>
              </div>
            </div>
          </div>`;
  document.querySelector('#categories').innerHTML = categories_arr;
};

showCategories();
function bietThu() {
  alert('bietthu');
  location.href = './crud.html';
}
function Phong() {
  alert('phong');
}
function hangDong() {
  alert('hangdong');
}
function Coffee() {
  alert('caphe');
}
