import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import { api } from "../../services/api";
import axios from "axios";

import './styles.scss';

export const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [urlNextPage, setUrlNextPage] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const handleArrayConstruction = useCallback((response) => {
        if (!response.next) {
            setHasMore(false);
            return;
        }

        let data = response.results.map(result => ({
            ...result,
            id: result.url.substring(28, 30).replace('/', ''),
            gender: result.gender === 'n/a' ? 'unknown' : result.gender
        }))


        setCharacters([...characters, ...data])

    }, [characters])

    useEffect(() => {
        api.get('people/').then(res => {
            setUrlNextPage(res.data.next)
            handleArrayConstruction(res.data)
        })
    }, []);


    const fetchMoreData = () => {
        axios.get(urlNextPage).then(res => {
            setUrlNextPage(res.data.next);
            handleArrayConstruction(res.data);
        })
    }

    return (
        <>
            <div className="container">
                <InfiniteScroll
                    dataLength={characters.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <ul className="card-container">
                        {characters.map(character => (
                            <li key={character.id} className="card-content">
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
                                    alt={character.name} />
                                <p> {character.name}</p>
                                <div className="card-details">
                                    <span>gender: {character.gender}</span>
                                    <span> skin-color: {character.skin_color}</span>
                                </div>
                                <div className="card-details">
                                    <span>height:{character.height}</span>
                                    <span>mass:{character.mass}</span>
                                </div>

                                <button type='button'>Details</button>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            </div>
        </>
    )
}