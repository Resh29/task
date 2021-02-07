import React, { useEffect, useState } from 'react';
import { TasksList } from '../components/TasksList';
import firebase from 'firebase';
import { useSetData } from '../hooks/db.set';
import { useMessage } from '../hooks/message.hook';

export const Create = () => {
  const [state, setState] = useState(null);
  const message = useMessage();

  const localState = () => {
    return JSON.parse(localStorage.getItem('newTasks')) || [];
  };
  const [tasks, setTasks] = useState(localState);
  const [textLength, setTextLength] = useState(140);
  useEffect(() => {
    let elems = document.querySelectorAll('select');
    const instances = window.M.FormSelect.init(elems);
  });

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    e.preventDefault();
    const date = new Date(Date.now()).toLocaleDateString();
    const taskId = Date.now();
    const status = 'awaiting';

    const newTasks = { ...state, date, taskId, status };
    localStorage.setItem('newTasks', JSON.stringify([...tasks, newTasks]));
    setTasks(localState);
    setState(null);
    e.target.reset();
  };

  const saveTasks = async () => {
    try {
      for (const task of tasks) {
        let taskNumber = (
          await firebase.database().ref('task_number').once('value')
        ).val();
        await firebase
          .database()
          .ref(`tasks/${taskNumber + 1}`)
          .set(task);
        await firebase
          .database()
          .ref('task_number')
          .set(taskNumber + 1);
      }

      message('tasks-add');

      deleteTasks();
    } catch (error) {
      message(error.code);
    }
  };
  const deleteTasks = () => {
    localStorage.removeItem('newTasks');
    setTasks([]);
  };
  return (
    <div className="row">
      <form
        className="col s12"
        style={{ marginTop: '2rem' }}
        onSubmit={addTask}
      >
        <h3> New task </h3>
        <div className="row">
          <div className="input-field col s12 m6">
            <input
              id="title"
              type="text"
              name="title"
              required
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="title">title</label>
          </div>
          <div className="input-field col s12 m6">
            <select name="type" id="type" required onChange={changeHandler}>
              <option selected disabled required>
                {' '}
                Choose task type{' '}
              </option>
              <option defaultValue="repair">repair</option>
              <option defaultValue="build">build</option>
              <option defaultValue="distroy">distroy</option>
            </select>
          </div>
          <div className="input-field col s12 m6">
            <input
              required
              id="address"
              type="text"
              name="address"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="address">address</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              required
              id="techInfo"
              type="text"
              name="techInfo"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="techInfo">techInfo</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              required
              id="customer"
              type="text"
              name="customer"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="customer">customer</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              required
              id="customerId"
              type="text"
              name="customerId"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="customerId">customerId</label>
          </div>
          <div className="input-field col s12 m6">
            <textarea
              required
              id="text"
              type="text"
              name="text"
              className="validate materialize-textarea"
              onChange={changeHandler}
              maxLength={textLength}
            />
            {state && state.text && state.text.length ? (
              <span className="character-counter" style={{ float: 'right' }}>
                {state.text.length} / {textLength}
              </span>
            ) : null}

            <label htmlFor="text">text</label>
          </div>
          <input
            type="submit"
            value="Add task"
            className="btn"
            style={{ marginLeft: '1rem' }}
          />
        </div>
      </form>

      <TasksList
        props={{
          class: 'white black-text',
          header: 'New tasks',
          tasks,
        }}
      />
      <div
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          padding: '1rem',
        }}
      >
        <button className="btn" onClick={saveTasks}>
          Save
        </button>
        <button className="btn red" onClick={deleteTasks}>
          Delete
        </button>
      </div>
    </div>
  );
};
