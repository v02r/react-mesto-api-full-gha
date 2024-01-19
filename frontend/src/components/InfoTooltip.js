import check from '../images/check.svg';
import xmark from '../images/xmark.svg';

const InfoTooltip = ({ isOpen , onClose, isSuccess }) => {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__cancel-button" onClick={onClose} />
                <img
                    src={isSuccess ? check : xmark}
                    alt={
                        isSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'
                    }
                    className="popup__bigicon"
                />
                <h3 className="popup__title-signup">
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
            </div>
        </div>
    );
};

export default InfoTooltip;
