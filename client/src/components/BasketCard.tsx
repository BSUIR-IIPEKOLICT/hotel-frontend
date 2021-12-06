import React, { useContext } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { BasketCardProps } from '../interfaces/props'
import { Context } from '../store'
import { roles } from '../shared/enums'

export const BasketCard: React.FC<BasketCardProps> = ({
  basket,
  onChangeRole,
}) => {
  const { user } = useContext(Context)
  const basketUser = user.users.find(({ _id }) => _id === basket._user._id)
  const email = basketUser?.email ?? ''
  const price = basket._orders.reduce((acc, { duty }) => acc + duty, 0)
  const totalDuty = basket._orders.reduce(
    (acc, { date, duty }) =>
      acc +
      Math.floor(
        (new Date().getTime() - new Date(date).getTime()) /
          (60 * 60 * 24 * 1000)
      ) *
        duty,
    0
  )

  return (
    <Paper
      variant="outlined"
      sx={{
        my: 1,
        p: 2,
      }}
    >
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="h6" variant="h6" color="primary">
            E-mail: {email}, {basket._orders.length} orders
          </Typography>
          <Typography component="div">Price: {price}$ per day</Typography>
          <Typography component="div">Total duty: {totalDuty}$</Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onChangeRole(basket._user)}
        >
          {basket._user.role === roles.admin ? 'make client' : 'make admin'}
        </Button>
      </Box>
    </Paper>
  )
}
