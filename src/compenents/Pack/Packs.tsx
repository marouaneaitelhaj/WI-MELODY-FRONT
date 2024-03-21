import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { Pack } from "./Pack";
import { useSelector } from "react-redux";
import { getPacks, getPacksByArtistId } from "../../state/pack/packActions";
import { Tmedia, Tuser } from "../../state/types";
import AlbumIcon from '@mui/icons-material/Album';
import { Box } from "@mui/material";

export default function Packs(props: { selectedArtist: Tuser | null }) {
    const dispatch = useAppDispatch();

    const { packs } = useSelector((state: RootState) => state.pack);
    const { medias } = useSelector((state: RootState) => state.media);
    const { selectedArtist } = useSelector((state: RootState) => state.artist);
    const [selectedMedia, setSelectedMedia] = useState<Tmedia>({} as Tmedia)
    const playAudio = (media: Tmedia) => {
        if (selectedMedia.src === media.src) {
            setSelectedMedia({} as Tmedia)
            document.querySelector('audio')?.pause()
            return
        } else {
            setSelectedMedia(media)
        }
    }



    useEffect(() => {
        dispatch(getPacksByArtistId(selectedArtist?.id!));
    }, [])
    return (
        <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
            <div className="text-3xl w-full text-center my-3">Recent posts by {selectedArtist?.username}</div>
            <Box className="grid grid-cols-2 w-1/2 h-[500px] overflow-x-scroll">
                {packs.map((pack) => {
                    return <Pack key={pack.id} pack={pack} />
                })}
            </Box>
            <Box className="flex flex-col w-1/2 h-[500px] overflow-x-scroll">
                {medias.map((media) => {
                    return <Player media={media} key={media.id} />
                })}
            </Box>
            <audio
                className='absolute bottom-0 rounded-none'
                src={selectedMedia.src}
                autoPlay
            />
        </div>
    )
    function Player(props: { media: Tmedia }) {
        return (
            <div className="flex flex-row hover:bg-gray-200 space-x-5 items-center p-5 m-2 rounded cursor-pointer" onClick={
                () => {
                    playAudio(props.media)
                }
            }>
                <AlbumIcon />
                <div className="text-1xl">{
                    props.media.id + " - " + props.media.pack.name
                }</div>
            </div>
        )
    }
}
