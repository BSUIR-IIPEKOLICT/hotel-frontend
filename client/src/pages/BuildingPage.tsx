import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Context } from '../store'
import { BuildingCard } from '../components/cards/BuildingCard'
import { buildingApi } from '../api'
import { observer } from 'mobx-react-lite'
import { incorrectHandler } from '../shared/constants'
import { Building } from '../interfaces/models'

export const BuildingPage: React.FC = observer(() => {
  const { building } = useContext(Context)
  const [address, setAddress] = useState('')
  const [editedBuilding, setEditedBuilding] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    buildingApi
      .getAll()
      .then((buildings) => building.setBuildings(buildings))
      .catch((e) => console.error(e))
  }, [])

  const submitCreateHandler = () => {
    if (address) {
      buildingApi
        .create(address)
        .then((response) => {
          building.addBuilding(response)
          setAddress('')
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const submitChangeHandler = () => {
    if (editedBuilding && address) {
      buildingApi
        .change(editedBuilding, address)
        .then((response) => {
          building.changeBuilding(response)
          setEditedBuilding('')
          setIsEdit(false)
          setAddress('')
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const changeHandler = (b: Building) => {
    setAddress(b.address)
    setEditedBuilding(b._id)
    setIsEdit(true)
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
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit building' : 'Add building'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {building.buildings.length ? (
          building.buildings.map((currentBuilding) => (
            <BuildingCard
              key={currentBuilding._id}
              building={currentBuilding}
              onChange={changeHandler}
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
