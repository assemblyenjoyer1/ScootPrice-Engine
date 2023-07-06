import React, {useState, useEffect} from "react";

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


export default function History() {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
          console.log("User: "+user?.rides);
        }
      }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(undefined);
      };

      /*useEffect(() => {
        fetch('http://localhost:8080/api/')
            .then((response) => response.json())
            .then((data) => {
                setRides(data); // set the fetched data to the genres state
            })
            .catch((error) => {
                console.error('Error fetching rides:', error);
            });
    }, []); // pass an empty array as second argument to execute the effect only once
    */


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
          <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }} />
        </div>
        <h2 className="App-subtitle" style={{ marginTop: '40px' }}>{user?.name}'s Ride History</h2>
        <a href="/login" onClick={handleLogout} className="App-logout-link">
            Logout
          </a>
          <table className="rides-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Distance Traveled</th>
            <th>Price Paid</th>
          </tr>
        </thead>
        <tbody>
          {user?.rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.distanceTraveled}</td>
              <td>{ride.pricePaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}