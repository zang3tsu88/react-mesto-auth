import classNames from "classnames";

function Login({ buttonText }) {
  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <form
        // onSubmit={onSubmit}
        className={"entry__form"}
        name="login"
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
    </div>
  );
}

export default Login;
