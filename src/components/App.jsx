import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
//in case avatar wont load from server
import defaultAvatarImage from "../images/loading_circle.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Loading name...",
    about: "Loading about...",
    avatar: defaultAvatarImage,
    // в будущем заменить на какую-нибудь картинку загрузки
    // (кружочек загрузки например. гифка или css)
  });
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);

  //Pop-ups
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  useEffect(() => {
    api
      .getCards()
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCurrentUser()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOnOverlayClick(e) {
      if (e.target.classList.contains("popup_active")) {
        closeAllPopups();
      }
    }

    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isImagePopupOpen ||
      isConfirmPopupOpen
    ) {
      document.addEventListener("keyup", closeOnEsc);
      document.addEventListener("click", closeOnOverlayClick);
    }
    return () => {
      document.removeEventListener("click", closeOnOverlayClick);
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
    isConfirmPopupOpen,
  ]);
  // да, массив я забыл. Только не совсем понял, вы это имели ввиду? "перечислить все состояния модальных окон"
  // как-то много всего, неужели это необходимо? Может просто [] оставить, без проверки?

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirm(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      // .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api
      .createNewUser(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      // .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);

    api
      .createNewAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      // .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // не знаю, с изменением на finally, я теперь даже с slow 3g не успеваю заметить изменения кнопки.. только у удаления карточки.
  // хотя, я понял почему надо на это поменять. Просто изначально мне казалось что при ошибки как раз должно зависнуть на сохранении и выдать ошибку. Это явно дает понять что проблема

  function handleAddPlaceSubmit(userCard) {
    setIsLoading(true);

    api
      .createNewCard(userCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      // .then(() => setIsLoading(false))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const isLoggedIn = false;

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        {isLoggedIn && (
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteConfirm={handleCardDeleteConfirm}
            cards={cards}
          />
        )}

        <Register buttonText={"Зарегистрироваться"} />
        {/* <Login buttonText={"Войти"} /> */}
        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
