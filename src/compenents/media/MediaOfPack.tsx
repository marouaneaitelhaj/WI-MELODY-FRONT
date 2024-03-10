import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Tmedia, Tpack } from '../../state/types';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi';
import ReactAudioPlayer from 'react-audio-player';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function MediaOfPack(props: { pack: Tpack, setOpen: Dispatch<SetStateAction<boolean>>, open: boolean }) {
    const handleClose = () => {
        props.setOpen(false);
    };
    const [media, setMedia] = useState<Tmedia[]>([])
    const [selectedMedia, setSelectedMedia] = useState<Tmedia>({} as Tmedia)

    const audioElement = useRef()

    useEffect(() => {
        AxiosInstanceForMyApi.get('/media/pack/' + props.pack.id).then((res) => {
            setMedia(res.data)
        })
    }, [props.pack])

    const playAudio = (media: Tmedia) => {
        setSelectedMedia(media)
    }
    return (
        <Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Content
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers className='flex justify-start flex-wrap'
                    sx={{
                        height: '400px',
                        position: 'relative'
                    }}
                >
                    <div className='h-[350px] overflow-scroll '>
                        {media && media.map(m => {
                            return (
                                <AudioFileIcon
                                    key={m.id}

                                    onClick={() => {
                                        playAudio(m)
                                    }}

                                    sx={{
                                        height: '8rem',
                                        width: '8rem',
                                    }}
                                    className={` rounded cursor-pointer ${selectedMedia && selectedMedia.id === m.id ? 'text-white bg-black' : ''
                                        }`}
                                    titleAccess={m.pack.name + ' ' + m.src}
                                ></AudioFileIcon>
                            )
                        })}
                    </div>

                    <audio
                        className='absolute bottom-0 rounded-none'
                        src={selectedMedia.src}
                        autoPlay
                    />
                </DialogContent>
            </BootstrapDialog>
        </Fragment >
    )
}