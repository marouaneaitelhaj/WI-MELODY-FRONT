import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, set, get } from "react-hook-form";
import { Tpack } from "../../state/types";
import { useSelector } from "react-redux";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { RootState, useAppDispatch } from "../../state/store";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createPack } from "../../state/pack/packActions";
import { MenuItem, Select } from "@mui/material";
import { getUserAction } from "../../state/auth/authActions";

export default function AddPackForm(props: { pack: Tpack, setPack: React.Dispatch<React.SetStateAction<Tpack | undefined>>, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<Tpack>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [name, setName] = useState(props.pack.name || '');
    const [description, setDescription] = useState(props.pack.description || '');
    const [cover, setCover] = useState(props.pack.cover || '');
    const dispatch = useAppDispatch()

    useEffect(() => {
        setName(props.pack.name);
        setDescription(props.pack.description);
    }, [props.pack]);

    const handleClose = () => {
        props.setPack({} as Tpack);
        console.log(props.pack.id + "pack");
        props.setOpen(false);
    };

    const onSubmit: SubmitHandler<Tpack> = async (data: Tpack) => {
        if (user?.id)
            data.cover = await uploadFile(data.cover[0] as File);
        dispatch(createPack(data)).then(() => {
            dispatch(getUserAction());
            handleClose();
        });

    }

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await AxiosInstanceForMyApi.post('http://localhost:5000/upload-image', formData);
            return response.data.url as string;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Pack</DialogTitle>
            <DialogContent>
                <form className="space-y-4 my-2" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        placeholder="lil baby type beat"
                        type="text"
                        variant="outlined"
                        value={name}
                        fullWidth
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters"
                            }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Description"
                        placeholder="Description"
                        type="text"
                        value={description}
                        variant="outlined"
                        fullWidth
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters"
                            }
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        type="file"
                        {...register("cover", {
                        })}
                        variant="outlined"
                        fullWidth
                        {...register("cover", {
                        })}
                    />
                    <Select fullWidth {...register("tier_id", {
                    })}>

                        {user?.tiers.map((tier) => {
                            return <MenuItem value={tier.id}>{tier.name}</MenuItem>
                        })}
                    </Select>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
