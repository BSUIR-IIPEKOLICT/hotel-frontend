import React from 'react'
import {Grid} from '@mui/material'
import {FilterBar} from '../components/FilterBar'
import {RoomGrid} from '../components/room/RoomGrid'

export const MainPage: React.FC = () => {
    return (
        <Grid container sx={{flexGrow: 1}}>
            <Grid item xs={3} sm={3} md={3}>
                <FilterBar />
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
                <RoomGrid />
            </Grid>
        </Grid>
    )
}
