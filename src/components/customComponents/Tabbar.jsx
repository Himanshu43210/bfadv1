import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/navigation';

function Tabbar({
    component,
    currTab,
    handleTabChange,
    doNavigate,
    urlTemp
}) {
    const navigate = useRouter();

    const handleChange = (event, newValue) => {
        console.log('=========== HANDLE CHANGE : TAB ==========', newValue);
        if (doNavigate && urlTemp) {
            navigate.push(urlTemp.replace('{TAB}', component?.tabs?.[newValue]?.key));
        } else {
            handleTabChange(newValue);
        }
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }} classes='tabs_box'>
            <Tabs value={currTab} onChange={handleChange} classes='tabs_wrapper' variant='scrollable'>
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