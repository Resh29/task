export const useMessage = () => {
  const errorMessages = {
    'logout/message': 'Пользователь завершил сеанс!',
    'auth/user-not-found': 'Неверный логин или пароль учетной записи!',
    'auth/email-already-in-use': 'Пользователь с таким логином уже существует!',
    'auth/invalid-email': 'Некорректный эмейл!',
    'auth/weak-password': 'Пароль должен быть не менее 6 символов!',
  };
  function f(message) {
    if (window.M) {
      let html = errorMessages[message];
      return window.M.toast({ html });
    }
  }

  return f;
};
