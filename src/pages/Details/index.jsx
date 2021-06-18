import { useEffect, useState } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom"
import { Caracteristics } from "../../components/Caracteristics";
import { Loader } from "../../components/Loader";
import { FiArrowLeft } from 'react-icons/fi'

import { Header } from '../../components/Header'

import axios from "axios";
import { api } from "../../services/api";

import './styles.scss';

export const Details = () => {
  const [character, setCharacter] = useState({});
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { params } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    api.get(`people/${params.id}`).then(res => {
      setStarships([]);

      for (let starship of res.data.starships) {
        axios.get(starship).then(s => {
          let starshipData = {
            ...s.data,
            id: s.data.url.substring(32, 34).replace('/', '')
          }
          setStarships(state => [...state, starshipData])
        })
      }

      axios.get(res.data.homeworld).then(response => {
        let data = {
          ...res.data,
          gender: res.data.gender === 'n/a' ? 'unknown' : res.data.gender,
          planet: response.data.name
        }

        setCharacter(data);
      })

      setLoading(false)
    }).catch(err => {
      setLoading(false)
      history.push('/notfound')
    })


  }, [params.id, history])

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (<Loader />) : (
          <>
            <Link to="/">
              <FiArrowLeft size={24} color="#ffffff" />
            </Link>
            <div className="content">
              <div className="details-character">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`} alt="" />
                <div className="description-character">
                  <h2>{character.name}</h2>

                  <div className="caracteristics">
                    <Caracteristics label="Gender" description={character.gender} />
                    <Caracteristics label="Skin Color" description={character.skin_color} right={true} />
                  </div>
                  <div className="caracteristics">
                    <Caracteristics label="Height" description={character.height} />
                    <Caracteristics label="Mass" description={character.mass} right={true} />
                  </div>
                  <div className="caracteristics">
                    <Caracteristics label="Birth Year" description={character.birth_year} />
                    <Caracteristics label="Planet" description={character.planet} right={true} />
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
          </>
        )}
      </div>
    </>
  )
}
