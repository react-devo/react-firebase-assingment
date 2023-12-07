import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'



const CustomDropDown = ({title,value,setValue,MenuData }) => {
    return (
        <FormControl fullWidth style={{ marginBottom: '1.5rem' }}>
            <InputLabel>{title}</InputLabel>
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: '100%' }}
            >
                {MenuData?.map((item) => {
                    return (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )
                })}

            </Select>
        </FormControl>
    )
}

export default CustomDropDown;