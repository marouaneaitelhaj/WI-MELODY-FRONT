import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Ttier } from "../../state/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { createTier } from "../../state/tier/tierActions";
import { getUserAction } from "../../state/auth/authActions";
import { setOpenForAddTierForm, setTierForAddTierForm } from "../../state/formsModal/AddTierFormSlice";
import { useEffect } from "react";

export function AddTierForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Ttier>({
        defaultValues: {}
    });
    const dispatch = useAppDispatch()
    const { user } = useSelector((state: RootState) => state.auth);
    const { open, tier } = useSelector((state: RootState) => state.addTierForm);

    useEffect(() => {
        if (tier)
            reset({
                name: tier.name,
                description: tier.description,
                price: tier.price
            })
    }, [tier])

    const handleClose = () => {
        dispatch(setTierForAddTierForm({} as Ttier))
        dispatch(setOpenForAddTierForm(false));
    };

    const onSubmit: SubmitHandler<Ttier> = async (data: Ttier) => {
        if (user?.id) {
            data.artist_id = user?.id;
        }
        dispatch(createTier(data)).then(() => {
            dispatch(getUserAction());
            handleClose();
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Tier</DialogTitle>
            <DialogContent>
                <form className="space-y-4 my-2" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Monthly price"
                        type="number"
                        value={tier?.price}
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

                    <TextField
                        label="Tier name"
                        fullWidth
                        type="text"
                        value={tier?.name}
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

                    <TextField
                        label="Tier description"
                        multiline
                        fullWidth
                        value={tier?.description}
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
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >
    );
}
