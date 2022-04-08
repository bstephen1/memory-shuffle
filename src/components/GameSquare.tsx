import Button from '@mui/material/Button';
import React, { MouseEventHandler } from 'react';

export default function GameSquare(props: { image: JSX.Element, handleClick: Function; }) {
    return (
        <Button onClick={() => props.handleClick()}>
            {props.image}
        </Button>
    );
}

