import { useForm, SubmitHandler } from "react-hook-form";
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
import { setOpen } from "../../state/formsModal/AddPackFormSlice";
import { useEffect } from "react";

export default function AddPackForm() {
    const { user } = useSelector((state: RootState) => state.auth);
    const { open, pack } = useSelector((state: RootState) => state.addPackForm);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm<Tpack>(pack ? {
        defaultValues: {}
    } : {});
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Tpack> = async (data: Tpack) => {
        if (user?.id)
            data.cover = await uploadFile(data.cover[0] as File);
        dispatch(createPack(data)).then(() => {
            dispatch(getUserAction());
            dispatch(setOpen(false));
        });

    }

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await AxiosInstanceForMyApi.post('http://localhost:5000/upload-image', formData);
            return response.data.url as string;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        if (pack)
            reset({
                name: pack.name,
                description: pack.description,
                cover: pack.cover,
                tier_id: pack.tier_id
            })
    }, [pack])


    return (
        <Dialog open={open} onClose={() => dispatch(setOpen(false))}>
            <DialogTitle>Add Pack</DialogTitle>
            <DialogContent>
                <form className="space-y-4 my-2" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        placeholder="lil baby type beat"
                        type="text"
                        variant="outlined"
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
                            required: "Cover image is required",
                        })}
                        error={!!errors.cover}
                        helperText={errors.cover?.message}
                        variant="outlined"
                        fullWidth
                    />
                    <Select
                        fullWidth
                        {...register("tier_id", {
                            required: "Tier is required"
                        })}
                        // onChange={(e) => {
                        //     console.log(e.target.value);

                        // }}
                        defaultValue={pack?.tier?.id || ''}
                        placeholder="Select a tier"
                        error={!!errors.tier_id}>
                        {user?.tiers.map((tier) => {
                            return <MenuItem key={tier.id} value={tier.id}>{tier.name}</MenuItem>
                        })}
                    </Select>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setOpen(false))}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
