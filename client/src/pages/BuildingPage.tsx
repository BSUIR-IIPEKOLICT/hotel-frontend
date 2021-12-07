import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Context } from '../store'
import { BuildingCard } from '../components/cards/BuildingCard'
import { buildingApi } from '../api'
import { observer } from 'mobx-react-lite'

export const BuildingPage: React.FC = observer(() => {
  const [address, setAddress] = useState('')
  const { building } = useContext(Context)

  useEffect(() => {
    buildingApi
      .getAll()
      .then((buildings) => building.setBuildings(buildings))
      .catch((e) => console.error(e))
  }, [])

  const createHandler = () => {
    if (address !== '') {
      buildingApi
        .create(address)
        .then((response) => building.addBuilding(response))
        .catch((e) => console.error(e))
      setAddress('')
    }
  }

  const deleteHandler = (id: string) => {
    buildingApi
      .delete(id)
      .then((response) => building.deleteBuilding(response))
      .catch((e) => console.error(e))
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Buildings
      </Typography>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          label="address"
          value={address}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="contained" onClick={createHandler}>
          Add building
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {building.buildings.length ? (
          building.buildings.map((currentBuilding) => (
            <BuildingCard
              key={currentBuilding._id}
              building={currentBuilding}
              onDelete={deleteHandler}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No buildings</Box>
        )}
      </Box>
    </Container>
  )
})
