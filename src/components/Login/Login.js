import React, { useState, useReducer } from 'react';
import { AuthContext } from '../../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  const checkValidity = (value) => value ? value.includes('@') : false;

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: checkValidity(action.val)
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: checkValidity(state.value)
    };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  const checkValidity = (value) => value ? value.trim().length > 6 : false;

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: checkValidity(action.val)
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: checkValidity(state.value)
    };
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
  const context = React.useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    { value: '', isValid: false }
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    { value: '', isValid: false }
  );

  // We use this to setFormIsValid only when validity was changed
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  React.useEffect(() => {
    let identifier = setTimeout(() => {
      // Will execute not after each new letter
      console.log("CHECKING FOR VALIDITY");
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
    // You can also just use emailState.isValid & passwordState.isValid 
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
