import { createContext, useState, useEffect } from "react";
import { CONFIG_PATH } from '../constantes';
//Crea el contexto
export const ConfigMapContext = createContext()

//Provee el contexto
export const ConfigMapProvider = ({ children }) => {

    const [config, setConfig] = useState({})
    const [loading, setLoading] = useState(false);
    const [dataPath, setDataPath] = useState(null)


    const getData = async () => {
        setLoading(true)
        let path = `${CONFIG_PATH}`
        console.log(path+'/config_layers.json')
        setDataPath(path)
        await fetch(`${path}/config_layers.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data)
                setConfig(data)
            })
            .catch((error) => console.error("Error al cargar el JSON:", error));
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <ConfigMapContext.Provider value={{ loading, config, setConfig, dataPath }}>
            {children}
        </ConfigMapContext.Provider>
    )
}