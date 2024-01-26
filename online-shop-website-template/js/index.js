const total = document.getElementById('total');
fetch(`http://localhost:3000/categories`)
  .then((data) => data.json())
  .then((categories) => {
    console.log(categories);
    const cat_arr = categories.map((cat) => {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1" onclick="filterCategories('${cat.ct}')">
                    <a class="text-decoration-none" href="">
                        <div class="cat-item d-flex align-items-center mb-4">
                            <div class="overflow-hidden" style="width: 100px; height: 100px;">
                                <img class="img-fluid" src="${cat.images}" alt="${cat.name}">
                            </div>
                            <div class="flex-fill pl-3">
                                <h6> ${cat.name}</h6>
                                <small class="text-body">100 Products</small>
                            </div>
                        </div>
                    </a>
                </div>`;
    });
    document.querySelector('#categories').innerHTML = cat_arr.join('');
  });

fetch(`http://localhost:3000/Favorite`)
  .then((data) => data.json())
  .then((products) => {
    pro_arr = products.map((pro) => {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid  w-100" src="${
                          pro.images
                        }" alt="${pro.name}">
                        <div class="product-action">
                            <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                              pro.id
                            },'${pro.name}','${
        pro.images
      }','${Intl.NumberFormat('vi-VN', 'currency').format(
        pro.price
      )}')"><i class="fa fa-shopping-cart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                            <a class="btn btn-outline-dark btn-square" href="#" onclick="donhangchitiet(${
                              pro.id
                            },'${pro.name}','${
        pro.images
      }','${Intl.NumberFormat('vi-VN', 'currency').format(pro.price)}','${
        pro.description
      }','${pro.amenities}')"><i class="fa fa-search"" ></i></a>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" href="">${
                          pro.name
                        }</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>${Intl.NumberFormat('vi-VN', 'currency').format(
                              pro.price * 0.9
                            )}vnd</h5><h6 class="text-muted ml-2"><del>${Intl.NumberFormat(
        'vi-VN',
        'currency'
      ).format(pro.price)}vnd</del></h6>
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
    </div>`;
    });
    document.querySelector('#products').innerHTML += pro_arr.join('');
  });
/// product recent
fetch(`http://localhost:3000/Room`)
  .then((data) => data.json())
  .then((products) => {
    pro_arr = products.map((pro) => {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${pro.images}" alt="${
        pro.name
      }" />
              <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href="#"
                  onclick = "themvaogio(${pro.id},'${pro.name}','${
        pro.images
      }','${Intl.NumberFormat('vi-VN', 'currency').format(
        pro.price
      )}' )"> <i class="fa fa-shopping-cart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="far fa-heart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-sync-alt"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href="#"
                  onclick="donhangchitiet(${pro.id},'${pro.name}','${
        pro.images
      }','${Intl.NumberFormat('vi-VN', 'currency').format(pro.price)}','${
        pro.description
      }','${pro.amenities}')"><i class="fa fa-search"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href=""
                >${pro.name}</a
              >
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>${Intl.NumberFormat('vi-VN', 'currency').format(
                  pro.price
                )}</h5>
                <h6 class="text-muted ml-2"><del>${Intl.NumberFormat(
                  'vi-VN',
                  'currency'
                ).format(pro.price * 0.9)}</del></h6>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mb-1"
              >
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>(99)</small>
              </div>
            </div>
          </div>
        </div>`;
    });
    document.querySelector('#ProductRecent').innerHTML += pro_arr.join('');
  });

function filterCategories(name) {
  document.querySelector('#products').innerHTML = '';
  event.preventDefault();
  fetch(`http://localhost:3000/${name}`)
    .then((data) => data.json())
    .then((products) => {
      pro_arr = products.map((pro) => {
        // console.log(obj);
        return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid  w-100" src="${
                          pro.images
                        }" alt="${pro.name}">
                        <div class="product-action">
                            <a class="btn btn-outline-dark btn-square" href="#" onclick = "themvaogio(${
                              pro.id
                            },'${pro.name}','${
          pro.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(
          pro.price
        )}')"><i class="fa fa-shopping-cart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                            <a class="btn btn-outline-dark btn-square" href="#" onclick="donhangchitiet(${
                              pro.id
                            },'${pro.name}','${
          pro.images
        }','${Intl.NumberFormat('vi-VN', 'currency').format(pro.price)}','${
          pro.description
        }','${pro.amenities}')"><i class="fa fa-search"" ></i></a>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" href="">${
                          pro.name
                        }</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>${Intl.NumberFormat('vi-VN', 'currency').format(
                              pro.price * 0.9
                            )}vnd</h5><h6 class="text-muted ml-2"><del>${Intl.NumberFormat(
          'vi-VN',
          'currency'
        ).format(pro.price)}vnd</del></h6>
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
    </div>`;
      });
      document.querySelector('#products').innerHTML += pro_arr.join('');
      // document.getElementById('numcart').textContent = cart.length;
    });
}
