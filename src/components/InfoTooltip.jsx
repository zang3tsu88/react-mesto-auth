import classNames from "classnames";
import error from "../images/icon_error.svg";
import success from "../images/icon_success.svg";

const isError = true;

function InfoTooltip(isOpen, onClose) {
  let icon = isError ? error : success;
  return (
    <div
      className={classNames("popup", "popup_type_tooltip", "popup_active", {
        popup_active: isOpen,
      })}
    >
      <div className="tooltip">
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть попап"
        />
        <img className="tooltip__image" src={icon} alt={icon} />
        <p className="tooltip__text">
          Что-то пошло не так! Попробуйте ещё раз.
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
