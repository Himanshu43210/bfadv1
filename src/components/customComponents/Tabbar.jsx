import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function Tabbar({
    component
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} classes='tabs_box'>
            <Tabs value={value} onChange={handleChange} centered classes='tabs_wrapper'>
                {
                    component.tabs?.map((tab, index) => (
                        <Tab label={tab.label} key={index} className='tab_item' />
                    ))
                }
            </Tabs>
        </Box>
    );
}

export default Tabbar;