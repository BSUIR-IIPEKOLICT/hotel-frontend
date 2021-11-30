import React, { useContext } from 'react'
import { Box, Button, Paper, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { OrderCardProps } from '../interfaces/props'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Context } from '../store'

export const OrderCard: React.FC<OrderCardProps> = ({ order, onDelete }) => {
  const { type } = useContext(Context)
  const { palette } = useTheme()

  const typeName = type.types.filter(({ _id }) => _id === order._room._type)[0]
    .name
  const price =
    order.population * 50 +
    order._services.reduce((acc, { price }) => acc + price, 0)

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
          <Typography component="div">Date: {order.date}</Typography>
          <Typography component="div" sx={{ color: palette.success.main }}>
            {price}$ per day
          </Typography>
          <Typography component="div" sx={{ color: palette.text.secondary }}>
            {order.population} persons, {typeName} type
          </Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onDelete(order)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
    </Paper>
  )
}
