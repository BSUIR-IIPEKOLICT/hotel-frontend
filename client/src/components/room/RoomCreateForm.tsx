import React, { useContext, useState } from 'react'
import { Box, Button } from '@mui/material'
import { roomApi } from '../../api'
import { Context } from '../../store'
import { AppSelect } from '../app/AppSelect'
import { observer } from 'mobx-react-lite'
import { RoomCreateFormProps } from '../../interfaces/props'

export const RoomCreateForm: React.FC<RoomCreateFormProps> = observer(
  ({ loadRooms }) => {
    const { room, type, building } = useContext(Context)
    const [checkedBuilding, setCheckedBuilding] = useState('')
    const [checkedType, setCheckedType] = useState('')

    const typeOptions = ['none', ...type.types.map(({ name }) => name)]
    const typeValues = ['', ...type.types.map(({ _id }) => _id)]
    const buildingOptions = [
      'none',
      ...building.buildings.map(({ address }) => address),
    ]
    const buildingValues = ['', ...building.buildings.map(({ _id }) => _id)]

    const createHandler = () => {
      if (checkedBuilding && checkedType) {
        roomApi
          .create(checkedBuilding, checkedType)
          .then(() => loadRooms())
          .catch((e) => console.error(e))
      }
    }

    const changeHandler = () => {
      if (room.editedRoom && checkedBuilding && checkedType) {
        roomApi
          .change(room.editedRoom, checkedBuilding, checkedType)
          .then((response) => {
            room.changeRoom(response)
            room.setEditedRoom('')
            room.toggleIsEdit()
          })
          .catch((e) => console.error(e))
      }
    }

    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          px: 1,
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <AppSelect
          label="Type"
          options={typeOptions}
          values={typeValues}
          value={checkedType}
          changeHandler={(type: string) => setCheckedType(type)}
        />
        <AppSelect
          label="Building"
          options={buildingOptions}
          values={buildingValues}
          value={checkedBuilding}
          changeHandler={(b: string) => setCheckedBuilding(b)}
        />
        <Button
          variant="contained"
          onClick={room.isEdit ? changeHandler : createHandler}
        >
          {room.isEdit ? 'Edit room' : 'Add room'}
        </Button>
      </Box>
    )
  }
)
