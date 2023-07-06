import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';



const Login: React.FC = ({ }) => {
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
        const response = await fetch(`http://localhost:8080/api/v1/auth/authenticate`, {
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
          console.log("TOKEN:", data);
          const { access_token, refresh_token } = data;
          console.log("Access Token:", access_token);
          localStorage.setItem('access_token', JSON.stringify(access_token));
          localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/');
        }
        else if (response.status === 401) {
          setErrorMessage('Wrong email and/or password!');
        }
      } catch (error) {
        console.error("Error during login: ", error);
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

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
        <br /><br /><br />
        <button className="App-button" onClick={handleRegister} style={{position: 'fixed', left: '15px', bottom: '15px'}}>Register</button>
      </form>
    </div>
  );
};

export default Login;
