import { useContext, useEffect, useState } from "react";
import Map from "./Map";
import { MapViewContext } from "../context/mapViewProvider";
import { v4 as uuid } from 'uuid';
import { INITIAL_ZOOM, NOJA_CENTER_COORDS } from "../constantes";
import { addLefletControls } from "../utilities/leaflet_utilities";
import { mapaBaseNoja } from "../utilities/leaflet_idena_utilities";
import './map.css';
import Toolbar from "./toolbar/toolbar";

const HomePage = () => {


    const { mapView, setMapView } = useContext(MapViewContext)
    const [uid, setUid] = useState(null);

    //const [mapView, setMapView] = useState();

    useEffect(() => {
        let uid = uuid()
        setUid(uid)
    }, []);

    useEffect(() => {
        if (!uid) return;

        if (mapView) {
            mapView.remove();
        }

        // Crear el mapa y centrarlo en Tudela
        var mapViewAux = window.L.map("map_" + uid, {
            crs: window.L.CRS.EPSG3857,
            minZoom: 5,
            scrollWheelZoom: true,
            bearing: 0,
            //ROTACIÓN
            rotate: true,
            attributionControl: false,
            rotateControl: {
                closeOnZeroBearing: false,
                position: 'topright',
            }
            //scale: idena_scale
        }).setView(NOJA_CENTER_COORDS, INITIAL_ZOOM);

        //Crea y añade una graphics layer al mapa
        mapViewAux.graphicsLayer = window.L.featureGroup().addTo(mapViewAux);
        mapViewAux.selectionGraphicsLayer = window.L.featureGroup().addTo(mapViewAux);

        //Almacenamos el uid en el propio mapa
        mapViewAux.uid = uid;

        //Almacenamos la extensión inicial
        mapViewAux.initialExtent = mapViewAux.getBounds()

        //Para poder tarastarlo desde fuera
        window.map = mapViewAux;

        mapViewAux.basemap = mapaBaseNoja()
        mapViewAux.basemapName = "mapaBaseNoja";
        mapViewAux.basemap.addTo(mapViewAux);

        //Añadimos controles de leaflet, luego los ocultaremoms para controlarlos desde nuestra toolbar
        addLefletControls(mapViewAux)

        //Con esto inicamos el estado del mapa, que se usará para iniciar el resto de componentes
        setMapView(mapViewAux);


    }, [uid]);



    return (
        <>
            {uid &&
                <div className='app-container'>
                    <div className='map' id={"map_" + uid}>
                        {mapView && <Map></Map>}
                        {mapView && <Toolbar></Toolbar>}
                    </div>
                </div>
            }
        </>
    );
}

export default HomePage