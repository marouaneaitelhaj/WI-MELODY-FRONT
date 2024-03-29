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
import PaymentHistory from '../compenents/payment/PaymentHistory';
import { uploadImage } from '../state/mycdn/cdnActions';
import { updateBannerProfile, updateprofilePicture } from '../state/auth/authActions';
import { showAlertPopUp } from '../state/confirmationPopUp/AlertSlice';

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
                    <Typography component={"span"}>{children}</Typography>
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
                <label htmlFor='banner'>
                    <img
                        className="h-72 w-screen object-cover cursor-pointer hover:brightness-75 z-10 duration-500 ease-in-out"

                        src={user?.banner || 'https://i1.sndcdn.com/visuals-000479340132-gGD9WT-t1240x260.jpg'}
                    />
                </label>
                <input id='banner' type='file' hidden onChange={(e) => {
                    dispatch(uploadImage(e.target.files![0])).unwrap().then((url) => {
                        dispatch(updateBannerProfile({ banner: url })).unwrap().then(() => {
                            dispatch(showAlertPopUp({ title: "Banner updated", open: true, severity: "success" }))
                        })
                    })
                }} />
            </div>
            <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                <label htmlFor='profilePicture'>
                    <img
                        className="h-32 rounded-md border w-32 hover:brightness-75 duration-500 ease-in-out z-50 cursor-pointer"
                        src={user?.profilePicture}
                        alt=""
                    />
                </label>
                <input id='profilePicture' type='file' hidden onChange={(e) => {
                    dispatch(uploadImage(e.target.files![0])).unwrap().then((url) => {
                        dispatch(updateprofilePicture({ profilePicture: url })).unwrap().then(() => {
                            dispatch(showAlertPopUp({ title: "Profile Picture updated", open: true, severity: "success" }))
                        })
                    })
                }} />
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
                                        <Tab label="Payment History" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <EditProfile />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <PaymentHistory />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    )}
                </>
            </div>
        </>
    );
}
