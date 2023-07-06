import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from './Login';


export default function History() {
    const [firstName, setFirstName] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setFirstName(userData);
        }
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
                if (!data) {
                    navigate("/login");
                }
            }
            else {
                console.log("COULD NOT FETCH USER: " + response.status)
            }
        } catch (error) {
            console.error("Error: ", error);
        }
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


    /*return (
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
            <h2 className="App-subtitle" style={{ marginTop: '40px' }}>{firstName}'s Ride History</h2>
            <a className="App-text">(to be implemented)</a>
            <a href="/login" onClick={logout} className="App-logout-link">
                Logout
            </a>
            </div>
            )
}