import React from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { Tpack } from "../../state/types";
import { useSelector } from "react-redux";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { RootState } from "../../state/store";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddPackForm(props: { pack: Tpack, setPack: React.Dispatch<React.SetStateAction<Tpack | undefined>>, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<Tpack>();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setPack({} as Tpack);
        props.setOpen(false);
    };

    const onSubmit: SubmitHandler<Tpack> = async (data: Tpack) => {
        if (user?.id)
            AxiosInstanceForMyApi.post("/pack", data).then(res => {
                handleClose();
            }).catch(err => {

            })
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Pack</DialogTitle>
            <DialogContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        placeholder="lil baby type beat"
                        type="text"
                        variant="outlined"
                        value={props.pack.name}
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
                        value={props.pack.description}
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
                    {/* <TextField
                        select
                        label="Price"
                        variant="outlined"
                        value={props.pack.price}
                        fullWidth
                        {...register("tier_id")}
                    >
                        {user?.tiers.map((tier) => (
                            <option key={tier.id} value={tier.id}>
                                {tier.name}
                            </option>
                        ))}
                    </TextField> */}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
