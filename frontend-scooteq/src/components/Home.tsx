import React, { useState, useEffect } from 'react';

interface Ride {
    id: string;
    distanceTraveled: number,
    pricePaid: number;
}

interface User {
    uuid: string;
    name: string;
    role: string;
    rides: Ride[];
};

export default function ChooseAction() {

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        }
      }, []);

      const handleLogout = () => {
        localStorage.clear();
        setUser(undefined);
      };

    return (
        <div className="App">
            <div className="App-title">
            <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }}/>
            </div>

            {user && (
          <h1>Welcome {user.name}</h1>
      )}
            <h2 className="App-subtitle" style={{ marginTop: '40px' }}>ScootTeq Price Engine</h2>
            <a href="/prices">
                <button className="App-button">Prices</button>
            </a>
            <a href="/history">
                <button className="App-button">History</button>
            </a>
            <a href="/login" onClick={handleLogout} className="App-logout-link">
            Logout
          </a>
        </div>
    );
}
