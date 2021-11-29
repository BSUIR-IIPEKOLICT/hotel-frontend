import React from 'react'
import { Button, Container, Grid } from '@mui/material'
import { AppSelect } from '../app/AppSelect'
import { RoomBookContainerProps } from '../../interfaces/props'

export const RoomBookContainer: React.FC<RoomBookContainerProps> = ({
  selectOptions,
  selectValues,
  selectValue,
  selectHandler,
  bookHandler,
}) => {
  return (
    <Grid item md={6}>
      <Container sx={{ textAlign: 'center' }}>
        <AppSelect
          changeHandler={selectHandler}
          label="places"
          options={selectOptions}
          values={selectValues}
          value={selectValue}
        />
        <Button variant="contained" sx={{ m: '0 auto' }} onClick={bookHandler}>
          Book this room
        </Button>
      </Container>
    </Grid>
  )
}
