import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RootState, useAppDispatch } from '../state/store';
import { useSelector } from 'react-redux';
import { EditProfile } from '../compenents/EditProfile';
import { AddTier } from '../compenents/AddTier';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function MyProfile() {

    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="w-screen h-72 flex flex-col">
                <img
                    className="h-72 w-screen object-cover"
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/a62e97d786d84cf78bc3f63c990e4ea8/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/1.jpg?token-time=1709510400&token-hash=S379zrDrSVHVJQTnYXD7rjZIuoKE9qy93BVivI5n6ug%3D"
                    alt=""
                />
            </div>
            <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                <img
                    className="h-32 rounded-md border w-32"
                    src={user?.profilePicture}
                    alt=""
                />
                <p className="text-gray-500 my-2 font-bold text-4xl">{user?.username}</p>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Tier" {...a11yProps(1)} />
                            <Tab label="Edit Profile" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <AddTier />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <EditProfile />
                    </CustomTabPanel>
                </Box>
            </div>
        </>
    );
}
