import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoading = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return { isLoading, onSubmit };
};
