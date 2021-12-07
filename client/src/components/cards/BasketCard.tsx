import React, { useContext, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { BasketCardProps } from '../../interfaces/props'
import { Context } from '../../store'
import { observer } from 'mobx-react-lite'

export const BasketCard: React.FC<BasketCardProps> = observer(
  ({ basket, sortDate, onChangeRole }) => {
    const { user } = useContext(Context)
    const [isAdmin, setIsAdmin] = useState(true)

    const basketUser = user.users.find(({ _id }) => _id === basket._user._id)
    const email = basketUser?.email ?? ''
    const price = basket._orders.reduce((acc, { duty }) => acc + duty, 0)
    const totalDuty = basket._orders.reduce(
      (acc, { date, duty }) =>
        acc +
        Math.floor(
          (sortDate.getTime() - new Date(date).getTime()) /
            (60 * 60 * 24 * 1000)
        ) *
          duty,
      0
    )

    const changeRoleHandler = () => {
      onChangeRole(basket._user)
      setIsAdmin((prev) => !prev)
    }

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
            <Typography component="div" color="primary">
              E-mail: {email}, {basket._orders.length} orders
            </Typography>
            <Typography component="div" color="secondary">
              Price: {price}$ per day
            </Typography>
            <Typography component="div">Total duty: {totalDuty}$</Typography>
          </Box>
          <Button
            color="info"
            sx={{ p: 1, alignSelf: 'center' }}
            onClick={changeRoleHandler}
          >
            {isAdmin ? 'admin' : 'client'}
          </Button>
        </Box>
      </Paper>
    )
  }
)
