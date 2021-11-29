import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Paper, Typography } from '@mui/material'
import { Context } from '../store'
import { orderApi } from '../api'
import { OrderCard } from '../components/OrderCard'

export const BasketPage: React.FC = observer(() => {
  const { order, basket, user } = useContext(Context)

  useEffect(() => {
    orderApi
      .get(basket.basket._id)
      .then((orders) => order.setOrders(orders))
      .catch((e) => console.error(e))
    basket.setDuty(0)
  }, [])

  const addDuty = (value: number) => {
    basket.setDuty(basket.duty + value)
  }

  const deleteOrder = (id: string) => {
    orderApi
      .delete(id)
      .then(() => order.deleteOrder(id))
      .catch((e) => console.error(e))
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Paper
        variant="outlined"
        sx={{ marginBottom: 1, p: 2, textAlign: 'center' }}
      >
        <Typography component="h6" variant="h6">
          E-mail: {user.user.email}
        </Typography>
        <Typography component="div" variant="body1">
          Role: {user.user.role}
        </Typography>
        <Typography component="div" variant="body1">
          Duty: {basket.duty}$
        </Typography>
      </Paper>
      <Typography component="h4" variant="h4">
        Orders
      </Typography>
      {order.orders.map((order) => (
        <OrderCard
          order={order}
          addDuty={addDuty}
          key={order._id}
          onDelete={deleteOrder}
        />
      ))}
    </Container>
  )
})
