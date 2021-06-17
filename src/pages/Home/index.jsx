import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft, FiLoader } from 'react-icons/fi'

import { api } from "../../services/api";
import axios from "axios";

import './styles.scss';

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [urlPreviousPage, setUrlPreviousPage] = useState(null);
  const [urlNextPage, setUrlNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();


  useEffect(() => {
    api.get('people/').then(res => {

      setUrlPreviousPage(res.data.previus)
      setUrlNextPage(res.data.next)

      let data = res.data.results.map(result => ({
        ...result,
        id: result.url.substring(28, 30).replace('/', ''),
        gender: result.gender === 'n/a' ? 'unknown' : result.gender
      }))
      setCharacters(data)
      setLoading(false);

    })
  }, []);

  const handleNextPage = () => {
    axios.get(urlNextPage).then(res => {
      setUrlPreviousPage(res.data.previous)
      setUrlNextPage(res.data.next)

      let data = res.data.results.map(result => ({
        ...result,
        id: result.url.substring(28, 30).replace('/', ''),
        gender: result.gender === 'n/a' ? 'unknown' : result.gender
      }))

      setCharacters(data)
    })
  }

  const handlePreviousPage = () => {
    axios.get(urlPreviousPage).then(res => {
      setUrlPreviousPage(res.data.previous)
      setUrlNextPage(res.data.next)

      let data = res.data.results.map(result => ({
        ...result,
        id: result.url.substring(28, 30).replace('/', ''),
        gender: result.gender === 'n/a' ? 'unknown' : result.gender
      }))

      setCharacters(data)
    })
  }

  const handleDetailsPage = (id) => {
    history.push(`/details/${id}`);
  }


  return (
    <>
      {loading ? (<FiLoader size={30} color="#dee2e6" className="loader" />) : (
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
                      <span> Gender: {character.gender}</span>
                      <span> Skin Color: {character.skin_color}</span>
                    </div>
                    <div className="card-details">
                      <span>Height: {character.height}</span>
                      <span>Mass: {character.mass}</span>
                    </div>

                    <button type='button' onClick={() => handleDetailsPage(character.id)}>Details</button>

                  </div>
                </div>
              </div>

            ))}
          </div>

          <div className="button-footer">
            <button type="button" disabled={!urlPreviousPage} onClick={() => handlePreviousPage()}>
              <FiArrowLeft size={20} />
            </button>
            <button type="button" disabled={!urlNextPage} onClick={() => handleNextPage()}>
              <FiArrowRight size={20} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
