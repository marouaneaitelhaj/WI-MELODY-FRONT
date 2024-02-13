import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import cloudinaryInstance from "../axios/AxiosInstanceForCloudinary";
import AxiosInstanceForMyApi from "../axios/AxiosInstanceForMyApi";
import AxiosInstanceForAuth from "../axios/AxiosInstanceForAuth";

type FormInputs = {
    username: string,
    password: string,
    profilePicture: string,
    role: role
}
type role = {
    type: 'USER' | 'ADMIN' | 'ARTIST'
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const formData = new FormData();
        formData.append('file', data.profilePicture[0]);
        formData.append('upload_preset', 'a8vbtvzm');
        await cloudinaryInstance.post('https://api.cloudinary.com/v1_1/dvr7oyo77/upload', formData)
        .then(res => {
            data.profilePicture = res.data.secure_url;
        })
        .catch(err => {
            console.log(err);
        });
        await AxiosInstanceForAuth.post('/auth/signup', data).then(res => {
            localStorage.setItem('token', res.data.token);
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="w-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-svh bg-gray-50  flex items-center flex-col justify-center">
                <p className="text-4xl font-bold px-56 text-right text-black my-4">SignUp</p>
                <div className="my-2">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                    <input type="text" {...register("username",
                        {
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
                <div className="my-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="text" {...register("password",
                        {
                            required: "Password is required",
                            minLength: {
                                value: 5,
                                message: "Password must be at least 5 characters"
                            }
                        })} id="password" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.password && <p className="text-red-500 text-sm">{
                        errors.password.message
                    }</p>}
                </div>
                <div className="my-2">
                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture</label>
                    <input type="file" {...register("profilePicture",
                        {
                            required: "Profile Picture is required",
                        })} id="profilePicture" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.profilePicture && <p className="text-red-500 text-sm">{
                        errors.profilePicture.message
                    }</p>}
                </div>
                <div className="my-2">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Account Type</label>
                    <select {...register("role", {
                        required: "Account Type is required",
                    })} id="role" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                        <option value="USER" selected>User</option>
                        <option value="ARTIST">Artist</option>
                    </select>
                </div>
                <button disabled={isSubmitting} className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">
                    {isSubmitting ? "Loading..." : "SignUp"}
                </button>
            </form>
            <img className="w-1/2 h-svh" src="https://i0.wp.com/www.passionweiss.com/wp-content/uploads/2017/01/boomin.jpg?ssl=1" alt="" />
        </div>
    )
}