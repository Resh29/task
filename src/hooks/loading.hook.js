import React, { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const changeLoadingState = (isLoading) => {
    setLoading(isLoading);
  };
  return [loading, changeLoadingState];
};
