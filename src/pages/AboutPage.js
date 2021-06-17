export const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="container">
        <h2 className="text-center"> Про приложение </h2>
        <p>
          Данное приложение является учебным проектом с целью ознакомления с библиотекой
          реакт.
        </p>
        <p>
          Приложение дает возможность создавать определенные задания, которые могут брать
          "в работу" пользователи приложения.
        </p>
        <blockquote>
        Для создания задания необходимо выполнить вход под аккаунтом с правами доступа
        </blockquote>
         
        
        <ul>
          <li>
            Login:
            <span className="blue-text"> adminadmin@gmail.com </span>
          </li>
          <li>
            Password:
            <span className="blue-text"> 123123 </span>
          </li>
        </ul>
        <p>
          Далее любой пользователь может взять заявку в работу и "выполнить" ее, оставив
          соответствующий комментарий под заданием.
        </p>
      </div>
    </section>
  );
};
