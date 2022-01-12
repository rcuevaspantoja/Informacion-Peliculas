import React, { useState } from "react";
import './ListaPeliculas.css';
import { makeStyles } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//estilo de carta para Houm
const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        margin: 'auto',
        marginTop:'40px'
    }
})

const ListaPeliculas = (props) => {

    //estilos y variables
    const estilo = useStyles();
    const [peliculaDetallada, setPeliculaDetallada] = useState([]);

    //llamamos denuevo a la Api para solicitar la información detallada de la película o serie 
    const getpeliculas = async (imdbID) => {

        const url = `https://www.omdbapi.com/?apikey=b2d98c6e&i=${imdbID}`
        
        const respuesta = await fetch(url);
        const respuestaJson = await respuesta.json();
     
        //volvemos a pasar a una constante el detalle de la pelicula
        setPeliculaDetallada(respuestaJson);
        mostrar();
    };

    const mostrar = () => {
        abrirCerrarModalPelicula()
    }
    //modales
    const[modalPelicula, setModalPelicula] = useState(false);

    //cambia el estado del modal cuando se haga click
    const abrirCerrarModalPelicula = () => {
        setModalPelicula(!modalPelicula);
    }

    //div del modal
    const bodyModalPelicula=(
            <div className="peliculaseleccionada">
                <Card className={estilo.root} sx={{ display: 'flex' }}>

                    <Box sx={{ m: 2 }}>
                        <img src={peliculaDetallada.Poster} alt="Poster not found." height="auto" width="auto" backgroundimage=""></img>
                    </Box>

                    <Box sx={{ m: 2}}>
                        <Typography gutterBottom variant="h6">
                            Title: <Typography display="inline">{peliculaDetallada.Title}</Typography>
                        </Typography>

                        <Typography variant="h6">
                            Year: <Typography display="inline">{peliculaDetallada.Year}</Typography>            
                        </Typography>

                        <Typography variant="h6">
                            Genre: <Typography display="inline">{peliculaDetallada.Genre}({peliculaDetallada.Rated})</Typography>           
                        </Typography>

                        <Typography variant="h6">
                            Director: <Typography display="inline">{peliculaDetallada.Director}</Typography>   
                        </Typography>

                        <Typography variant="h6">
                            Actors: <Typography display="inline">{peliculaDetallada.Actors}</Typography>  
                        </Typography><br/>

                        
                        <Typography variant="body1">
                            {peliculaDetallada.Plot}
                        </Typography><br/>

                        <Box textAlign='center'> 
                            <Button nameClass="boton_naranja" 
                            href={`https://www.youtube.com/results?search_query=${peliculaDetallada.Title} trailer`} 
                            target="_blank"
                            variant="contained" style={{ background: '#ff5000' }}>
                                Watch Trailer
                            </Button> 
                        </Box>

                    </Box>
                    
                    <Box>
                    <IconButton variant="contained" onClick={() => {abrirCerrarModalPelicula()}}>
                        <CloseIcon/>
                    </IconButton>
                    </Box>
                </Card>
            </div>
            
    )

    return (
        <>
            {props.peliculas.map((pelicula, index) => (
            <Grid alignItems="stretch" item xs={12} sm={6} md={4} lg={3} xl={2}>         
                <Card className="peliculas">
                    <CardActionArea>                                  
                        <CardMedia
                        component="img"
                        height="525"
                        image={pelicula.Poster}
                        alt="Poster not Found."
                        onClick={() => {getpeliculas(pelicula.imdbID)}}
                        />
                    </CardActionArea> 
           
                </Card>
                <div className="hide">
                        <Typography variant="h6">About this {pelicula.Type}</Typography>
                </div>  
                <Modal
                    open={modalPelicula}
                    onClose={abrirCerrarModalPelicula}
                    BackdropProps={{style: {backgroundColor: "#454545", opacity: "0.09"}}}>
                        {bodyModalPelicula}
                        
                </Modal>     
            </Grid> 
            ))}
        </>
    );
};
export default ListaPeliculas;
