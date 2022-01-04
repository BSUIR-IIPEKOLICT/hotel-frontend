import React, { useContext, useEffect } from 'react'
import { Grid, useTheme } from '@mui/material'
import { FilterBar } from '../components/FilterBar'
import { RoomGrid } from '../components/room/RoomGrid'
import { buildingApi, roomApi, serviceApi, typeApi } from '../api'
import { Context } from '../store'
import { roles } from '../shared/enums'
import { observer } from 'mobx-react-lite'
import { RoomCreateForm } from '../components/room/RoomCreateForm'

export const MainPage: React.FC = observer(() => {
  const { palette } = useTheme()
  const { building, type, room, user, service } = useContext(Context)

  const loadRooms = () => {
    roomApi
      .get(room.page, room.limit)
      .then((response) => {
        room.setRooms(response.rooms)
        room.setPageAmount(response.amount)
      })
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    typeApi
      .getAll()
      .then((types) => type.setTypes(types))
      .catch((e) => console.error(e))
    buildingApi
      .getAll()
      .then((buildings) => building.setBuildings(buildings))
      .catch((e) => console.error(e))
    loadRooms()
    serviceApi
      .getAll()
      .then((services) => service.setServices(services))
      .catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    roomApi
      .get(
        room.page,
        room.limit,
        building.active,
        type.active,
        user.user.role === roles.client ? true : undefined
      )
      .then((response) => {
        room.setRooms(response.rooms)
        room.setPageAmount(response.amount)
      })
      .catch((e) => console.error(e))
  }, [building.active, type.active, room.page])

  return (
    <Grid container sx={{ backgroundColor: 'background.paper', flexGrow: 1 }}>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        sx={{ borderRight: `2px solid ${palette.divider}` }}
      >
        <FilterBar />
      </Grid>
      <Grid
        item
        xs={9}
        sm={9}
        md={9}
        sx={{ backgroundColor: palette.background.default }}
      >
        {user.isAuth && user.user.role === roles.admin && (
          <RoomCreateForm loadRooms={loadRooms} />
        )}
        <RoomGrid />
      </Grid>
    </Grid>
  )
})
