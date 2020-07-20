import './index.css';
import { Api } from '../components/Api.js';
import { popupProfile, popupPlace, popupProfileName, popupProfileVocation, obj } from '../components/data/constants.js';
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
const name = document.querySelector('.profile__name');
const vocation = document.querySelector('.profile__vocation');
//let userId = api.getDefaultUserInfo(userId);
//console.log(userId);

Promise.all([api.getDefaultUserInfo(), api.getInitialCards()]).then((data) => {
  const validatorPlace = new FormValidator(obj, popupPlace);
  validatorPlace.enableValidation();
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
          {
            handleCardLike: () => {
              return;
            },
          },
          {
            handleCardDislike: () => {
              return;
            },

            // deleteCards: () => {
            //   popupCardDelete.open();
            //   popupCardDelete.handleButtonDeleteCard(data, function () {
            //     api.deleteCard(data._id);
            //   })
            // },
            // handleLike: () => {
            //   api.likeCards(data._id)
            //     .then((data) => {
            //       card.likeCounterCard(data.likes);
            //       card.likeCard();
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     })
            // },
            // handleDeleteLike: () => {
            //   api.deleteLike(data._id)
            //     .then((data) => {
            //       card.likeCounterCard(data.likes);
            //       card.likeCard();
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     })
            // }
          }
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
      api.createCard(data);
      const card = new Card(
        data,
        userId,
        '.element_template',
        {
          handleCardClick: () => {
            popupImage.open(data);
          },
        }

        // {
        //   handleCardDelete: () => {
        //     popupCardDelete.open();
        //   },
        // },
        // {
        //   handleCardLike: () => {
        //     api.likeCards(userId);
        //   },
        // }
      );
      const cardElement = card.generateCard();
      elements.addItem(cardElement);
    },
  });
  popupNewPlace.setEventListeners();
  //добавление картинки
  newCardButton.addEventListener('click', () => {
    validatorPlace.makeClear();
    popupNewPlace.open();
  });

  /*
    .catch((err) => {
      console.log(err)
    }) */
});

// api
//   .getDefaultUserInfo()
//   .then((result) => {
//     name.textContent = result.name;
//     vocation.textContent = result.about;
//     const avatar = document.querySelector('.profile__avatar');
//     avatar.src = result.avatar;
//     userId = result._id;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// apiDefaultUser
//   .getDefaultUserInfo()
//   .then((result) => {
//     name.textContent = result.name;

//     vocation.textContent = result.about;
//     const avatar = document.querySelector('.profile__avatar');
//     avatar.src = result.avatar;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const userInfo = newUser.getUserInfo(apiDefaultUser.getDefaultUserInfo());
// console.log(userInfo);

// const defaultCards = {
//   //`${baseUrl}/cards`
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
//   method: 'GET',
//   headers: {
//     authorization: 'f6237ee0-2461-4ab8-bf1b-c4683cc19aa7',
//     'Content-Type': 'application/json',
//   },
// };

// const apiDefaultCards = new Api(defaultCards);

//подтверждение удаления
const popupCardDelete = new PopupWithDelete('.popup_confirm', {
  formSubmitHandler: () => {},
});
popupCardDelete.setEventListeners();

//начальная загрузка
// const elements = new Section(
//   {
//     //items: data,
//     renderer: (item) => {
//       const card = new Card(
//         item,
//         '.element_template',
//         {
//           handleCardClick: () => {
//             popupImage.open(item);
//           },
//         },
//         {
//           handleCardDelete: () => {
//             popupCardDelete.open();
//           },
//         },
//         {
//           handleCardLike: () => {
//             api.likeCards(item._id);
//           },
//         }
//       );
//       const cardElement = card.generateCard();

//       return cardElement;
//     },
//   },
//   '.elements'
// );

// elements.renderItems(api.getInitialCards());

// api.getInitialCards().then((data) => {
//   console.log(data);
//   const elements = new Section(
//     {
//       items: data,
//       renderer: (item) => {
//         const card = new Card(item, '.element_template', {
//           handleCardClick: () => {
//             popupImage.open(item);
//           },
//         });
//         const cardElement = card.generateCard();

//         return cardElement;
//       },
//     },
//     '.elements'
//   );
//   elements.renderItems();
// });

//section
// const elements = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card(item, '.element_template', {
//         handleCardClick: () => {
//           popupImage.open(item);
//         },
//       });
//       const cardElement = card.generateCard();

//       return cardElement;
//     },
//   },
//   '.elements'
// );
// elements.renderItems();

//popup with image
const popupImage = new PopupWithImage('.popup__preview');
popupImage.setEventListeners();

//popup with forms
//place
// const popupNewPlace = new PopupWithForm('.popup_place', {
//   formSubmitHandler(data) {
//     api.createCard(data);
//     const card = new Card(
//       data,
//       '.element_template',
//       {
//         handleCardClick: () => {
//           popupImage.open(data);
//         },
//       }
//       // {
//       //   handleCardDelete: () => {
//       //     popupCardDelete.open();
//       //   },
//       // },
//       // {
//       //   handleCardLike: () => {
//       //     api.likeCards(userId);
//       //   },
//       // }
//     );
//     const cardElement = card.generateCard();
//     elements.addItem(cardElement);
//   },
// });
// popupNewPlace.setEventListeners();

//user
const newPopupProfile = new PopupWithForm('.popup_profile', {
  formSubmitHandler(person) {
    newUser.setUserInfo(person);
    api.editUser(person);
  },
});

newPopupProfile.setEventListeners();

//валидация форм
const validatorProfile = new FormValidator(obj, popupProfile);
//const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation();
//validatorPlace.enableValidation();

//редактирование профиля
editUser.addEventListener('click', () => {
  popupProfileName.value = name.textContent;
  popupProfileVocation.value = vocation.textContent;
  validatorProfile.makeClear();
  newPopupProfile.open();
});

// //добавление картинки
// newCardButton.addEventListener('click', () => {
//   validatorPlace.makeClear();
//   popupNewPlace.open();
// });

// новое

const changeAvatar = new PopupWithForm('.popup_avatar', {
  formSubmitHandler(avatar) {
    document.querySelector('.profile__avatar').src = avatar.avatar;
  },
});

changeAvatar.setEventListeners();
const editAvatar = document.querySelector('.profile__avatar-edit');
editAvatar.addEventListener('click', () => {
  changeAvatar.open();
});
