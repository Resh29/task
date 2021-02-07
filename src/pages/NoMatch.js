import { React } from 'react';
import { useHistory } from 'react-router-dom';

export const NoMatch = () => {
  const history = useHistory();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Error <span className="text-red">404</span>: page is not found!
      </h1>
      <button
        className="btn blue"
        onClick={() => {
          history.push('/');
        }}
      >
        go back
      </button>
    </div>
  );
};
