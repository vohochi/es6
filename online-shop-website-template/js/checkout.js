//   const response = await fetch('https://api.vietqr.io/v2/banks');
//   const { data } = await response.json();
// const res = await fetch('https://provinces.open-api.vn/api/?depth=3');
//const results = await res.json();
const billingAddress = document.getElementById('billingAddress');
var users = JSON.parse(localStorage.getItem('users'));
fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((data) => {
    billingAddress.innerHTML = `<div class="row">
                        <div class="col-md-6 form-group">
                            <label>First Name</label>
                            <input class="form-control" type="text" placeholder="Chí">
                        </div>
                        <div class="col-md-6 form-group" >
                            <label>Tỉnh/ Thành phố</label>
                            <input class="form-control" type="text" placeholder="TP.HCM"> 
                            <div id="city">
                            </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>E-mail</label>
                            <input class="form-control" type="text" value="${
                              data.at(-1).email
                            }">
                        </div>
                        <div class="col-md-6 form-group" >
                        <label>Quận/ Huyện</label>
                            <input class="form-control" type="text" placeholder="+123 456 789">
                            <div id="village"> </div>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Số điện thoại</label>
                            <input class="form-control" type="text" placeholder="+123 456 789">
                        </div>
                        <div class="col-md-6 form-group" id="district">
                            <label>Phường/ Xã</label>
                            <input class="form-control" type="text" placeholder="123 Street">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Country</label>
                            <input class="form-control" type="text" value="Việt Nam">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Địa chỉ chi tiết</label>
                            <input class="form-control" type="text" placeholder="31A An Phú Đông Thạnh Xuân">
                        </div>
                        <div class="col-md-6 form-group" id ="zipCode">
                            <label>Zip code</label>
                            <input class="form-control" type="text" placeholder="New York">
                        </div>
                        <div class="col-md-6 form-group">
                        <label>Ngân hàng</label>
                        <input class="form-control" type="text" placeholder="BIDV, TECHCOMBANK, TP.BANK">
                        <div id="bank">
                        </div>
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="newaccount">
                                <label class="custom-control-label" for="newaccount">Create an account</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="shipto">
                                <label class="custom-control-label" for="shipto"  data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                            </div>
                        </div>
                    </div>`;
    // var cart = JSON.parse(localStorage.getItem('cart'));
    // const numcart = document.getElementById('numcart');
    // numcart.textContent = cart.length;
    // lay phan tu
    const city = document.getElementById('city');
    const village = document.getElementById('village');
    const district = document.getElementById('district');
    const zipCode = document.getElementById('zipCode');
    const bank = document.getElementById('bank');
    const div = document.createElement('div');
    // Tạo phần tử mới
    const showInfo = async () => {
      try {
        const res = await fetch('https://provinces.open-api.vn/api/?depth=3');
        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        throw new error(error, 'error');
      }
    };
    // console.log(showInfo());
    showInfo()
      .then((data) => {
        const input_name = city
          .closest('.col-md-6.form-group')
          .querySelector('input');
        data.forEach((e) => {
          const option = document.createElement('option');
          city.appendChild(option);
          option.textContent = e.name;
          option.addEventListener('click', (click) => {
            input_name.value = option.textContent;
            city.style.display = 'none';
          });
        });
        input_name.addEventListener('click', (click) => {
          city.style.display = 'block';
        });
        return data;
      })
      .then((data) => {
        // // console.log(data);
        // // data
        // //   .flatMap((e) => e.districts)
        // //   .forEach((el) => {
        // //     const option = document.createElement('option');
        // //     village.appendChild(option);
        // //     option.textContent = el.name;
        //   });
        // return data;
      })
      .then((data) => {
        // data
        //   .flatMap((e) => e.districts)
        //   .forEach((el) => {
        //     // console.log(el.wards.flatMap((Element) => Element.name));
        //   });
        // .forEach((el) => {
        //   const option = document.createElement('option');
        //   districts.appendChild(option);
        //   option.textContent = el.name;
        //   console.log(el);
        // });
      });

    // show bank
    const showBank = async () => {
      try {
        const res = await fetch('https://api.vietqr.io/v2/banks');
        const { data } = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        throw new alert(error, 'erorr fetch data');
      }
    };
    showBank().then((data) => {
      data.forEach((e) => {
        const option = document.createElement('option');
        const img = document.createElement('img');
        const bankSelect = document.createElement('div');
        bankSelect.setAttribute('id', 'bankSelect');
        img.setAttribute('src', e.logo);
        bankSelect.appendChild(img);
        bankSelect.appendChild(option);
        bank.appendChild(bankSelect);
        // console.log(bank);
        option.textContent = e.name;
      });
    });

    // const showCity = () => {};
    // // Su kien
    // city.addEventListener('click', showCity);
    var cart = JSON.parse(localStorage.getItem('cart'));
    cart.map((products) => {
      const product = `            
  <div class="d-flex justify-content-between imgCheckout">
                <img src="${products.image}" alt="">
                <p>${products.name}</p>
                <p class="pr">${products.price}</p>
                <p class="pq">X${products.quantity}</p>
                </div>
              `;
      document.getElementById('checkout').innerHTML += product;
    });
    document.getElementById('numcart').textContent = cart.length;

    var carts = JSON.parse(localStorage.getItem('carts'));
    carts.map((products) => {
      const product = `            
  <div class="d-flex justify-content-between mb-3">
                <h6>Tổng phụ</h6>
                <h6>${products.total}</h6>
                </div>
              `;
      document.getElementById('checkPrice').innerHTML += product;
      document.getElementById('tc').textContent = products.total;
    });
  });
