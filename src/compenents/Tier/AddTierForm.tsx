import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Ttier } from "../../state/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { createTier, updateTier } from "../../state/tier/tierActions";
import { getUserAction } from "../../state/auth/authActions";
import { setOpenForAddTierForm, setTierForAddTierForm } from "../../state/formsModal/AddTierFormSlice";
import { useEffect } from "react";
import { uploadImage } from "../../state/mycdn/cdnActions";
import { Slide } from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
                price: tier.price,
                cover: tier?.cover,
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
        if (tier?.id) {
            dispatch(updateTier({ id: tier.id, tier: data } as { id: string; tier: Ttier })).then(() => {
                dispatch(getUserAction());
                handleClose();
            });
        } else {
            dispatch(createTier(data)).then(() => {
                dispatch(getUserAction());
                handleClose();
            });
        }
    };

    return (
        <Dialog TransitionComponent={Transition} open={open} onClose={handleClose}>
            {!tier?.id && (<DialogTitle>Add Tier</DialogTitle>)}
            {tier?.id && (<DialogTitle>Update Tier</DialogTitle>)}
            <DialogContent>
                <form className="space-y-4 my-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="price" className="text-sm font-medium">Monthly price:</label>
                        <input
                            id="price"
                            placeholder="5.00"
                            type="number"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("price", {
                                required: "Price is required",
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: "Price must be a number with 2 decimal places",
                                },
                            })}
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="name" className="text-sm font-medium">Tier name:</label>
                        <input
                            id="name"
                            placeholder="Tier name"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 5,
                                    message: "Name must be at least 5 characters",
                                },
                            })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="description" className="text-sm font-medium">Tier description:</label>
                        <textarea
                            id="description"
                            placeholder="Access to exclusive content and more"
                            rows={3}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters",
                                },
                            })}
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="cover" className="text-sm font-medium">Cover:</label>
                        <input
                            id="cover"
                            hidden
                            type="file"
                            onChange={async (e) => {
                                if (e.target.files && e.target.files[0])
                                    dispatch(uploadImage(e.target.files[0] as File)).unwrap().then((url) => {
                                        reset({ ...tier, cover: url });
                                    })
                            }}
                            className="mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <input type="text" hidden {...register("cover", {
                            required: "Cover is required"
                        })} />
                        <label htmlFor="cover" className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 cursor-pointer">Choose a cover</label>
                        {errors.cover && <span className="text-red-500 text-sm">{errors.cover.message}</span>}
                    </div>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Save</Button>
                    </DialogActions>
                </form>

            </DialogContent>
        </Dialog >
    );
}
