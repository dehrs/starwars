import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { Loader } from "../../components/Loader";
import { Caracteristics } from '../../components/Caracteristics';

import { api } from "../../services/api";
import axios from "axios";

import './styles.scss';
import { Header } from "../../components/Header";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [urlPreviousPage, setUrlPreviousPage] = useState(null);
  const [urlNextPage, setUrlNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();


  useEffect(() => {
    api.get('people/').then(res => {
      setUrlPreviousPage(res.data.previous)
      setUrlNextPage(res.data.next)

      let data = res.data.results.map(result => ({
        ...result,
        id: result.url.substring(29, result.length).replace('/', ''),
        gender: result.gender === 'n/a' ? 'unknown' : result.gender
      }));
      setCharacters(data)
      setLoading(false);

    }).catch(err => {
      setLoading(false);
      history.push('/notfound')
    })

  }, [history]);


  const handleNextPage = (direction) => {
    axios.get(direction).then(res => {
      setUrlPreviousPage(res.data.previous)
      setUrlNextPage(res.data.next)

      let data = res.data.results.map(result => ({
        ...result,
        id: result.url.substring(29, result.length).replace('/', ''),
        gender: result.gender === 'n/a' ? 'unknown' : result.gender
      }))

      setCharacters(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  const handleDetailsPage = (id) => {
    history.push(`/details/${id}`);
  }


  return (
    <>
      <Header />
      {loading ? (<Loader />) : (
        <div className="container">
          <div className="grid-3_xs-1 grid-equalHeight">
            {characters.map(character => (
              <div className="col" key={character.id}>
                <div className="card-container">
                  <div className="card-content">
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
                      alt={character.name} />
                    <h3> {character.name}</h3>
                    <div className="card-details">
                      <Caracteristics label="Gender" description={character.gender} />
                      <Caracteristics label="Skin Color" description={character.skin_color} />
                    </div>
                    <div className="card-details">
                      <Caracteristics label="Height" description={character.height} />
                      <Caracteristics label="Mass" description={character.mass} />
                    </div>

                    <button type='button' onClick={() => handleDetailsPage(character.id)}>Details</button>
                  </div>
                </div>
              </div>

            ))}
          </div>

          <div className="button-footer">
            <button type="button" disabled={!urlPreviousPage} onClick={() => handleNextPage(urlPreviousPage)}>
              <FiArrowLeft size={20} />
            </button>
            <button type="button" disabled={!urlNextPage} onClick={() => handleNextPage(urlNextPage)}>
              <FiArrowRight size={20} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
