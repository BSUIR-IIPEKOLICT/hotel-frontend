import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { Box, Container, Typography } from '@mui/material'
import { basketApi, userApi } from '../api'
import { BasketCard } from '../components/cards/BasketCard'
import { User } from '../interfaces/models'
import { roles } from '../shared/enums'
import { DatePicker } from '../components/DatePicker'
import { pageButtonPaths, pageButtonTitles } from '../shared/constants'
import { PageButton } from '../components/PageButton'
import { Spoiler } from '../components/Spoiler'

export const AdminPage: React.FC = observer(() => {
  const { user, basket } = useContext(Context)
  const [sortDate, setSortDate] = useState(new Date())

  useEffect(() => {
    userApi
      .getAll()
      .then((users) => user.setUsers(users))
      .catch((e) => console.error(e))
    basketApi
      .getAll()
      .then((baskets) => basket.setBaskets(baskets))
      .catch((e) => console.error(e))
  }, [])

  const onChangeRole = (currentUser: User) => {
    if (currentUser._id) {
      userApi
        .changeRole(
          currentUser._id,
          currentUser.role === roles.admin ? roles.client : roles.admin
        )
        .then(
          (role) =>
            (user.users.filter(({ _id }) => _id === currentUser._id)[0]!.role =
              role)
        )
        .catch((e) => console.error(e))
    }
  }

  const deleteHandler = (basketId: string, userId: string) => {
    if (userId) {
      userApi
        .delete(userId)
        .then((id) => {
          user.deleteUser(id)
          basket.deleteBasket(basketId)
        })
        .catch((e) => console.error(e))
    }
  }

  return (
    <Container sx={{ p: 2, mx: 'auto', width: 500 }}>
      <Typography component="h4" variant="h4" align="center">
        Admin panel
      </Typography>
      <Spoiler title="Users">
        <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
          <DatePicker onChange={(value) => setSortDate(value || new Date())} />
        </Box>
        {basket.baskets.map((currentBasket) => (
          <BasketCard
            key={currentBasket._id}
            basket={currentBasket}
            sortDate={sortDate}
            onChangeRole={onChangeRole}
            onDelete={deleteHandler}
          />
        ))}
      </Spoiler>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        {pageButtonTitles.map((title, index) => (
          <PageButton key={title} title={title} path={pageButtonPaths[index]} />
        ))}
      </Box>
    </Container>
  )
})
