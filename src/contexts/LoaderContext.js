import React, { createContext, useState } from "react";

export const LoaderContext = createContext();

const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, toggleLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
