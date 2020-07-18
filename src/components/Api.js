class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // _handleResponse(response) {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     console.log('_handleResponse rejection');
  //     //return Promise.reject(response.statusText);
  //   }
  // }

  // _handleResponseError(err) {
  //   console.log('_handleResponseError');
  //   //return Promise.reject(err.message);
  // }
  getDefaultUserInfo() {
    return fetch(this.baseUrl, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        return res.json(); // возвращаем результат работы метода и идём в следующий then
      })
      .then((data) => {
        //console.log(data.name);
        return data; // если мы попали в этот then, data — это объект
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        return res.json(); // возвращаем результат работы метода и идём в следующий then
      })
      .then((data) => {
        //console.log(data);
        return data; // если мы попали в этот then, data — это объект
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
      });
  }

  createCard(data) {
    return fetch(this.baseUrl, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
    //     .then(this._handleResponse)
    //     .catch(this._handleResponseError)
    // }
  }

  editUser(data) {
    return fetch(this.baseUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.vocation,
      }),
    })
      .then((res) => {
        return res.json(); // возвращаем результат работы метода и идём в следующий then
      })
      .then((data) => {
        //console.log(data);
        return data; // если мы попали в этот then, data — это объект
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
      });
  }
}

export { Api };
