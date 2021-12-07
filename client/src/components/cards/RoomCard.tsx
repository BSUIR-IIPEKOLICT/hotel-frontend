import React from 'react'
import { RoomCardProps } from '../../interfaces/props'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material'

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  clickHandler,
  isAdmin,
}) => {
  const { palette } = useTheme()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      onClick={() => clickHandler(room)}
    >
      <Paper variant="outlined" sx={{ p: 2, cursor: 'pointer' }}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            color: palette.success.main,
            marginBottom: 2,
            textAlign: 'center',
          }}
        >
          Type: {room._type.name}
        </Typography>
        {isAdmin && (
          <Typography component="div">
            Places: {room.population}/{room._type.places}
          </Typography>
        )}
        {!isAdmin && (
          <Typography component="div">Places: {room._type.places}</Typography>
        )}
        <Typography component="div" sx={{ color: palette.text.secondary }}>
          Address:
        </Typography>
        <Typography component="div" sx={{ textDecoration: 'underline' }}>
          {room._building.address}
        </Typography>
        {isAdmin && (
          <Typography component="div">
            {room.isFree ? 'Free' : 'Booked'}
          </Typography>
        )}
      </Paper>
    </Grid>
  )
}
