import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Error from './components/Error';
import Weather from './components/Weather';

function App() {
    // State principal
    // city = state. saveCity = this.setState()
    const [city, saveCity] = useState('');
    const [country, saveCountry] = useState('');
    const [error, saveError] = useState(false);
    const [resultData, saveResult] = useState({});

    useEffect(() => {
        // Prevenir la ejecución
        if (city === '') {
            return;
        }

        const consulAPI = async () => {
            const appID = 'a7653a205038707f13f20764a49db70a';
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

            // Consultar la url
            const response = await fetch(URL);
            const result = await response.json();

            // Guardar en el state el resultado de la consulta
            saveResult(result);
        };

        consulAPI();
    }, [city, country]);

    const dataConsult = data => {
        // Validar que ambos campos esten
        if (data.city === '' || data.country === '') {
            saveError(true);
            return;
        }

        // Ciudad y pais existen, agregarlos al state
        saveCity(data.city);
        saveCountry(data.country);
        saveError(false);
    };

    // Cargar un componente condicionalmente
    let component;
    if (error) {
        // Hay un error, mostrarlo
        component = <Error message="Ambos campos son obligatorios." />;
    } else if (resultData.cod === '404') {
        // En caso de que al hacer una consulta a la API no se encuentre una ciudad
        component = <Error message="La ciudad no existe en el registro. " />;
    } else {
        // Mostrar el clima
        component = <Weather result={resultData} />;
    }

    return (
        <div className="App">
            <Header title="Clima React App" />
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6">
                            <Form dataConsult={dataConsult} />
                        </div>
                        <div className="col s12 m6">{component}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
