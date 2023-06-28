import React, { useState } from "react";

export default function CalculatePrice() {
    // ___VARIABLES___
    const [enteredUnit, setEnteredUnit] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const renderInputForm = (placeholder: string) => (
        <div>
            <div>
                <input
                    className="App-inputText"
                    type="text"
                    pattern="[0-9]*" //hi
                    inputMode="numeric"
                    placeholder={placeholder}
                    value={enteredUnit ?? ""}
                    onChange={(event) => {
                        const input = event.target.value;
                        const numbersOnly = input.replace(/\D/g, "");
                        setEnteredUnit(numbersOnly !== "" ? Number(numbersOnly) : null);
                    }}
                />
            </div>
            <button className="App-button" type="submit">
                Calculate
            </button>
        </div>
    );

    //___SEND POST___
    const makePriceRequest = async (url: string) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        console.log("entered handleSubmit");
        if (enteredUnit !== null && selectedUnit === 0) {
            console.log("entered if with time");
            const url = `http://localhost:8080/api/calculator/price/time?time=${enteredUnit}&userID=1`;
            await makePriceRequest(url);
        }
        if (enteredUnit !== null && selectedUnit === 1) {
            console.log("entered if with distance");
            const url = `http://localhost:8080/api/calculator/price/distance?distance=${enteredUnit}&userID=1`;
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
                <img
                    src={require("./scooteq.png")}
                    alt="png"
                    style={{ height: "300px", width: "auto", maxWidth: "100%" }}
                />
            </div>
            <h2 className="App-subtitle">Calculate the price</h2>
            {price ? (
                <div style={{ marginTop: "30px" }}>
                    <h2 className="App-text">Calculated Price</h2>
                    <h1>{price.toFixed(2)}€</h1>
                    <a href="/prices" className="App-button">
                        New calculation
                    </a>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <select
                            className="App-dropdown"
                            value={selectedUnit ?? ""}
                            onChange={(event) =>
                                setSelectedUnit(event.target.value !== "" ? Number(event.target.value) : null)
                            }
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
        </div>
    );
}
