import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {SelectProps} from '../../interfaces/props'

export const AppSelect: React.FC<SelectProps> = (props) => {
    const values = props.values.map(v => v.toString())
    const value = props.value ? props.value.toString() : ''

    const [checked, setChecked] = React.useState(value)

    const handleChange = (event: SelectChangeEvent) => {
        setChecked(event.target.value as string)
        props.changeHandler(event.target.value as string)
    }

    return (
        <Box sx={{minWidth: 120, my: 2}}>
            <FormControl fullWidth>
                <InputLabel id='my-select-label'>{props.label}</InputLabel>
                <Select
                    labelId='my-select-label'
                    value={checked}
                    label={props.label}
                    onChange={handleChange}
                >
                    {values.map((value, index) => (
                        <MenuItem key={value} value={value}>{props.options[index]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
