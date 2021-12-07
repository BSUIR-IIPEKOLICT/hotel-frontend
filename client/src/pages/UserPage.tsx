import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Paper, Typography } from '@mui/material'
import { Context } from '../store'
import { orderApi } from '../api'
import { OrderCard } from '../components/cards/OrderCard'
import { OrderPopulated } from '../interfaces/populatedModels'

export const UserPage: React.FC = observer(() => {
  const { order, basket, user } = useContext(Context)
  const [duty, setDuty] = useState(0)

  useEffect(() => {
    orderApi
      .get(basket.basket._id)
      .then((orders) => {
        order.setOrders(orders)
        setDuty(orders.reduce((acc, { duty }) => acc + duty, 0))
      })
      .catch((e) => console.error(e))
  }, [])

  const deleteOrder = (currentOrder: OrderPopulated) => {
    orderApi
      .delete(currentOrder._id)
      .then(() => {
        order.deleteOrder(currentOrder._id)
        setDuty((prev) => prev - currentOrder.duty)
      })
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
          Duty: {duty}$
        </Typography>
      </Paper>
      <Typography component="h4" variant="h4">
        Orders
      </Typography>
      {order.orders.map((order) => (
        <OrderCard order={order} key={order._id} onDelete={deleteOrder} />
      ))}
    </Container>
  )
})
