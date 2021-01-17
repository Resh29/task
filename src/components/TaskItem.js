import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { useSetData } from '../hooks/db.set';
import { useMessage } from '../hooks/message.hook';
import firebase from 'firebase';

export const TaskItem = ({ props }) => {
  const [style, setStyle] = useState('collapsible-body');
  const { state } = useContext(AuthContext);
  const setData = useSetData();
  const [setState] = useContext(DataContext);
  const message = useMessage();

  const changeDataHandler = async () => {
    const updateDataState = {
      ...props,
      status: 'progress',
    };

    try {
      const currentDatabaseTaskItemValue = (
        await firebase
          .database()
          .ref(`/tasks/${props.taskNumber}/status`)
          .once('value')
      ).val();
      console.log(currentDatabaseTaskItemValue);
      if (currentDatabaseTaskItemValue === 'awaiting') {
        setState([]);
        setData(
          `/tasks/${updateDataState.taskNumber}/status`,
          updateDataState.status
        );
        setData(
          `/users/${state.uid}/tasks/${updateDataState.taskNumber}`,
          updateDataState
        );
        const fetchedData = (
          await firebase.database().ref(`/tasks`).once('value')
        ).val();
        const data = Object.keys(fetchedData).map((key) => ({
          ...fetchedData[key],
          taskNumber: key,
        }));
        setState(data);
        message('personal-list-task-add');
      } else {
        message('task-already-in-progress');
      }
    } catch (error) {
      message();
    }
  };

  function toggle() {
    !style.includes('open')
      ? setStyle(style + ' open')
      : setStyle(style.replace('open', ''));
  }

  return (
    <li>
      <div className="collapsible-header">
        {props.status === 'awaiting' ? (
          <a href="#" className="to-detail">
            <i
              className="text-green small material-icons"
              onClick={(e) => {
                e.preventDefault();
                changeDataHandler();
              }}
            >
              done
            </i>
          </a>
        ) : (
          <a className="to-detail" href="#">
            <i
              className=" small material-icons"
              onClick={(e) => {
                e.isPropagationStopped();
                e.preventDefault();
              }}
            >
              create
            </i>
          </a>
        )}

        <span>
          <h6> {props.title}</h6>
        </span>
        <span>
          Type: {props.type} <br></br> Date: {props.date}
        </span>

        <a
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggle();
          }}
        >
          details...
        </a>
      </div>
      <div className={style}>
        <span>
          ID {props.taskId} Address: {props.address}
        </span>
        <span> Client info: {props.customer}</span>
        <span>Client ID: {props.customerId} </span>
        <p> Tech.info: {props.techInfo} </p>
        <strong> Status: {props.status} </strong>
        <p>Text: {props.text}</p>
      </div>
    </li>
  );
};
