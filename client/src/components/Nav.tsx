import React, {useContext} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'

export const Nav: React.FC = observer(() => {
    const {user} = useContext(Context)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                        Hotel app
                    </Typography>

                    {user.isAuth && user.role === 'admin' && (
                        <Button variant={'outlined'} color='inherit' sx={{mx: 1}}>Create</Button>
                    )}

                    {user.isAuth && (
                        <Button variant={'outlined'} color='inherit' sx={{mx: 1}}>Logout</Button>
                    )}

                    {!user.isAuth && (
                        <Box>
                            <Button variant={'outlined'} color='inherit' sx={{mx: 1}}>Register</Button>
                            <Button variant={'outlined'} color='inherit' sx={{mx: 1}}>Login</Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
})
