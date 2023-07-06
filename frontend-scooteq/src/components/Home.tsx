import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function ChooseAction() {

    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        validateToken()
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token !== null) {
            const formattedToken = token.replace(/^"(.*)"$/, '$1');
            getUser(formattedToken)
        }
    }, []);


    const getUser = async (token: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/calculator/user-by-token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                });
            if (response.status == 200) {
                const firstName = await response.text();
                console.log("USER: " + firstName);
                setFirstName(firstName)
                localStorage.setItem("user", firstName)
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

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
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <div className="App">
            <div className="App-title">
                <img src={require("./scooteq.png")} alt="png"
                     style={{height: '300px', width: 'auto', maxWidth: '100%'}}/>
            </div>

            {firstName && (
                <h1>Welcome {firstName}</h1>
            )}
            <h2 className="App-subtitle" style={{marginTop: '40px'}}>ScootTeq Price Engine</h2>
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
