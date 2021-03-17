import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function ListHandlerIcon({ params }) {
  const [status, setStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  useEffect(() => {
    setStatus(params.status);
  }, [params]);

  useEffect(() => {
    if (
      location.pathname === '/create' ||
      (location.pathname === '/all' && status === 'awaiting')
    ) {
      setIsOpen(false);
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
      ) : null}
    </>
  );
}
