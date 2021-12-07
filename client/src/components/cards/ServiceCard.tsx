import React from 'react'
import { ServiceCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography component="div">
            {service.name}, {service.price}$ per day
          </Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onDelete(service._id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
    </Paper>
  )
}
