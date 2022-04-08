import React, { MouseEventHandler } from 'react';
import { GridItem } from '../App';
import GameSquare from './GameSquare';

export default function GameGrid(props: { handleClick: Function, grid: GridItem[] }) {

    return (
        <div>
            {props.grid.map((item: GridItem, i) => <GameSquare key={item.id} image={item.image} handleClick={() => props.handleClick(i)}></GameSquare>)
            }
        </div >

    );
}

