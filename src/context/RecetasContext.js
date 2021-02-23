import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';

export const RecetasContext = createContext();

const RecetasProvider = props => {

    const [recetas, setRecetas] = useState([]);
    const [busqueda, setGuardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    const [consulta, setConsulta] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {
        if(consulta) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

                const resultado = await axios.get(url);

                setRecetas(resultado.data.drinks);
                
            }

            obtenerRecetas();
        }
    }, [busqueda])

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                setGuardarBusqueda,
                setConsulta
            }}
        >

            {props.children}
        </RecetasContext.Provider>

    );
}

export default RecetasProvider;