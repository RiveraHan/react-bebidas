import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ProPTypes from 'prop-types'


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // Configuraciones del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    // Extrar valores del context
    const {recetaDetalle, setIdReceta, setRecetaDetalle} = useContext(ModalContext);

    /**
     * @function handleMostrarIngredientes
     * @description Muestra y formatea los ingredientes. Recorre la data de la receta seleccionada por el id para generar un nuevo array de objetos con propiedades no null.
     * @param {Object} recetaDetalle El objecto de la api
     * @returns {Array} ingredientes: Todos los ingredientes
     */
    const handleMostrarIngredientes = recetaDetalle => {
        let ingredientes = [];

        for (let i = 0; i < 16; i++) {
            if(recetaDetalle[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{recetaDetalle[`strIngredient${i}`]} {recetaDetalle[`strMeasure${i}`]}</li>
                )
            }
            
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h4 className="card-header text-center">{receta.strDrink}</h4>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(receta.idDrink)
                            handleOpen();
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdReceta(null);
                            setRecetaDetalle({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetaDetalle.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {recetaDetalle.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={recetaDetalle.strDrinkThumb} />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {handleMostrarIngredientes(recetaDetalle)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}

Receta.propTypes = {

    receta: ProPTypes.object.isRequired
}
 
export default Receta;