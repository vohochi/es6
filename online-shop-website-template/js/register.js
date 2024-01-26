const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let state;
// Show input error message
function showError(input, message) {
  console.log(input);
  input.className = 'form-control error';
  const small = input.parentElement.querySelector('small');
  small.innerText = message;
  // console.log(small);
  // small.classList.add('form-control error');
  // small.style.visibility = 'visible';
  state = false;
}

// Show success outline
function showSuccess(input) {
  const formControl = input;
  formControl.className = 'form-control success';
  state = true;
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email không hợp lệ');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == '') {
      showError(input, `${getFieldName(input)} is yêu cầu`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} phải ít nhất ${min} ký tự`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)}Phải nhỏ hơn ${max} ký tự`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Mật khẩu không phù hợp');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  /// Kiem tra state
  if (state) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const imgRandom = Math.floor(Math.random() * 3) + 1;
    const user = {
      // id: ++i,
      img: `img/${imgRandom}.jpeg`,
      watch: 10,
      bill: 0,
      username: `${username.value}`,
      email: `${email.value}`,
      password: `${password.value}`,
    };
    users.push(user);
    const jsonUser = JSON.stringify(users);
    localStorage.setItem('users', jsonUser);
    // post lên json
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.href = '/login.html';
    // user.preventDefault();
  }
});
