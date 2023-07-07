import { createContext, useState } from "react";



//recibe un prop llamada children -> componente hijo dentro del proveedor contexto
export const ThemeContextProvider = ({ children }) => {
  //use state para crear variable de estado -> inicializada con el valor light
  const [theme, setTheme] = useState("light");

  //funcion para cambiar el tema 
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    //acepta un prop llamado value donde define el valor del contexto que compartira con los componente hijos
    //porpiedas theme y toggletheme represnetan el tema actual y funcion para cambiar
    //se renderiza el componente children asegura que los componente hijos envueltos en ThemeContext.Provides tengan acceso al contenito proporcionado
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};



export const ThemeContext = createContext();