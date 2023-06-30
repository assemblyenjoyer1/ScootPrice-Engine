import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



type LoginProps = {
  onLogin: (loggedIn: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sending");
    if (email !== '' && password !== '') {
      try {
        const response = await fetch(`http://localhost:8080/api/login/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
        });
        if (response.status ==  200) {
          const data = await response.json();
          console.log("User:", data);
          localStorage.setItem('user', JSON.stringify(data));
          onLogin(true);
          navigate('/');
        }
        else if (response.status === 401) {
          setErrorMessage('Wrong email and/or password!');
          onLogin(false);
        }
      } catch (error) {
        console.error("Error during login: ", error);
      }
    }
  };


  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const parsedLoggedIn = storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
    onLogin(parsedLoggedIn);
  }, [onLogin]);

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(false));
  }, []);

  return (
    <div className="App">
      <div className="App-title">
        <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }} />
      </div>
      <h2>Login</h2>
      {errorMessage && <div className="App-error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <input className="App-inputText" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          <input className="App-inputText" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="App-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
