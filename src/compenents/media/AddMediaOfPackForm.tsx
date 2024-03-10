import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Tmedia, Tpack } from '../../state/types';
import AxiosInstanceForMyApi from '../../axios/AxiosInstanceForMyApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Dispatch, Fragment, SetStateAction, useEffect, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../state/store';
import { createMedia } from '../../state/media/mediaActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddMediaOfPackForm(props: { pack: Tpack, setOpen: Dispatch<SetStateAction<boolean>>, open: boolean }) {
  const [media, setMedia] = useState<Tmedia[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<Tmedia[]>([])
  const dispatch = useAppDispatch()

  

  const handleClose = () => {
    dispatch(createMedia(uploadedFiles))
    props.setOpen(false);
  };

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        uploadFile(files[i]).then(url => {
          setUploadedFiles(prevFiles => [...prevFiles, { src: url, pack_id:props.pack.id } as Tmedia]);
        }).catch(error => {
          // Handle error
        });
      }
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await AxiosInstanceForMyApi.post('http://localhost:5000/upload-audio', formData);
      return response.data.url as string;
    } catch (error) {
      // Handle error
      throw error;
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
        open={props.open}
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
            <VisuallyHiddenInput multiple  onChange={handlechange} type="file" accept='audio/mp3' />
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