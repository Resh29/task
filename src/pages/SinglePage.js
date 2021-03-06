import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useGetSingleTask } from '../hooks/db.getSingle';
import { useRemoveData } from '../hooks/db.remove';
import { useSetData } from '../hooks/db.set';
import { useMessage } from '../hooks/message.hook';

export const SinglePage = () => {
  const { state, setState, isAdmin } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [minLength, setMinLength] = useState(10);
  const remove = useRemoveData();
  const history = useHistory();
  const message = useMessage();
  const setData = useSetData();

  const location = useLocation();
  const [getData, data, loading] = useGetSingleTask();
  useEffect(() => {
    getData(`/tasks/${location.state}`);
  }, []);

  const changeHandler = (e) => {
    setComment(e.target.value);
  };
  const saveTasks = () => {
    if (data.user === state.uid) {
      if (comment.length >= minLength) {
        setData(`tasks/${data.taskNumber}`, {
          ...data,
          status: 'done',
          comment,
        });
        setData(`users/${state.uid}/tasks/${data.taskNumber}`, {
          ...data,
          status: 'done',
          comment,
        });
        message('saved-successfully');
        history.push('/my_list');
      } else {
        message('save-error');
        return;
      }
    } else {
      message('limited-by-user-rights');
    }
  };
  const deleteTasks = () => {
    if (data.user === state.uid || isAdmin) {
      setData(`deleted/${location.state}`, { ...data, satatus: 'deleted' });
      remove(`/users/${state.uid}/tasks/${location.state}`);
      remove(`tasks/${location.state}`);
      message('task-remove');
      history.push('/');
    } else {
      message('limited-by-user-rights');
    }
  };

  return (
    <>
      <div className="single">
        {loading ? (
          <Loader />
        ) : data ? (
          <div className="row">
            <p className="flow-text">
              Заявка # {data.taskNumber}
              <span className="badge grey lighten-4">Статус: {data.status}</span>
            </p>
            <h4 className="title">{data.title}</h4>
            <ul className="collection">
              <li className="collection-item">
                <span>Type:</span> {data.type}
                <span className="badge">
                  Date:
                  {data.date}
                </span>
              </li>
              <li className="collection-item">
                Заказчик: {data.customer}
                <span className="badge"> ID:{data.customerId} </span>
              </li>
              <li className="collection-item">Информация: {data.techInfo} </li>
              <li className="collection-item">
                Адрес: <span className="badge">{data.address}</span>
              </li>
              <li className="collection-item">
                <p> Текст заявки: {data.text} </p>
              </li>
              <li className="collection-item">
                {data.comment ? (
                  <p> {data.comment} </p>
                ) : (
                  <div className="input-field col s12 ">
                    <textarea
                      required
                      id="comment"
                      type="text"
                      name="comment"
                      className="materialize-textarea"
                      value={comment}
                      onChange={changeHandler}
                      length="10"
                    />
                    <span
                      className="grey-text"
                      style={comment.length >= minLength ? { opacity: '0' } : { opacity: '1' }}
                    >
                      Комментарий не должен быть короче {minLength} символов
                    </span>

                    <label htmlFor="comment">Комментарий</label>
                  </div>
                )}
              </li>
            </ul>
            <div
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                padding: '1rem',
              }}
            >
              <button className="btn blue" onClick={saveTasks} disabled={data.comment}>
                Сохранить
              </button>
              <button className="btn red" onClick={deleteTasks} disabled={data.comment && !isAdmin}>
                Удалить
              </button>
            </div>
          </div>
        ) : (
          history.push('/')
        )}
      </div>
    </>
  );
};
