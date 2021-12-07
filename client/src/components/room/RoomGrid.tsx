import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Context } from '../../store'
import { RoomCard } from '../cards/RoomCard'
import { useHistory } from 'react-router-dom'
import { paths } from '../../shared/enums'
import { observer } from 'mobx-react-lite'
import { RoomPopulated } from '../../interfaces/populatedModels'
import { Pagination } from '@mui/material'
import { roomApi } from '../../api'

export const RoomGrid: React.FC = observer(() => {
  const { room, user } = useContext(Context)
  const { push } = useHistory()
  const isAdmin = user.isAuth ? user.user.role === 'admin' : false

  const cardHandler = (currentRoom: RoomPopulated) => {
    room.setCurrent(currentRoom)
    push(`${paths.room}/${currentRoom._id}`)
  }

  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    room.setPage(value)
  }

  const deleteHandler = (id: string) => {
    roomApi
      .delete(id)
      .then((response) => room.deleteRoom(response))
      .catch((e) => console.error(e))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Pagination
        count={room.pageAmount}
        page={room.page}
        variant="outlined"
        color="primary"
        sx={{ p: 1 }}
        onChange={paginationHandler}
      />
      <Grid container spacing={2} columns={12} sx={{ p: 2 }}>
        {room.rooms.map((currentRoom) => (
          <RoomCard
            key={currentRoom._id}
            room={currentRoom}
            clickHandler={cardHandler}
            onDelete={deleteHandler}
            isAdmin={isAdmin}
          />
        ))}
      </Grid>
    </Box>
  )
})
