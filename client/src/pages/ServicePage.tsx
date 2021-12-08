import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { serviceApi } from '../api'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { ServiceCard } from '../components/cards/ServiceCard'
import { incorrectHandler } from '../shared/constants'

export const ServicePage: React.FC = observer(() => {
  const { service } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [editedService, setEditedService] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    serviceApi
      .getAll()
      .then((services) => service.setServices(services))
      .catch((e) => console.error(e))
  }, [])

  const submitCreateHandler = () => {
    if (name && price && !Number.isNaN(price)) {
      serviceApi
        .create(name, price)
        .then((response) => service.addService(response))
        .catch((e) => console.error(e))
      setName('')
      setPrice(0)
    } else {
      incorrectHandler()
    }
  }

  const submitChangeHandler = () => {
    if (editedService && name && price && !Number.isNaN(price)) {
      serviceApi
        .change(editedService, name, price)
        .then((response) => {
          service.changeService(editedService, response)
          setEditedService('')
          setIsEdit(false)
          setName('')
          setPrice(0)
        })
        .catch((e) => console.error(e))
    } else {
      incorrectHandler()
    }
  }

  const changeHandler = (id: string) => {
    setEditedService(id)
    setIsEdit(true)
  }

  const deleteHandler = (id: string) => {
    serviceApi
      .delete(id)
      .then((response) => service.deleteService(response))
      .catch((e) => console.error(e))
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Services
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
          label="Service name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Service price"
          value={price}
          type="number"
          onChange={(e) => setPrice(parseInt(e.target.value as string, 10))}
        />
      </Box>
      <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
        >
          {isEdit ? 'Edit service' : 'Add service'}
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {service.services.length ? (
          service.services.map((currentService) => (
            <ServiceCard
              key={currentService._id}
              service={currentService}
              onChange={changeHandler}
              onDelete={deleteHandler}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>No services</Box>
        )}
      </Box>
    </Container>
  )
})
