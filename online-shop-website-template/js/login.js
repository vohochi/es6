const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
let state;
fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((users) => {
    // var users = JSON.parse(localStorage.getItem('users'));
    // Show input error message
    function showError(input, message) {
      input.className = 'form-control error';
      const small = input.parentElement.querySelector('small');
      small.innerText = message;
      state = false;
    }

    // Show success outline
    function showSuccess(input) {
      const formControl = input;
      formControl.className = 'form-control success';
      state = true;
    }

    // Check required fields
    function checkRequired(inputArr) {
      inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
          showError(input, `${getFieldName(input)} is yêu cầu`);
        } else {
          showSuccess(input);
        }
      });
    }

    // Get fieldname
    function getFieldName(input) {
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    const matchedUser = () => {
      users.findIndex((user) => {
        const stateM =
          user.username == username.value && user.password == password.value;
        // console.log(user.username == username.value);
        if (stateM) {
          alert('ok');
          location.href = 'index.html';
        } else {
          // showError();
          // alert('ko');
        }
      });
    };

    // Event listeners
    form.addEventListener('submit', function (e) {
      event.preventDefault();

      checkRequired([username, password]);
      matchedUser();
      // if (matchedUser) {
      //   // Đăng nhập thành công
      //   // console.log('o k');
      // } else {
      //   console.log('sai');
      //   // Sai tài khoản hoặc mật khẩu
      // }
    });
  });
