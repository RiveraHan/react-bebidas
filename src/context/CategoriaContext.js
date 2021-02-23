import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

// Crear el Context
export const CategoriasContext = createContext();

// Povider es donde se encuentra las funciones y state
const CategoriaProvider = (props) => {
    // Crear el state del context
    const [categorias, setCategorias] = useState();

    // Ejecutar el llamado a la API
    useEffect(() => {
        const obtenerCategorias = async () =>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

            const categorias = await axios.get(url);
            setCategorias(categorias.data.drinks);
            
        }

        obtenerCategorias();
    }, [])

    return(

        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >

            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriaProvider;


