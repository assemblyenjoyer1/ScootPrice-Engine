import React, {useState, useEffect} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export default function CalculatePrice() {

    //___"Classes"___

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
    const [enteredUnit, setEnteredUnit] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);
    const [errorMessage, setErrorMessage] = useState("");


    //___SEND POST___
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (enteredUnit !== null && selectedUnit === 0) {
            try {
                const response = await fetch("http://localhost:8080/api/calculator/price/time", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  // compile json
                        time: enteredUnit,
                        userID: 1,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Price:", data);
                    setPrice(data);
                    setErrorMessage("");
                } else if (response.status === 400) {
                    const message = await response.text();
                    setErrorMessage(message);
                }
            } catch (error) {
                console.error("Error while calculating: ", error);
            }
        }
        if (enteredUnit !== null && selectedUnit === 1) {
            try {
                const response = await fetch("http://localhost:8080/api/calculator/price/distance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  // compile json
                        distance: enteredUnit,
                        userID: 1,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Price:", data);
                    setPrice(data);
                    setErrorMessage("");
                } else if (response.status === 400) {
                    const message = await response.text();
                    setErrorMessage(message);
                }
            } catch (error) {
                console.error("Error while calculating: ", error);
            }
        }
    };

        return (
            <div className="App">
                      <a href="/">
        <img
          src={require("./scooteq_mini.png")}
          alt="Home"
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        />
      </a>
            <div className="App-title">
                <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }}/>
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
