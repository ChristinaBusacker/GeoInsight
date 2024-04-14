import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './SearchInput.css'
import { useQuery } from '@apollo/client';
import { GET_ADRESS_BY_QUERY_QUERY } from '../../gql/getAdressByQuery.query';
import { setUrl } from '../../utils/setUrl';

export const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.length > 2) {
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }, 800);

        return () => clearTimeout(handler);
    }, [inputValue]);


    if (inputValue.length > 2 && showSuggestions) {
        const { data } = useQuery(GET_ADRESS_BY_QUERY_QUERY, {
            variables: { query: inputValue },
            skip: !inputValue,
            onCompleted: (data) => {

                console.log(data)

                const suggestions = data.getAddressByQuery.map((suggestion) => {
                    return {
                        ...suggestion.address,
                        lat: suggestion.lat,
                        lng: suggestion.lon
                    }
                })

                setSuggestions(suggestions);


                console.log(suggestions)
            }
        });
    }

    const selectSuggestion = (lat, lng) => {
        setUrl(lat, lng)
        setSuggestions([])
    }

    const createAdressString = (parts) => {
        const filtered = parts.filter(part => part)
        return filtered.join(', ')
    }



    return (
        <Fragment>
            <div id="searchbar">
                <input
                    type="text"
                    placeholder="Adresse suchen"
                    onInput={(e) => setInputValue(e.target.value)}
                />
                {showSuggestions && (
                    <div id="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div onClick={() => { selectSuggestion(suggestion.lat, suggestion.lng) }} className="suggestion" key={index}>{createAdressString([suggestion.road, suggestion.houseNumber, suggestion.houseNumber, suggestion.city, suggestion.country])}</div>
                        ))}
                    </div>
                )}
            </div>

        </Fragment>
    );
};
