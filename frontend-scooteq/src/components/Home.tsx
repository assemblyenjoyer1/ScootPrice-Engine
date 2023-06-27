import React from 'react';



export default function ChooseAction() {

    return (
        <div className="App">
            <div className="App-title">
            <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }}/>
            </div>
            <h2 className="App-subtitle">ScootTeq Price Engine</h2>
            <a href="/prices">
                <button className="App-button">Prices</button>
            </a>
        </div>
    );
}
