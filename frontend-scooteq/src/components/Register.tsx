import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  // Define any necessary props for the component
}

const Register: React.FC<RegisterFormProps> = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/login/register`, {
            method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
                        email: email,
                        name: password,
                        password: password
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <input
      className="App-inputText"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
      className="App-inputText"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
      className="App-inputText"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="App-button" type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
};

export default Register;