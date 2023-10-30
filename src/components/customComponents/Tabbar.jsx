import React from 'react';
import Box from '@mui/material/Box/Box.js';
import Tabs from '@mui/material/Tabs/Tabs.js';
import Tab from '@mui/material/Tab/Tab.js';

function Tabbar({
    component
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log('=========== HANDLE CHANGE : TAB ==========', newValue);
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} classes='tabs_box'>
            <Tabs value={value} onChange={handleChange} classes='tabs_wrapper' variant='scrollable'>
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