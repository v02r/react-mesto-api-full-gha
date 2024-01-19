import React from "react";
import logo from "../images/header-logo.svg";
import {Link, useLocation} from "react-router-dom";

const Header = ({ onLogout, isLoggedIn, email}) => {
    const {pathname} = useLocation()

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип Место"/>

            {!isLoggedIn && (
                pathname === "/sign-up" ? (
                    <Link className="header__navbutton" to="/sign-in">
                        Войти
                    </Link>
                ) : (
                    <Link className="header__navbutton" to="/sign-up">
                        Регистрация
                    </Link>
                ))}

            {
                isLoggedIn && (
                    <nav className="header__user">
                        <span>{email}</span>
                        <button onClick={onLogout} className="header__logout">
                            Выйти
                        </button>
                    </nav>
                )
            }
        </header>
    );
};

export default Header;
