import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom"
import { api } from "../../services/api";

import './styles.scss';

export const Details = () => {
  const { params } = useRouteMatch();
  const [character, setCharacter] = useState({});
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    api.get(`people/${params.id}`).then(res => {
      setStarships([]);

      for (let starship of res.data.starships) {
        let urlStarships = starship.substring(20, starship.length);

        api.get(urlStarships).then(s => {
          let starshipData = {
            ...s.data,
            id: s.data.url.substring(31, 33).replace('/', '')
          }
          setStarships(state => [...state, starshipData])
        })
      }

      const urlPlanet = res.data.homeworld.substring(20, res.data.homeworld.length)
      api.get(urlPlanet).then(response => {
        let data = {
          ...res.data,
          planet: response.data.name
        }

        setCharacter(data);
      })
    })
  }, [params.id])

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="details-character">
            <img src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`} alt="" />

            <div className="description-character">
              <p>{character.name}</p>
              <div className="caracteristics">
                <span>
                  Gender: {character.gender}
                </span>
                <span>
                  Skin Color: {character.skin_color}
                </span>
              </div>
              <div className="caracteristics">
                <span>
                  Height: {character.height}
                </span>
                <span>
                  Mass: {character.mass}
                </span>
              </div>
              <div className="caracteristics">
                <span>
                  Birth Year: {character.birth_year}
                </span>
                <span>
                  Planet: {character.planet}
                </span>
              </div>
            </div>
          </div>

          <div className="details-starships-container">
            <h3>Starships</h3>
            <div className="grid-3_xs-1 grid-equalHeight">
              {starships.map(starship => (
                <div className="col" key={starship.id}>
                  <div className="details-starships-content">
                    <img src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
                      alt={starship.name}
                    />
                    <span>{starship.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {!starships.length && <p style={{ textAlign: 'center', marginTop: '15px' }}>Doesn't have ships</p>}
          </div>
        </div>
      </div>
    </>
  )
}
