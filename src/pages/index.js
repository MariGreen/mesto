import './index.css';
import { Api } from '../components/Api.js';
import {
  popupProfile,
  popupPlace,
  popupAvatar,
  popupProfileName,
  popupProfileVocation,
  saveButtonProfile,
  confirmButton,
  saveButtonAvatar,
  saveButtonPlace,
  obj,
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { UserInfo } from '../components/UserInfo.js';

const editUser = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

//конфиг
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'f6237ee0-2461-4ab8-bf1b-c4683cc19aa7',
    'Content-Type': 'application/json',
  },
});

const newUser = new UserInfo('.profile__name', '.profile__vocation', '.profile__avatar');

Promise.all([api.getDefaultUserInfo(), api.getInitialCards()])
  .then((data) => {
    const validatorPlace = new FormValidator(obj, popupPlace);
    validatorPlace.enableValidation();

    const validatorAvatar = new FormValidator(obj, popupAvatar);
    validatorAvatar.enableValidation();

    const handleCard = {
      handleCardLike: (id) => {
        api
          .likeCards(id)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
      },

      handleCardDislike: (id) => {
        api
          .disLikeCards(id)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
          });
      },

      handleCardDelete: (card) => {
        popupCardDelete.open(card);
      },
    };

    const userId = data[0]._id;

    newUser.setUserInfo(data[0]);

    const elements = new Section(
      {
        items: data[1],
        renderer: (item) => {
          const card = new Card(
            item,
            userId,
            '.element_template',
            {
              handleCardClick: () => {
                popupImage.open(item);
              },
            },
            { handleCard }
          );
          const cardElement = card.generateCard();

          return cardElement;
        },
      },
      '.elements'
    );

    elements.renderItems();

    const popupNewPlace = new PopupWithForm('.popup_place', {
      formSubmitHandler(data) {
        saveButtonPlace.textContent = 'Сохранение...';
        api
          .createCard(data)
          .then((data) => {
            const card = new Card(
              data,
              userId,
              '.element_template',
              {
                handleCardClick: () => {
                  popupImage.open(data);
                },
              },
              { handleCard }
            );
            const cardElement = card.generateCard();
            elements.addItem(cardElement);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupNewPlace.close();
            saveButtonPlace.textContent = 'Сохранить';
          });
      },
    });

    popupNewPlace.setEventListeners();

    //сменить аватар
    const changeAvatar = new PopupWithForm('.popup_avatar', {
      formSubmitHandler(data) {
        document.querySelector('.profile__avatar').src = data.avatar;

        saveButtonAvatar.textContent = 'Сохранение...';
        api
          .updateAvatar(data.avatar)
          .then((result) => {
            newUser.setUserInfo(result);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            changeAvatar.close();
            saveButtonAvatar.textContent = 'Сохранить';
          });
      },
    });

    changeAvatar.setEventListeners();
    const editAvatar = document.querySelector('.profile__avatar-edit');
    editAvatar.addEventListener('click', () => {
      validatorAvatar.makeClear();
      changeAvatar.open();
    });

    //добавление картинки
    newCardButton.addEventListener('click', () => {
      validatorPlace.makeClear();
      popupNewPlace.open();
    });

    //подтверждение удаления
    const popupCardDelete = new PopupWithDelete('.popup_confirm', {
      formSubmitHandler: (card) => {
        confirmButton.textContent = 'Удаление...';
        api
          .deleteCard(card._idCard)
          .then((result) => {
            card._deleteElement();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupCardDelete.close();
            confirmButton.textContent = 'Да';
          });
      },
    });
    popupCardDelete.setEventListeners();
  })
  .catch((err) => {
    console.log(err);
  });

//popup with image
const popupImage = new PopupWithImage('.popup__preview');
popupImage.setEventListeners();

//user
const newPopupProfile = new PopupWithForm('.popup_profile', {
  formSubmitHandler(person) {
    saveButtonProfile.textContent = 'Сохранение...';
    api
      .editUser(person)
      .then((result) => {
        newUser.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPopupProfile.close();
        saveButtonProfile.textContent = 'Сохранить';
      });
  },
});

newPopupProfile.setEventListeners();

//валидация форм
const validatorProfile = new FormValidator(obj, popupProfile);
validatorProfile.enableValidation();

//редактирование профиля
editUser.addEventListener('click', () => {
  const currentUserInfo = newUser.getUserInfo();
  popupProfileName.value = currentUserInfo.name;
  popupProfileVocation.value = currentUserInfo.about;
  validatorProfile.makeClear();
  newPopupProfile.open();
});
