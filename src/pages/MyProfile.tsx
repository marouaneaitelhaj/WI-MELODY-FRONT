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
                    src="data:image/jpeg;base64,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"
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
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Pack" {...a11yProps(0)} />
                            <Tab label="Tier" {...a11yProps(1)} />
                            <Tab label="Edit Profile" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <PacksManagementList></PacksManagementList>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <TiersManagementList></TiersManagementList>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <EditProfile />
                    </CustomTabPanel>
                </Box>
            </div>
        </>
    );
}
