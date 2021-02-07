import React, { useState, useContext } from 'react';
import { TaskItem } from './TaskItem';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { useSetData } from '../hooks/db.set';
import { useMessage } from '../hooks/message.hook';
import firebase from 'firebase';
import { useUpdateData } from '../hooks/db.update';

export const TasksList = ({ props = { class: '', header: '', tasks: [] } }) => {
  const setData = useSetData();
  const [setState] = useContext(DataContext);
  const message = useMessage();
  const setUpdate = useUpdateData();
  const [styles, setStyles] = useState([props.class, 'collection-header']);
  const [currentStyles, setCurr] = useState(
    styles.toString().split(',').join(' ')
  );

  const { state, isAdmin, changeToken } = useContext(AuthContext);

  const updateData = async (object) => {
    const updated = {
      ...object,
      status: 'progress',
    };
    try {
      const check = (
        await firebase
          .database()
          .ref(`/tasks/${object.taskNumber}/status`)
          .once('value')
      ).val();

      if (check !== 'awaiting') {
        message('task-already-in-progress');
        return;
      } else {
        setData(`/users/${state.uid}/tasks/${updated.taskNumber}`, updated);
        setUpdate(`/tasks/${updated.taskNumber}`, updated, '/tasks');
        message('personal-list-task-add');
      }
    } catch (error) {
      message(error.message);
    }
  };

  return (
    <ul className="collapsible collection with-header">
      <li className={props.class + ' collection-header'}>
        <h6>{props.header}:</h6>
      </li>

      {props.tasks.length
        ? props.tasks.map((task) => (
            <TaskItem props={{ task, updateData }} key={task.taskId} />
          ))
        : null}
    </ul>
  );
};
