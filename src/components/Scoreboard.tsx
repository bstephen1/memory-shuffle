import { Box } from '@material-ui/core';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {
    score: number,
    best: number,
    handleReset: Function,
}

export default function Scoreboard({ score, best, handleReset }: Props) {
    return (
        <div>
            <Box sx={{ mx: 2, display: 'inline-block' }}>
                <div>Score: {score}</div>
                <div>Best: {best}</div>
            </Box>
            <Button sx={{ mb: 2 }} variant="outlined" onClick={() => handleReset()}>Reset Score</Button>
        </div>
    );
}

