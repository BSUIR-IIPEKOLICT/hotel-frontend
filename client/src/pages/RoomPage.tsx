import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    useTheme,
} from '@mui/material'
import { Context } from '../store'
import Typography from '@mui/material/Typography'
import { AppSelect } from '../components/app/AppSelect'
import PlaceSelect from '../classes/PlaceSelect'
import { RoomInfo } from '../components/room/RoomInfo'
import { serviceApi } from '../api'
import { observer } from 'mobx-react-lite'

export const RoomPage: React.FC = observer(() => {
    const { service, room } = useContext(Context)
    const { palette } = useTheme()
    const [price, setPrice] = useState(100)
    const [placesPrice, setPlacesPrice] = useState(50)

    useEffect(() => {
        serviceApi
            .getAll()
            .then((services) => service.setServices(services))
            .catch((e) => console.error(e))
    }, [])

    const calcServices = (checked: boolean, servicePrice: number) => {
        if (checked) setPrice((prev) => prev + servicePrice)
        else setPrice((prev) => prev - servicePrice)
    }

    const availableServices = service.services.filter((service) => {
        return room.current._type
            ? room.current._type._services.indexOf(service._id) !== -1
            : []
    })

    const selectOptions = new PlaceSelect(
        room.current._type ? room.current._type.places : 0
    )

    return (
        <Container maxWidth="sm">
            <Paper component="div" sx={{ flexGrow: 1, p: 2, my: 2 }}>
                <RoomInfo room={room.current} />
                <Divider />
                <Box component="div" sx={{ p: 1 }}>
                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ marginBottom: 1 }}
                    >
                        Pricing
                    </Typography>
                    <Typography
                        component="div"
                        variant="button"
                        sx={{ color: palette.success.main }}
                    >
                        {price + placesPrice}$ per day
                    </Typography>
                </Box>
                <Divider />
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ py: 1 }}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ color: palette.primary.main }}
                    >
                        Book a room
                    </Typography>
                    <Grid container>
                        <Grid item md={6}>
                            <FormGroup>
                                {availableServices.map(
                                    ({ _id, name, price }) => (
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            key={_id}
                                            label={name}
                                            onChange={(e, checked) => {
                                                calcServices(checked, price)
                                            }}
                                        />
                                    )
                                )}
                            </FormGroup>
                        </Grid>
                        <Grid item md={6}>
                            <Container sx={{ textAlign: 'center' }}>
                                <AppSelect
                                    changeHandler={(value) =>
                                        setPlacesPrice(parseInt(value) * 50)
                                    }
                                    label="places"
                                    options={selectOptions.options}
                                    values={selectOptions.values}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ m: '0 auto' }}
                                >
                                    Book this room
                                </Button>
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
})
