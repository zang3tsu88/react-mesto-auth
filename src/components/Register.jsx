import classNames from "classnames";

function Register({ buttonText }) {
  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <form
        // onSubmit={onSubmit}
        className={"entry__form"}
        name="register"
        method="POST"
        // noValidate
      >
        <input
          className="entry__input"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="entry__input"
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <button
          className={classNames("entry__submit-btn", {
            // "entry__submit-btn_inactive": !isValid || !isDirty,
          })}
          type="submit"
          aria-label={buttonText}
          // disabled={!isValid || !isDirty}
        >
          {buttonText}
        </button>
      </form>
      <a href="#" className="entry__link">
        Уже зарегистрированы? Войти
      </a>
    </div>
  );
}

export default Register;
