import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import GameGrid from './components/GameGrid';
import Scoreboard from './components/Scoreboard';
import imagePool from './imagePool';


export interface GridItem {
  id: number,
  image: JSX.Element,
  alreadyClicked: boolean
}

function App() {

  const [grid, setGrid] = useState<GridItem[]>([])
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [size, setSize] = useState(3)

  function handleClick(i: number) {
    if (grid[i].alreadyClicked) {
      resetBoard()
    } else {
      setScore(score + 1)
      setGrid(prevGrid => {
        let updatedGrid = [...prevGrid]
        updatedGrid[i].alreadyClicked = true
        return updatedGrid
      })
      randomizeImages()
    }
  }

  function resetBoard() {
    setGrid(prevGrid => {
      let updatedGrid = prevGrid.map(item => ({ ...item, alreadyClicked: false }))
      return updatedGrid
    })
    setBest(score > best ? score : best)
    setScore(0)
    randomizeImages()
  }

  function initBoard(size: number) {
    let updatedGrid: GridItem[] = []
    let remainingImages = [...imagePool]
    for (let i = 0; i < size; i++) {
      let image;
      const _id = i;
      [image, remainingImages] = getRandomImageAndUpdatedArray(remainingImages)
      updatedGrid = updatedGrid.concat([{ image: image, id: _id } as GridItem])
    }
    setGrid(updatedGrid)
    setScore(0)
    setSize(size)
  }

  function getRandomImageAndUpdatedArray(images: any) {
    const i = Math.floor(Math.random() * images.length)
    return [images[i], images.filter((image: any, j: number) => j != i)]
  }

  function randomizeImages() {
    setGrid(prevGrid => {
      let remainingItems = [...prevGrid]
      let newGrid: GridItem[] = []
      while (remainingItems.length) {
        const i = Math.floor(Math.random() * remainingItems.length)
        const newItem = remainingItems.splice(i, 1)
        newGrid = newGrid.concat(newItem)
      }

      return newGrid
    })

  }

  useEffect(() => {
    initBoard(size)
  }, [size])

  useEffect(() => {
    document.body.style.backgroundColor = "#cbba83"
  }, [])

  return (
    <div className="App">
      <Grid container spacing={2} sx={{ mt: 2 }} style={{ backgroundColor: '#ffecb3' }}>
        <Grid item xs={6}>
          <FormControl >
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              labelId="size-label"
              value={size}
              label="Size"
              onChange={(e) => initBoard(e.target.value as number)}>
              {imagePool.map((image, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>)}
            </Select>
          </FormControl>
          <Button sx={{ ml: 2 }} variant="outlined" onClick={() => initBoard(size)}>Change Icons</Button>
        </Grid>
        <Grid item xs={6}>
          <Scoreboard score={score} best={best} handleReset={resetBoard} />
        </Grid>
      </Grid>
      <GameGrid grid={grid} handleClick={handleClick} />
      {score === grid.length && <p> You win!</p>}
    </div>
  );
}

export default App;
