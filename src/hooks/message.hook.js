export const useMessage = () => {
  const errorMessages = {
    'logout/message': 'Пользователь завершил сеанс!',
    'auth/user-not-found': 'Неверный логин или пароль учетной записи!',
    'auth/email-already-in-use': 'Пользователь с таким логином уже существует!',
    'auth/invalid-email': 'Некорректный эмейл!',
    'auth/weak-password': 'Пароль должен быть не менее 6 символов!',
    'tasks-add': 'Новые заявки успешно добавлены в работу...',
    'personal-list-task-add': 'Заявка взфта в работу',
    'task-already-in-progress':
      'Oops, заявка уже в работе... Обновите страницу',
  };
  function f(message = '') {
    if (window.M) {
      let html = errorMessages[message] || 'Что-то пошло не так... ' + message;
      return window.M.toast({ html });
    }
  }

  return f;
};
