import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Context } from '../../store'
import { RoomCard } from './RoomCard'
import { useHistory } from 'react-router-dom'
import { paths } from '../../shared/enums'
import { observer } from 'mobx-react-lite'
import { RoomPopulated } from '../../interfaces/populatedModels'

export const RoomGrid: React.FC = observer(() => {
    const { room } = useContext(Context)
    const { push } = useHistory()

    const cardHandler = (currentRoom: RoomPopulated) => {
        room.setCurrent(currentRoom)
        push(`${paths.room}/${currentRoom._id}`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={12} sx={{ p: 2 }}>
                {room.rooms.map((currentRoom) => (
                    <RoomCard
                        key={currentRoom._id}
                        id={currentRoom._id}
                        address={currentRoom._building.address}
                        type={currentRoom._type.name}
                        places={currentRoom._type.places}
                        clickHandler={() => cardHandler(currentRoom)}
                    />
                ))}
            </Grid>
        </Box>
    )
})
