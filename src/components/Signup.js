import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const {signUp} = useUserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    
    try {
      await signUp(email, password);
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }
  return(
    <div className="signup">
      <div className="p-4 w-full">
        <h2 className="signup-header">
          YK To-Do
        </h2>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Control 
              type="email" 
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Control
              type="password" 
              placeholder="Password" 
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">Sign Up</Button>
          </div>
        </Form>
      </div>
      <div className="signup-login">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  )
}

export default Signup