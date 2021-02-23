import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriaContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    
    const {categorias} = useContext(CategoriasContext);
    const {setGuardarBusqueda, setConsulta} = useContext(RecetasContext);
    // leer contenidos

    /**
     * @function handleObtenerDatosReceta
     * @description Utilizado con el onChange. Captura el valor del evento de su input y capturado por el metodo onChange, toma su valor y Actualiza el state de busqueda.
     * @param {string} e El nombre de la busqueda
     * @returns {void}
     */
    const handleObtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return (  
       <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault(); 
                setGuardarBusqueda(busqueda);
                setConsulta(true);
            }}
       >
           <fieldset className="text-center">
               <legend>Busca bebidas por categoría o Ingredientes</legend>
           </fieldset>
           <div className="row mt-4">
               <div className="col-md-4">
                   <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={handleObtenerDatosReceta}
                   />
               </div>
               <div className="col-md-4">
                   <select
                        className="form-control"
                        name="categoria"
                        onChange={handleObtenerDatosReceta}
                   >
                       <option value="">-- Selecciona Categoría --</option>
                       {(categorias ? 
                            categorias.map(categoria => (
                                <option
                                     key={categoria.strCategory}
                                     value={categoria.strCategory}
                                >{categoria.strCategory}</option>
                            ))
                        : null )}
                   </select>
               </div>
               <div className="col-md-4">
                   <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                   />
               </div>
           </div>
       </form>
    );
}
 
export default Formulario;