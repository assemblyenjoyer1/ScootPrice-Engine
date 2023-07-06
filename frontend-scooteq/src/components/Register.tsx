import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  // Define any necessary props for the component
}

const Register: React.FC<RegisterFormProps> = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email !== '' && lastName !== ''&& firstName !== '' && password !== '') {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/register`, {
            method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
                        email: email,
                        firstname: firstName,
                        lastname: lastName,
                        password: password,
                    }),
        });
        if (response.status ==  200) {
            const data = await response.json();
            console.log(data)
            navigate('/login');
          }
          else if (response.status === 409) {
            const error409 = 'Email already exists!'
            console.log(error409)
            setErrorMessage(error409);
          }
          else if (response.status === 422) {
            const error422 = 'Invalid email format!'
            console.log(error422)
            setErrorMessage(error422);
          }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred!")
    }
  }
  else{
    setErrorMessage("Fill out the form completely!")
  }
  };

  return (
    <div className="App">
    <div className="App-title">
      <img src={require("./scooteq.png")} alt="png" style={{ height: '300px', width: 'auto', maxWidth: '100%' }} />
    </div>
    <h2>Register a new user:</h2>
    {errorMessage && <div className="App-error-message">{errorMessage}</div>}
    <form>
      <input
      className="App-inputText"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input
      className="App-inputText"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <br />
      <input
          className="App-inputText"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
      />
      <br />
      <input
      className="App-inputText"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button className="App-button" type="button" onClick={handleRegister} >
        Register
      </button>
    </form>
    </div>
  );
};

export default Register;