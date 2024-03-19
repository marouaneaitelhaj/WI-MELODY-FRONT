import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../state/store";
import { uploadImage } from "../state/mycdn/cdnActions";
import { signUpAction } from "../state/auth/authActions";
import { Tuser } from "../state/types";

type FormInputs = {
    username: string,
    password: string,
    email: string,
    profilePicture: string | File,
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        dispatch(uploadImage(data.profilePicture as File)).unwrap().then((res) => {
            data.profilePicture = res;
            dispatch(signUpAction(data as Tuser))
        });
        // await cloudinaryInstance.post('https://api.cloudinary.com/v1_1/dvr7oyo77/upload', formData)
        //     .then(res => {
        //         data.profilePicture = res.data.secure_url;
        //         dispatch(signUpAction(data))
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }
    return (
        <div className="w-screen h-[700px] flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 bg-gray-50 h-full flex items-center flex-col justify-center">
                <p className="text-4xl font-bold px-56 text-right text-black my-4">SignUp</p>
                <div className="my-2">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username :</label>
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
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email :</label>
                    <input type="text" {...register("email",
                        {
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
                <div className="my-2">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password :</label>
                    <input type="password" {...register("password",
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
                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture :</label>
                    <input type="file"
                        {...register("profilePicture",
                            {
                                required: "Profile Picture is required",
                            })} id="profilePicture" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.profilePicture && <p className="text-red-500 text-sm">{
                        errors.profilePicture.message
                    }</p>}
                </div>
                <button disabled={isSubmitting} className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">
                    {isSubmitting ? "Loading..." : "SignUp"}
                </button>
            </form>
            <img className="w-1/2 h-full object-cover" src="https://i0.wp.com/www.passionweiss.com/wp-content/uploads/2017/01/boomin.jpg?ssl=1" alt="" />
        </div>
    )
}