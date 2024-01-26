const url = 'http://localhost:3000/users';
fetch(url)
  .then((data) => data.json())
  .then((users) => {
    const user_arr = users.map((user) => {
      return ` <tr>
                    <td>#${user.id}</td>
                    <td>
                      <div class="client">
                        <div
                          class="client-img bg-img"
                          style="background-image: url(${user.img})"
                        ></div>
                        <div class="client-info">
                          <h4>${user.username}</h4>
                          <small>${user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>${user.watch}</td>
                    <td>19 April, 2022</td>
                    <td>${user.bill}</td>
                    <td>
                      <div class="actions">
                        <span class="lab la-telegram-plane"></span>
                        <span class="las la-eye"></span>
                        <span class="las la-ellipsis-v"></span>
                      </div>
                    </td>
                  </tr>`;
    });
    document.querySelector('#users').innerHTML += user_arr.join('');
  });
