import React, { useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Button from './Button';
import classes from './Login.module.css';

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <h1 className={classes.title}>Login</h1>
      <label className={classes.label} htmlFor='id'>
        Enter Your ID
      </label>
      <input
        ref={idRef}
        className={classes.input}
        id='id'
        name='id'
        type='text'
        required
      />
      <div className={classes.buttonContainer}>
        <Button className={classes.loginButton}>Login</Button>
        <Button onClick={createNewId} className={classes.createButton}>
          Create New ID
        </Button>
      </div>
    </form>
  );
};

export default Login;
