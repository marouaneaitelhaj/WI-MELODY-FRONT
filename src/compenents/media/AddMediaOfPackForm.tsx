import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Dispatch, Fragment, SetStateAction, ChangeEvent } from 'react';
import { RootState, useAppDispatch } from '../../state/store';
import { createMedia } from '../../state/media/mediaActions';
import { uploadAudio } from '../../state/mycdn/cdnActions';
import { clearAudio } from '../../state/mycdn/cdnSlice';
import { useSelector } from 'react-redux';
import { Tpack } from '../../state/types';
import { setOpen } from '../../state/formsModal/AddMediaOfPackFormSlice';

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



  const handleClose = () => {
    dispatch(createMedia(audios))
    dispatch(clearAudio())
    dispatch(setOpen(false))
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
        <DialogContent dividers className='w-96 flex justify-center'>
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