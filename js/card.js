const initialCards = [
  {
    name: 'Павловск',
    link: 'https://images.unsplash.com/photo-1571680233390-b0061928cea0',
  },
  {
    name: 'Судак',
    link: 'https://images.unsplash.com/photo-1550399741-599433fae4d1',
  },
  {
    name: 'Тула',
    link: 'https://images.unsplash.com/photo-1545736522-b347030de513',
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6',
  },
  {
    name: 'Микли',
    link: 'https://images.unsplash.com/photo-1555948560-27b32a752ff3',
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc',
  },
];

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.element_template').content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__place').textContent = this._name;
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton = this._element.querySelector('.element__like');
    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.body.append(cardElement);
});
