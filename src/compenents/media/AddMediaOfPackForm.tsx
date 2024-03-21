import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Fragment, ChangeEvent, useState } from 'react';
import { RootState, useAppDispatch } from '../../state/store';
import { createMedia } from '../../state/media/mediaActions';
import { uploadAudio } from '../../state/mycdn/cdnActions';
import { clearAudio, removeAudio } from '../../state/mycdn/cdnSlice';
import { useSelector } from 'react-redux';
import { setOpenForAddMediaToPack } from '../../state/formsModal/AddMediaOfPackFormSlice';
import { Box } from '@mui/material';
import { Tmedia } from '../../state/types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddMediaOfPackForm() {
  const { audios } = useSelector((state: RootState) => state.uploads)
  const dispatch = useAppDispatch()
  const { pack, open } = useSelector((state: RootState) => state.AddMediaOfPackForm)
  const [selectedMedia, setSelectedMedia] = useState<Tmedia>({} as Tmedia)



  const handleClose = () => {
    dispatch(createMedia(audios))
    dispatch(clearAudio())
    dispatch(setOpenForAddMediaToPack(false))
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (pack)
          dispatch(uploadAudio({
            file: files[i],
            pack_id: pack?.id
          }));
      }
    }
  }

  const playAudio = (media: Tmedia) => {
    setSelectedMedia(media)
  }


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Media
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
        <DialogContent dividers className='w-full flex justify-center'>
          <Box className='w-[1000px] flex justify-center'>
            <Box className='w-1/2 flex justify-center'>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput multiple onChange={handleInputChange} type="file" accept='audio/mp3' />
              </Button>
            </Box>
            <Box className='w-1/2 flex flex-wrap justify-center'>
              {audios.map((audio, index) => (
                <span onClick={() => {
                  playAudio(audio)
                }} className='bg-blue-700 text-white truncate w-44 rounded hover:bg-blue-500 cursor-pointer p-3 m-2' key={index}><DeleteIcon onClick={() => {
                  dispatch(removeAudio(audio.src))
                }} />{audio.src.length > 20 ? '...' + audio.src.substring(audio.src.length - 20) : audio.src}
                  
                </span>
              ))}
            </Box>
            <audio
              className='absolute bottom-0 rounded-none'
              src={selectedMedia.src}
              autoPlay
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}