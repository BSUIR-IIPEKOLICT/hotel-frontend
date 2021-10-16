import React, {useContext} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {Context} from '../index'
import {RoomCard} from './RoomCard'
import {useHistory} from 'react-router-dom'
import {roomRoute} from '../shared/constants'

export const RoomGrid: React.FC = () => {
    const {room} = useContext(Context)
    const history = useHistory()

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2} columns={12} sx={{p: 2}}>
                {room.rooms.map(({_id, _building, _type}) => (
                    <RoomCard
                        id={_id}
                        address={_building.address}
                        type={_type.name}
                        places={_type.places}
                        clickHandler={() => history.push(`${roomRoute}/${_id}`)}
                    />
                ))}
            </Grid>
        </Box>
    )
}
