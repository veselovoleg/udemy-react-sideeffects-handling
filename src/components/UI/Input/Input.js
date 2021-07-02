import React from 'react';
import classes from './Input.module.css';

// ref from the outside + wrap with forwardRef
const Input = React.forwardRef((props, ref) => {
  const inputRef = React.useRef();

  const activate = () => {
    inputRef.current.focus();
  }

  // This hook helps to use the functions from the outside
  React.useImperativeHandle(ref, () => {
    return {
      // You can set the external name or just leave the same
      focus: activate
    }
  });

  return (
    <div
      className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
});

export default Input;