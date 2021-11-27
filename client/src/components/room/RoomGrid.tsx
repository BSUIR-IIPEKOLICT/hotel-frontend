import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Context } from '../../store'
import { RoomCard } from './RoomCard'
import { useHistory } from 'react-router-dom'
import { paths } from '../../shared/enums'

export const RoomGrid: React.FC = () => {
    const { room } = useContext(Context)
    const { push } = useHistory()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={12} sx={{ p: 2 }}>
                {room.rooms.map(({ _id, _building, _type }) => (
                    <RoomCard
                        key={_id}
                        id={_id}
                        address={_building.address}
                        type={_type.name}
                        places={_type.places}
                        clickHandler={() => push(`${paths.room}/${_id}`)}
                    />
                ))}
            </Grid>
        </Box>
    )
}
