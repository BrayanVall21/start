import React, { createContext, useState, useContext } from 'react';

const ResultadosContext = createContext();


export const ResultadosProvider = ({ children }) => {
  const [iResultados, setIResultados] = useState(null);
  const [eResultados, setEResultados] = useState(null);

  return (
    <ResultadosContext.Provider value={{ iResultados, setIResultados, eResultados, setEResultados }}>
      {children}
    </ResultadosContext.Provider>
  );
};


export const useResultados = () => useContext(ResultadosContext);


export default ResultadosProvider;
