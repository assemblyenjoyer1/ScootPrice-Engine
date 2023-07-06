import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {logout} from './Login';

export default function CalculatePrice() {


    // ___VARIABLES___
    const [enteredUnit, setEnteredUnit] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();

    const renderInputForm = (placeholder: string) => (
        <div>
            <div>
                <input
                    className="App-inputText"
                    type="number"
                    min="0"
                    placeholder={placeholder}
                    value={enteredUnit ?? ""}
                    onChange={(event) =>
                        setEnteredUnit(event.target.value !== "" ? Number(event.target.value) : null)
                    }
                />
            </div>
            <button className="App-button" type="submit">
                Calculate
            </button>
        </div>
    );

    useEffect(() => {
        validateToken()
    }, []);

    const validateToken = () => {
        const token = localStorage.getItem('access_token')
        if (token === null) {
            console.log("TOKEN IS NULL")
            navigate("/login");
        } else {
            const formattedToken = token.replace(/^"(.*)"$/, '$1');
            handleAuthentication(formattedToken)
        }
    };

    const handleAuthentication = async (token: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/validate-token?token=" + token, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status == 200) {
                const data = await response.json();
                console.log("USER IS LOGGED IN: " + data);
                if (!data){
                    navigate("/login");
                }
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const newToken = token.replace(/^"(.*)"$/, '$1');
            setToken(newToken);
        }
    }, []);

    //___SEND POST___
    const makePriceRequest = async (url: string) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
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
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (enteredUnit !== null && selectedUnit === 0) {
            const url = "http://localhost:8080/api/calculator/price/time?value=" + enteredUnit;
            await makePriceRequest(url);
        }
        if (enteredUnit !== null && selectedUnit === 1) {
            const url = "http://localhost:8080/api/calculator/price/distance?value=" + enteredUnit;
            await makePriceRequest(url);
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
                <img src={require("./scooteq.png")} alt="png"
                     style={{height: '300px', width: 'auto', maxWidth: '100%'}}/>
            </div>
            <h2 className="App-subtitle">Calculate the price</h2>
            {price !== null ? (                              //when the price is calculated...
                <div style={{marginTop: '30px'}}>
                    <h2 className="App-text">Calculated Price</h2>
                    <h1>{price.toFixed(2)}€</h1>
                    <a href="/prices" className="App-button">New calculation</a>
                </div>
            ) : (                                                //before the price is calculated
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
                    {selectedUnit !== null && selectedUnit === 0 && renderInputForm("Enter minutes")}
                    {selectedUnit !== null && selectedUnit === 1 && renderInputForm("Enter kilometers")}
                </form>
            )}
            {errorMessage && <p>{errorMessage}</p>}
            <a href="/login" onClick={logout} className="App-logout-link">
                Logout
            </a>
        </div>
    )
}
