import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const TaskItem = ({ props }) => {
  const [style, setStyle] = useState('collapsible-body');
  const { state } = useContext(AuthContext);
  const history = useHistory();

  function toggle() {
    !style.includes('open')
      ? setStyle(style + ' open')
      : setStyle(style.replace('open', ''));
  }

  return (
    <li>
      <div className="collapsible-header">
        {props.task.status === 'awaiting' &&
        !window.location.pathname.includes('create') ? (
          <a href="#" className="to-detail">
            <i
              className="text-green small material-icons"
              onClick={(e) => {
                e.preventDefault();
                props.updateData({ ...props.task, user: state.uid });
              }}
            >
              done
            </i>
          </a>
        ) : null}
        {props.task.status === 'progress' || props.task.status === 'done' ? (
          <>
            <a href="#" className="to-detail">
              <i
                className="text-green small material-icons"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(
                    `/task/${props.task.taskNumber}`,
                    props.task.taskNumber
                  );
                }}
              >
                create
              </i>
            </a>
          </>
        ) : null}

        <span>
          <h6> {props.task.title}</h6>
        </span>
        <span>
          Type: {props.task.type} <br></br> Date: {props.task.date}
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
          ID {props.task.taskId} Address: {props.task.address}
        </span>
        <span> Client info: {props.task.customer}</span>
        <span>Client ID: {props.task.customerId} </span>
        <p> Tech.info: {props.task.techInfo} </p>
        <strong> Status: {props.task.status} </strong>
        <p>Text: {props.task.text}</p>
      </div>
    </li>
  );
};
