import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
overflow: hidden;
position: relative;
cursor: pointer;
width: ${props => props.width}px ;
height: ${props => props.height}px;
border: none;
font-size: 18px;
border-radius: ${props => props.radius ? props.radius : "0"}px;
font-weight: bold;
color: white;
background: linear-gradient( 90deg, #0162c8, #55e7fc);
&:focus{
  outline: none;
}

div{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
span{
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  animation: ripple ${props => props.duration}ms; 
}

@keyframes ripple
{
  from{
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  to{
    width: ${props => (props.width * 10)}px;
    height: ${props => props.width * 10}px;
    opacity: 0;
  }
}
`;

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

function Button(props) {
  const [ripples, setRipples] = useState([]);

  useDebouncedRippleCleanUp(ripples.length, props.duration, () => {
    setRipples([]);
  })

  const addRipple = e => {
    setRipples([...ripples, {
      x: e.pageX - e.currentTarget.offsetLeft,
      y: e.pageY - e.currentTarget.offsetTop
    }]);
  }

  return (
    <StyledButton onMouseDown={addRipple} duration={props.duration} width={props.width} height={props.height} radius={props.radius}>
      {props.children}
      {
        ripples.length > 0 &&
        ripples.map((ripple, index) => (
          <span style={{
            left: ripple.x,
            top: ripple.y
          }}
            key={index}
          />
        ))
      }
    </StyledButton>
  )
}

export default Button
