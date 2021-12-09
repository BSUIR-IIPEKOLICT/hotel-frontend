import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { serviceApi, typeApi } from '../api'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { RoomServiceContainer } from '../components/room/RoomServiceContainer'
import { Service, Type } from '../interfaces/models'
import { TypeCard } from '../components/cards/TypeCard'
import { incorrectHandler } from '../shared/constants'

export const TypePage: React.FC = observer(() => {
  const { service, type } = useContext(Context)
  const [name, setName] = useState('')
  const [places, setPlaces] = useState(0)
  const [services, setServices] = useState<string[]>([])
  const [editedType, setEditedType] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    serviceApi
      .getAll()
      .then((services) => service.setServices(services))
      .catch((e) => console.error(e))
    typeApi
      .getAll()
      .then((types) => type.setTypes(types))
      .catch((e) => console.error(e))
  }, [])

  const serviceHandler = (checked: boolean, service: Service) => {
    setServices((prev) =>
      checked ? [...prev, service._id] : prev.filter((v) => v !== service._id)
    )
  }

  const submitCreateHandler = () => {
    if (places && !Number.isNaN(places) && name) {
      typeApi
        .create(services, name, places)
        .then((response) => type.addType(response))
        .catch((e) => console.error(e))
      setName('')
      setPlaces(0)
    } else {
      incorrectHandler()
    }
  }

  const submitChangeHandler = () => {
    if (editedType && places && !Number.isNaN(places) && name) {
      typeApi
        .change(editedType, services, name, places)
        .then((response) => {
          type.changeType(editedType, response)
          setEditedType('')
          setIsEdit(false)
          setName('')
          setPlaces(0)
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const changeHandler = (t: Type) => {
    setName(t.name)
    setPlaces(t.places)
    setEditedType(t._id)
    setIsEdit(true)
  }

  const deleteHandler = (id: string) => {
    typeApi
      .delete(id)
      .then((response) => type.deleteType(response))
      .catch((e) => console.error(e))
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Types
      </Typography>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          label="Type name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Places"
          value={places}
          type="number"
          onChange={(e) => setPlaces(parseInt(e.target.value as string, 10))}
        />
      </Box>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RoomServiceContainer
          services={service.services}
          onChange={serviceHandler}
        />
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit type' : 'Add type'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {type.types.length ? (
          type.types.map((currentType) => (
            <TypeCard
              key={currentType._id}
              type={currentType}
              onChange={changeHandler}
              onDelete={deleteHandler}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No types</Box>
        )}
      </Box>
    </Container>
  )
})
