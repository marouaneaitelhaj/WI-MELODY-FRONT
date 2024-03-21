import { SubmitHandler, useForm } from "react-hook-form";
import { TartistRequests, Tuser } from "../../state/types";
import { useState } from "react";
import cloudinaryInstance from "../../axios/AxiosInstanceForCloudinary";
import { RootState, useAppDispatch } from "../../state/store";
import { signUpAction } from "../../state/auth/authActions";
import { useSelector } from "react-redux";
import BecomingArtistConfirmation from "./BecomingArtistConfirmation";
import { saveArtistRequest } from "../../state/artistRequests/artistActions";

export function EditProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm<Tuser>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [func, setFunc] = useState<any>();
    const onSubmit: SubmitHandler<Tuser> = async (data) => {
        const formData = new FormData();
        formData.append('file', data.profilePicture[0]);
        formData.append('upload_preset', 'a8vbtvzm');
        await cloudinaryInstance.post('https://api.cloudinary.com/v1_1/dvr7oyo77/upload', formData)
            .then(res => {
                data.profilePicture = res.data.secure_url;
                dispatch(signUpAction(data))
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-wrap py-8 px-16 flex">
                <div className="text-gray-500 text-3xl py-7 w-full text-center">
                    Account Information
                </div>
                <div className="my-2  w-1/2">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username :</label>
                    <input type="text" disabled value={user?.username} {...register("username",
                        {
                            disabled: true,
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username must be at least 5 characters"
                            }
                        })} id="username" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.username && <p className="text-red-500 text-sm">{
                        errors.username.message
                    }</p>}
                </div>
                <div className="my-2  w-1/2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email :</label>
                    <input type="text" disabled value={user?.email} {...register("email",
                        {
                            disabled: true,
                            required: "Email is required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })} id="email" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.email && <p className="text-red-500 text-sm">{
                        errors.email.message
                    }</p>}
                </div>
                <div className="my-2  w-1/2">
                    <button className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">Edit</button>
                </div>
                <div className="my-2  w-1/2">
                    {(!user?.alreadyRequested && (user?.role == "FAN")) && (
                        <button
                        onClick={() => {
                            setOpen(true);
                            setFunc(() => () => saveArtistRequest({ fan_id: user?.id } as TartistRequests))
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4">Become an Artist</button>
                    )}
                </div>
            </form>
            <BecomingArtistConfirmation setOpen={setOpen} open={open} func={func} />
        </>
    )
}