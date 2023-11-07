import React from 'react';
import Box from '@mui/material/Box/Box.js';
import Tabs from '@mui/material/Tabs/Tabs.js';
import Tab from '@mui/material/Tab/Tab.js';
import { useNavigate } from 'react-router-dom';

function Tabbar({
    component,
    currTab,
    handleTabChange,
    doNavigate,
    urlTemp
}) {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(currTab);

    const handleChange = (event, newValue) => {
        console.log('=========== HANDLE CHANGE : TAB ==========', newValue);
        setValue(newValue);
        if (doNavigate && urlTemp) {
            navigate(urlTemp.replace('{TAB}', component?.tabs?.[newValue]?.key));
        } else {
            handleTabChange(newValue);
        }
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