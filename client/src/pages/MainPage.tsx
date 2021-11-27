import React, { useContext, useEffect } from 'react'
import { Grid, useTheme } from '@mui/material'
import { FilterBar } from '../components/FilterBar'
import { RoomGrid } from '../components/room/RoomGrid'
import { buildingApi, roomApi, typeApi } from '../api'
import { Context } from '../store'

export const MainPage: React.FC = () => {
    const { palette } = useTheme()
    const { building, type, room } = useContext(Context)

    useEffect(() => {
        typeApi
            .getAll()
            .then((types) => type.setTypes(types))
            .catch((e) => console.error(e))
        buildingApi
            .getAll()
            .then((buildings) => building.setBuildings(buildings))
            .catch((e) => console.error(e))
        roomApi
            .get({ page: 1, limit: 20 })
            .then((rooms) => room.setRooms(rooms))
            .catch((e) => console.error(e))
    }, [])

    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <Grid
                item
                xs={3}
                sm={3}
                md={3}
                sx={{ borderRight: `2px solid ${palette.divider}` }}
            >
                <FilterBar />
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
                <RoomGrid />
            </Grid>
        </Grid>
    )
}
