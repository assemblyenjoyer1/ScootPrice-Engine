import React, {useState, useEffect} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export default function CalculatePrice() {

    //___"Classes"___

    type Genre = {
        id: number;
        name: string;
    };

    type Song = {
        id: string;
        name: string;
        album: {
            id: string;
            name: string;
            artist: {
                id: string;
                name: string;
            }
        };
    };

    type Playlist = {
        id: number;
        name: string | null;
        customer: string | null;
        songs: Song[];
        lastUsage: string;
    };

    // ___VARIABLES___
    const [genres, setGenres] = useState<Genre[]>([]); // initialize the state with an empty array
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);
    const [errorMessage, setErrorMessage] = useState("");


    //___GET GENRES___
    useEffect(() => {
        fetch('http://localhost:8080/api/user-story/genre')
            .then((response) => response.json())
            .then((data) => {
                setGenres(data); // set the fetched data to the genres state
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });
    }, []); // pass an empty array as second argument to execute the effect only once

    //___SEND POST___
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedGenre !== null && selectedUnit !== null) {
            try {
                const response = await fetch("http://localhost:8080/api/user-story/playlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  // compile json
                        genreId: selectedGenre,
                        amountOfSongs: selectedUnit,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Generated playlist:", data);
                    setGeneratedPlaylist(data);
                    setErrorMessage("");
                } else if (response.status === 400) {
                    const message = await response.text();
                    setErrorMessage(message);
                }
            } catch (error) {
                console.error("Error generating playlist: ", error);
            }
        }
    };

        return (
            <div className="App">
            <div className="App-title">
                <img src={require("./scooteq.png")} alt="png" style={{width: '40%', height: 'auto'}}/>
            </div>
                <h2 className="App-subtitle">Calculate the price</h2>
                {generatedPlaylist ? (                              //when the playlist is generated...
                    <div style={{marginTop: '30px'}}>
                        <h2 className="App-text">Generated Playlist</h2>
                        <table style={{margin: '0 auto', borderCollapse: 'separate', borderSpacing: '10px'}}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Album</th>
                                <th>Artist</th>
                            </tr>
                            </thead>
                            <tbody>
                            {generatedPlaylist.songs.map((song) => (
                                <tr key={song.id}>
                                    <td>{song.name}</td>
                                    <td>{song.album.name}</td>
                                    <td>{song.album.artist.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (                                                //before the playlist is generated
                    <form onSubmit={handleSubmit}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <select
                                className="App-dropdown"
                                value={selectedUnit ?? ""}
                                onChange={(event) => setSelectedUnit(event.target.value !== "" ? Number(event.target.value) : null)}
                            >
                                <option value="">Select a unit</option>
                                <option value="0">Time</option>
                                <option value="1">Distance</option>
                            </select>
                        </div>
                        {selectedUnit !== null && selectedUnit == 0 && (
                            <div>
                            <div>
                            <input 
                            className="App-inputText"
                            type="number" 
                            min="0"
                            placeholder="Enter minutes">
                            </input>
                            </div>
                            <button
                                className="App-button"
                                type="submit">
                                Calculate
                            </button>
                            </div>
                        )}
                        {selectedUnit !== null && selectedUnit == 1 && (
                            <div>
                            <div>
                            <input 
                            className="App-inputText"
                            type="number"
                            min="0"
                            placeholder="Enter kilometers">
                            </input>
                            </div>
                            <button
                                className="App-button"
                                type="submit">
                                Calculate
                            </button>
                            </div>
                        )}
                    </form>
                )}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        )
    }
