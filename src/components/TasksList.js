import React, { useState, useContext, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { AuthContext } from '../context/AuthContext';

export const TasksList = ({
  props = { class: '', header: '', tasks: [] },
  someVoid,
}) => {
  const [styles, setStyles] = useState(['collection-header', props.class]);
  const [currentStyles, setCurr] = useState(
    styles.toString().split(',').join(' ')
  );

  const { state, isAdmin, changeToken } = useContext(AuthContext);

  return (
    <ul className="collapsible collection with-header">
      <li className={currentStyles}>
        <h6>{props.header}:</h6>
      </li>

      {props.tasks.length
        ? props.tasks.map((task) => (
            <TaskItem
              props={{ ...task, isAdmin }}
              someVoid={someVoid}
              key={task.customerId}
            />
          ))
        : null}
    </ul>
  );
};
