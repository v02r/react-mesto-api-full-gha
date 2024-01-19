import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/Auth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [successRegister, setSuccessRegister] = useState(false);

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);

    useEffect(() => {
        if(isLoggedIn) {
            api
                .getInitialCards()
                .then((res) => {
                    setCards(res);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            api
                .getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [isLoggedIn]);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
    };
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (isLiked) {
            api
                .unlikeCard(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        } else {
            api
                .likeCard(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }

    function handleCardDelete(id) {
        api
            .deleteCard(id)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateUser(data) {
        api
            .editUserInfo(data)
            .then((res) => {
                console.log("updateUser", res)

                setCurrentUser(prev  => ({...prev, ...res}));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateAvatar(data) {
        api
            .editAvatar(data.avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlaceSubmit(data) {
        api
            .addCard(data.name, data.link)
            .then((newCard) => {
                setCards([newCard.card, ...cards]);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    const navigate = useNavigate();

    const handleRegistration = (data) => {
        return authApi.register(data)
            .then((data) => {
                if(data) {
                    setSuccessRegister(true);
                    navigate("/sign-in", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsInfoTooltipOpen(true);
            });
    };

    const handleAuthorization = (data) => {
        return authApi.login(data)
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true);
                    console.log(res)
                    api.setAuthorization(res.token)
                    localStorage.setItem("jwt", res.token);
                    setEmail(data.email);
                    navigate("/", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate("/sign-in", {replace: true});
    };

    const handleTokenCheck = (jwt) => {
        authApi.getUserInfo(jwt)
            .then((data) => {
                if(data) {
                    setEmail(data.email);
                    api.setAuthorization(jwt)
                    setIsLoggedIn(true);
                    navigate("/", {replace: true});
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {

        const jwt = localStorage.getItem("jwt");
        console.log(jwt);

        if (!jwt) {
            return;
        }
        handleTokenCheck(jwt);
    }, []);

    console.log(cards)

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} email={email}/>

                <Routes>
                    <Route
                        path="/sign-in"
                        element={<Login onLogin={handleAuthorization}/>}
                    />

                    <Route
                        path="/sign-up"
                        element={<Register onRegister={handleRegistration}/>}
                    />

                    <Route path={"/"} element={
                        <ProtectedRoute isLogin={isLoggedIn} >
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                cards={cards}
                                onCardDelete={handleCardDelete}
                            />
                        </ProtectedRoute>

                    }/>

                    <Route path={"*"} element={<Navigate to="/" replace/>}/>
                </Routes>

                {isLoggedIn && <Footer/>}

                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />

                <AddPlacePopup
                    onAddPlace={handleAddPlaceSubmit}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />

                <section
                    className="popup popup_type_delete"
                    id="popup__delete-confirmation"
                >
                    <div className="popup__container">
                        <button className="popup__cancel-button" type="button"></button>
                        <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>
                        <button id="delete-card" className="popup__end-button">
                            Да
                        </button>
                    </div>
                </section>

                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={successRegister}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
