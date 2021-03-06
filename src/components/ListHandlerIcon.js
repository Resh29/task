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
    <span className="badge">
      <a href="#" className="to-detail">
        <i
          className=" small material-icons"
          onClick={(e) => {
            e.preventDefault();

            params.handler();
          }}
        >
          {iconType[status]}
        </i>
      </a>
    </span>
  );
}
