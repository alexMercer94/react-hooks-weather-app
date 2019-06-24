import React, { useState } from 'react';

const Form = ({ dataConsult }) => {
    // state del componente
    // `search` = state, `saveSearch` = this.setState({})
    const [search, saveSearch] = useState({
        city: '',
        country: ''
    });

    const handleChange = e => {
        // Cambiar el state
        saveSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const consultWeather = e => {
        e.preventDefault();
        //Pasar hacia el componente principal la busqueda del usuario
        dataConsult(search);
    };

    return (
        <form onSubmit={consultWeather}>
            <div className="input-field col s12">
                <input type="text" name="city" id="city" onChange={handleChange} />
                <label htmlFor="city">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select onChange={handleChange} name="country">
                    <option value="">Selecciona un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
            </div>
            <div className="input-field col s12">
                <input
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    value="Buscar Clima"
                />
            </div>
        </form>
    );
};

export default Form;
