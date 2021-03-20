import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

export function ListHandlerIcon({ params }) {
  const [status, setStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isAllPage, setIsAllPage] = useState(false);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setStatus(params.status);
  }, [params]);

  useEffect(() => {
    if (location.pathname === '/create') {
      setIsOpen(false);
    }
    if (location.pathname === '/all') {
      setIsAllPage(true);
    }
  }, [status]);

  const iconType = {
    awaiting: 'done',
    done: 'done_all',
    progress: 'create',
  };

  return (
    <>
      {isOpen ? (
        isAllPage ? (
          <span
            className="badge"
            style={{ zIndex: '11' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              history.push(`/task/${params.number}`, params.number);
            }}
          >
            <a href="#" className="to-detail">
              <i className=" small material-icons"> create </i>
            </a>
          </span>
        ) : (
          <span
            className="badge"
            style={{ zIndex: '11' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              params.handler();
            }}
          >
            <a href="#" className="to-detail">
              <i className=" small material-icons">{iconType[status]}</i>
            </a>
          </span>
        )
      ) : null}
    </>
  );
}
