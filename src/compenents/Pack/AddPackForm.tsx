import { useForm, SubmitHandler } from "react-hook-form";
import { Tpack } from "../../state/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { createPack, updatePack } from "../../state/pack/packActions";
import { getUserAction } from "../../state/auth/authActions";
import { setOpen } from "../../state/formsModal/AddPackFormSlice";
import { useEffect } from "react";
import { uploadImage } from "../../state/mycdn/cdnActions";

export default function AddPackForm() {
    const { user } = useSelector((state: RootState) => state.auth);
    const { open, pack } = useSelector((state: RootState) => state.addPackForm);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm<Tpack>(pack ? {
        defaultValues: {}
    } : {});
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Tpack> = async (data: Tpack) => {
        if (pack?.cover) {
            dispatch(updatePack({ id: pack?.id, updatedPack: data } as { id: string, updatedPack: Partial<Tpack> })).then(() => {
                dispatch(getUserAction());
                dispatch(setOpen(false));
            });
        } else {
            dispatch(createPack(data)).then(() => {
                dispatch(getUserAction());
                dispatch(setOpen(false));
            });
        }

    }

    useEffect(() => {
        if (pack)
            reset({
                name: pack.name,
                description: pack.description,
                cover: pack?.cover,
                tier_id: pack.tier?.id
            })
    }, [pack])


    return (
        <Dialog open={open} onClose={() => dispatch(setOpen(false))}>
            {!pack?.id && (<DialogTitle>Add Pack</DialogTitle>)}
            {pack?.id && (<DialogTitle>Update Pack</DialogTitle>)}
            <DialogContent>
                <form className="space-y-4 my-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="name" className="text-sm font-medium">Name:</label>
                        <input
                            id="name"
                            placeholder="lil baby type beat"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters"
                                }
                            })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="description" className="text-sm font-medium">Description:</label>
                        <input
                            id="description"
                            placeholder="Description"
                            type="text"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters"
                                }
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
                                        reset({ ...pack, cover: url });
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
                    <div className="flex flex-col w-[500px]">
                        <label htmlFor="tier_id" className="text-sm font-medium">Tier:</label>
                        <select
                            id="tier_id"
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("tier_id", {
                                required: "Tier is required",
                            })}
                            defaultValue={pack?.tier?.id || ""}
                        >
                            <option value="" hidden disabled selected>Select a tier</option>
                            {user?.tiers.map((tier) => {
                                return <option key={tier.id} value={tier.id}>{tier.name}</option>
                            })}
                        </select>
                        {errors.tier_id && <span className="text-red-500 text-sm">{errors.tier_id.message}</span>}
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpen(false))}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
