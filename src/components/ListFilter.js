import React, { useEffect, useRef, useState } from 'react';

export const ListFilter = ({ submitAction }) => {
  const dateInput = useRef(null);
  const [currentDate, setDate] = useState('');

  const [visibility, setVisibility] = useState(false);

  const options = {
    format: 'dd.mm.yyyy',
  };
  useEffect(() => {
    const date = new Date(Date.now()).toLocaleDateString();
    setDate(date);
    if (window.M) {
      const elems = document.querySelectorAll('.datepicker');
      const instances = window.M.Datepicker.init(elems, options);
    }
  }, [setDate]);

  const formToggler = () => {
    setVisibility(!visibility);
  };

  let className = 'row date-filter';

  return (
    <>
      <form
        className={visibility ? className : (className += ' date-filter-close')}
        onSubmit={(e) => {
          e.preventDefault();
          submitAction(dateInput.current.value);
        }}
      >
        <fieldset style={{ borderRadius: '5px' }}>
          <legend className="grey-text"> Заявки по дате: </legend>
          <div className="col m2 input-field">
            <i className="material-icons prefix "> date_range</i>

            <input ref={dateInput} id="dateInput" type="text" className="datepicker" placeholder="Выберите дату" />
          </div>
          <div className="col s12 m2 input-field">
            <input className="btn" type="submit" value="Применить" />
          </div>
          <div className="col m2 offset-m4 input-field">
            <span className="flow-text"> {currentDate} </span>
          </div>
        </fieldset>
      </form>
      <button className="btn-flat blue-text date-filter-toggler" onClick={formToggler}>
        {visibility ? 'hide' : 'Поиск по дате...'}
      </button>
    </>
  );
};
