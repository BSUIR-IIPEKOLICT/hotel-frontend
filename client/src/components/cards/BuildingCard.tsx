import React from 'react'
import { BuildingCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="div">Address: {building.address}</Typography>
          <Typography component="div">
            Rooms: {building._rooms.length}
          </Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onDelete(building._id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
    </Paper>
  )
}
