import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { useCookies } from 'react-cookie';

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["auth"]);

  function createCookie(value) {
    setCookie("auth", value, { path: '/'});
  }

  const initialState = {  
    email: '',
    password: ''
  };

  const [formState, setFormState] = useState(initialState);
  const { email, password } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:9000/users/login`, {
        email,
        password
      });
      if (!!data) {
        setFormState(initialState);
        createCookie(data.token);
        navigate('/home');
      }
    } catch (e) {
      alert('User does not exist')
    }
  }

  return (
    <div className='form-container'>
      <Form className='custom-form' onSubmit={onFormSubmit}>
        <h2 style={{ 'textAlign': 'center' }}>Login to GottaGo</h2>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={email}
            name='email'
            type="email"
            placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            value={password}
            name='password'
            type="password"
            placeholder="Password" />
        </Form.Group>
        <p>Don't have an account?
          <Link to='/sign-up'>Sign Up</Link>
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
