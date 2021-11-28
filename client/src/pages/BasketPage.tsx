import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container } from '@mui/material'
import { Context } from '../store'
import { basketApi, orderApi } from '../api'

export const BasketPage: React.FC = observer(() => {
    const { user, order, basket } = useContext(Context)

    useEffect(() => {
        basketApi
            .getOne(user.id)
            .then((response) => {
                basket.setBasket(response)

                orderApi
                    .get(response._id)
                    .then((orders) => order.setOrders(orders))
                    .catch((e) => console.error(e))
            })
            .catch((e) => console.error(e))
    }, [])

    return (
        <Container>
            {order.orders.map((order) => (
                <div>
                    <h6>{order.date}</h6>
                    <p>{order.population}</p>
                </div>
            ))}
        </Container>
    )
})
