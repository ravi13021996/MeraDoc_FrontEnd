import { FormControl, IconButton, Input, InputAdornment } from '@mui/material'
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'


type propType = {
    handleSearch: any
}

const Search = (props: propType) => {
    return (
        <Box sx={{ mt: 2 }}>  <FormControl variant='standard'>
            <Input type="text" placeholder='not working'
                onChange={(e) => props.handleSearch(e.target.value)}
                endAdornment={

                    <InputAdornment position="end">
                        <IconButton

                            aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        >
                            <SearchIcon
                            />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl> </Box>
    )
}

export default Search