class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Ошибка при обработке запроса');
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _handleResponseError(err) {
    console.log('Ничего не получилось');
    return Promise.reject(err.message);
  }

  getDefaultUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  createCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  editUser(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.vocation,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  likeCards(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  disLikeCards(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  deleteCard(cardId) {
    //console.log(cardId);
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }
}

export { Api };
