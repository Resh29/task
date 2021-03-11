import React, { useEffect, useState } from 'react';

export function ListHandlerIcon({ params }) {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    setStatus(params.status);
  }, [params]);

  const iconType = {
    awaiting: 'done',
    done: 'done_all',
    progress: 'create',
  };

  return (
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
  );
}
