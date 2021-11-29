import React from 'react'
import { RoomCardProps } from '../../interfaces/props'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material'

export const RoomCard: React.FC<RoomCardProps> = ({
  id,
  address,
  type,
  places,
  clickHandler,
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
      key={id}
      onClick={() => clickHandler()}
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
          Type: {type}
        </Typography>
        <Typography component="div">Places: {places}</Typography>
        <Typography component="div" sx={{ color: palette.text.secondary }}>
          Address:
        </Typography>
        <Typography component="div" sx={{ textDecoration: 'underline' }}>
          {address}
        </Typography>
      </Paper>
    </Grid>
  )
}
