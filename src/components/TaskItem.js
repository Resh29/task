import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ListHandlerIcon } from './ListHandlerIcon';

export const TaskItem = ({ props }) => {
  const [style, setStyle] = useState('collapsible-body');
  const [location, setLocation] = useState(false);
  const { state } = useContext(AuthContext);

  const history = useHistory();

  function toggle() {
    !style.includes('open') ? setStyle(style + ' open') : setStyle(style.replace('open', ''));
  }
  function update() {
    props.updateData({ ...props.task, user: state.uid });
  }
  function detail() {
    history.push(`/task/${props.task.taskNumber}`, props.task.taskNumber);
    console.log(props.task.taskNumber);
  }
  function handler() {
    if (props.task.status === 'awaiting') {
      update();
    } else {
      detail();
    }
  }
  useEffect(() => {
    const l = history.location.pathname;
    console.log(state);
    if (l.includes('all')) {
      setLocation(true);
    }
  }, [history.location.pathname]);
  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    window.M.Collapsible.init(elems);
  }, []);

  return (
    <li>
      <div className="collapsible-header">
        <p>
          {' '}
          Исполнитель: <span className="badge"> {props.task.name} </span>{' '}
        </p>
        <div>
          <hr />
        </div>

        <h6>
          {' '}
          {props.task.title} <ListHandlerIcon params={{ status: props.task.status, handler }} />
        </h6>

        <p>
          Type: {props.task.type} <span className="badge">Date: {props.task.date}</span>
        </p>

        {/* <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          details...
        </a> */}
      </div>
      <div className={style}>
        <p>ID {props.task.taskId}</p>
        <p>
          Address: <span className="badge"> {props.task.address}</span>
        </p>
        <p>
          Client info: <span className="badge">{props.task.customer}</span>
        </p>
        <p>
          Client ID: <span className="badge">{props.task.customerId}</span>
        </p>
        <p>
          Tech.info: <span className="badge">{props.task.techInfo}</span>
        </p>
        <p>
          Status: <span className="badge">{props.task.status}</span>
        </p>
      </div>
    </li>
  );
};
