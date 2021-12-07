import React, { useContext } from 'react'
import { TypeCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Context } from '../../store'

export const TypeCard: React.FC<TypeCardProps> = ({ type, onDelete }) => {
  const { service } = useContext(Context)
  const services = service.services
    .filter((s) => type._services.indexOf(s._id) !== -1)
    .map((s) => s.name)
    .join(', ')

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
            {type.name}, {type.places} places
          </Typography>
          <Typography component="div">
            {services ? services : 'no services'}
          </Typography>
        </Box>
        <Button
          color="error"
          sx={{ p: 1, alignSelf: 'center' }}
          onClick={() => onDelete(type._id)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Box>
    </Paper>
  )
}
