import React from 'react'
import { ReviewCardProps } from '../../interfaces/props'
import { Box, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditIcon from '@mui/icons-material/Edit'

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  isOwner,
  onChange,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="div" sx={{ fontWeight: 700 }}>
            {review.author}
          </Typography>
          <Typography component="div">{review.content}</Typography>
        </Box>
        <Box>
          <Button
            color="warning"
            sx={{ p: 1 }}
            onClick={() => onChange(review)}
            disabled={!isOwner}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            sx={{ p: 1 }}
            onClick={() => onDelete(review._id)}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
