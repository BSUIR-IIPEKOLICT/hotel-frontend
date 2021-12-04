import React, { useContext, useState } from 'react'
import { Box, Container, Divider, Grid, Paper, useTheme } from '@mui/material'
import { Context } from '../store'
import Typography from '@mui/material/Typography'
import PlaceSelect from '../classes/PlaceSelect'
import { RoomInfo } from '../components/room/RoomInfo'
import { orderApi } from '../api'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { paths } from '../shared/enums'
import { RoomServiceContainer } from '../components/room/RoomServiceContainer'
import { Service } from '../interfaces/models'
import { RoomPriceContainer } from '../components/room/RoomPriceContainer'
import { RoomBookContainer } from '../components/room/RoomBookContainer'

export const RoomPage: React.FC = observer(() => {
  const { service, room, basket, user } = useContext(Context)
  const { palette } = useTheme()
  const { push } = useHistory()

  const [price, setPrice] = useState(100)
  const [placesPrice, setPlacesPrice] = useState(50)
  const [services, setServices] = useState<string[]>([])
  const [population, setPopulation] = useState(1)

  const calcServices = (checked: boolean, servicePrice: number) => {
    if (checked) setPrice((prev) => prev + servicePrice)
    else setPrice((prev) => prev - servicePrice)
  }

  const availableServices = service.services.filter((service) => {
    return room.current._type
      ? room.current._type._services.indexOf(service._id) !== -1
      : []
  })

  const select = new PlaceSelect(
    room.current._type ? room.current._type.places : 0
  )

  const serviceHandler = (checked: boolean, service: Service) => {
    calcServices(checked, service.price)
    setServices((prev) =>
      checked ? [...prev, service._id] : prev.filter((v) => v === service._id)
    )
  }

  const selectHandler = (value: string) => {
    setPlacesPrice(parseInt(value) * 50)
    setPopulation(parseInt(value))
  }

  const bookHandler = () => {
    if (user.isAuth && room.current.isFree) {
      orderApi
        .create(basket.basket._id, room.current._id, services, population)
        .then(() => push(paths.main))
        .catch((e) => console.error(e))
    } else {
      alert('Not allowed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper component="div" sx={{ flexGrow: 1, p: 2, my: 2 }}>
        <RoomInfo room={room.current} />
        <Divider />
        <RoomPriceContainer value={price + placesPrice} />
        <Divider />
        <Box component="form" noValidate autoComplete="off" sx={{ py: 1 }}>
          <Typography
            component="h6"
            variant="h6"
            sx={{ color: palette.primary.main }}
          >
            Book a room
          </Typography>
          <Grid container>
            <RoomServiceContainer
              services={availableServices}
              onChange={serviceHandler}
            />
            <RoomBookContainer
              selectOptions={select.options}
              selectValues={select.values}
              selectValue={population}
              selectHandler={selectHandler}
              bookHandler={bookHandler}
            />
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
})
