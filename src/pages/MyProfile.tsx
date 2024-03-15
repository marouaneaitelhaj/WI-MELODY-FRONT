import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RootState, useAppDispatch } from '../state/store';
import { useSelector } from 'react-redux';
import { EditProfile } from '../compenents/profil/EditProfile';
import AddPack from '../compenents/Pack/AddPackForm';
import TiersManagementList from '../compenents/Tier/TiersManagementList';
import PacksManagementList from '../compenents/Pack/PacksManagementList';
import BecomingArtistManagment from '../compenents/profil/BecomingArtistManagment';

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
                    src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                <>
                    {/* Artist Container */}
                    {user?.role === "ARTIST" && (
                        <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                            {/* Artist-specific content here */}
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Edit Profile" {...a11yProps(0)} />
                                        <Tab label="Pack" {...a11yProps(1)} />
                                        <Tab label="Tier" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <EditProfile />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <PacksManagementList />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <TiersManagementList />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    )}

                    {/* Admin Container */}
                    {user?.role === "ADMIN" && (
                        <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                            {/* Admin-specific content here */}
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Edit Profile" {...a11yProps(0)} />
                                        <Tab label="Becoming Artist" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <EditProfile />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <BecomingArtistManagment />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    )}

                    {/* Default Container (for other roles) */}
                    {user?.role !== "ARTIST" && user?.role !== "ADMIN" && (
                        <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                            {/* Default content here */}
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Edit Profile" {...a11yProps(0)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <EditProfile />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    )}
                </>
            </div>
        </>
    );
}
