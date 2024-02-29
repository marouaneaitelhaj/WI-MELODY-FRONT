import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function AlertFx() {
  const { success, message } = useSelector((state: RootState) => state.auth);
  if (!success) return null;
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      {message}
    </Alert>
  );
}