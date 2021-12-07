import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { serviceApi } from '../api'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { ServiceCard } from '../components/cards/ServiceCard'

export const ServicePage: React.FC = observer(() => {
  const { service } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    serviceApi
      .getAll()
      .then((services) => service.setServices(services))
      .catch((e) => console.error(e))
  }, [])

  const createHandler = () => {
    if (name !== '' && price > 0 && !Number.isNaN(price)) {
      serviceApi
        .create(name, price)
        .then((response) => service.addService(response))
        .catch((e) => console.error(e))
      setName('')
      setPrice(0)
    }
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
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
      </Box>
      <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={createHandler}>
          Add service
        </Button>
      </Box>
      <Box sx={{ py: 1 }}>
        {service.services.length ? (
          service.services.map((currentService) => (
            <ServiceCard
              key={currentService._id}
              service={currentService}
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
