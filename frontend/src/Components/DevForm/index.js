import React, {useState, useEffect } from 'react';

import './styles.css';

function DevForm( { onSubmit }){
    const [github_username, setGihubUsername] = useState('');
    const [techs, setTechs] = useState('');

    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
          (position) =>{
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (er) => {
            console.log(er);
          },
          {
            timeout: 3000,
          }
        )
      },
      []);

      async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGihubUsername('');
         setTechs('');
      }

    return(
    <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label  htmlFor="github_username">Usuário Github</label>
          <input 
            value={github_username}
            name="github_username" 
            id="github_username" 
            required 
            onChange={e => setGihubUsername(e.target.value)}
            />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input 
            value={techs}
            name="techs" 
            id="techs" 
            required 
            onChange={ e => setTechs(e.target.value)}
            />
        </div>
        
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
              type="number" 
              name="latitude" 
              id="latitude" 
              required 
              value={latitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input 
              type="number" 
              name="longitude" 
              id="longitude" 
              required 
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Salvar</button>
      </form>)
}

export default DevForm;