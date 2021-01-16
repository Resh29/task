import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSetData } from '../hooks/db.set';

export const TaskItem = ({ props, someVoid }) => {
  const [style, setStyle] = useState('collapsible-body');
  const { state } = useContext(AuthContext);
  const set = useSetData;
  function setData() {
    set(`users/${state.uid}/tasks/${props.taskId}`, props);
  }

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
                someVoid(props);
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
