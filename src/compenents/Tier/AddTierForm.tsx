import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Ttier } from "../../state/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import AxiosInstanceForMyApi from "../../axios/AxiosInstanceForMyApi";
import { createTier } from "../../state/tier/tierActions";

export function AddTierForm(props: { tier: Ttier, setTier: React.Dispatch<React.SetStateAction<Ttier | null>>, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
    const { register, handleSubmit, formState: { errors } } = useForm<Ttier>({
        defaultValues: {}
    });
    const dispatch = useAppDispatch()
    const { user } = useSelector((state: RootState) => state.auth);



    const handleClose = () => {
        props.setTier({} as Ttier);
        props.setOpen(false);
    };

    const onSubmit: SubmitHandler<Ttier> = async (data: Ttier) => {
        if (user?.id) {
            data.artist_id = user?.id;
        }
        dispatch(createTier(data))
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Add Tier</DialogTitle>
            <DialogContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="block">
                        <TextField
                            label="Monthly price"
                            type="number"
                            value={props.tier.price}
                            placeholder="5.00"
                            {...register("price", {
                                required: "Price is required",
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: "Price must be a number with 2 decimal places",
                                },
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </div>
                    <div className="block">
                        <TextField
                            label="Tier name"
                            type="text"
                            value={props.tier.name}
                            placeholder="Tier name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 5,
                                    message: "Name must be at least 5 characters",
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </div>
                    <div className="block">
                        <TextField
                            label="Tier description"
                            multiline
                            value={props.tier.description}
                            minRows={3}
                            placeholder="Access to exclusive content and more"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters",
                                },
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
