import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import React, { useEffect } from "react";
import { getArtistById } from "../state/artist/artistActions";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Tiers from "../compenents/Tier/Tiers";
import Posts from "../compenents/Pack/Packs";
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
export default function ArtistProfile(props: { artistId: string | undefined }) {
    const { selectedArtist } = useSelector((state: RootState) => state.artist);
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(getArtistById(props.artistId!))
    }, []);
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
                    className="h-32 rounded-md border w-32 object-cover"
                    src={selectedArtist?.profilePicture}
                    alt=""
                />
                <p className="text-black text-3xl my-5">{selectedArtist?.username}</p>
                <p className="text-gray-500">309 posts</p>
                <button className="bg-blue-800 text-white px-4 my-5 py-2 rounded-md mt-4">Follow</button>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Tiers" {...a11yProps(0)} />
                            <Tab label="Postes" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Tiers selectedArtist={selectedArtist} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Posts selectedArtist={selectedArtist}></Posts>
                    </CustomTabPanel>
                </Box>
            </div>
        </>
    )
}