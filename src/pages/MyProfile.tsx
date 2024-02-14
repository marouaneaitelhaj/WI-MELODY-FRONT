import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { SubmitHandler, useForm } from "react-hook-form";
import cloudinaryInstance from "../axios/AxiosInstanceForCloudinary";
import { signUpAction } from "../state/auth/authActions";

type FormInputs = {
    username: string,
    password: string,
    email: string,
    profilePicture: string,
}
export const MyProfile = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const formData = new FormData();
        formData.append('file', data.profilePicture[0]);
        formData.append('upload_preset', 'a8vbtvzm');
        await cloudinaryInstance.post('https://api.cloudinary.com/v1_1/dvr7oyo77/upload', formData)
            .then(res => {
                data.profilePicture = res.data.secure_url;
                dispatch(signUpAction(data))
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="w-screen h-96 flex flex-col">
                <img
                    className="h-96 w-screen object-cover"
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/a62e97d786d84cf78bc3f63c990e4ea8/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/1.jpg?token-time=1709510400&token-hash=S379zrDrSVHVJQTnYXD7rjZIuoKE9qy93BVivI5n6ug%3D"
                    alt=""
                />
            </div>
            <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                <img
                    className="h-32 rounded-md border w-32"
                    src={user?.profilePicture}
                    alt=""
                />
                <p className="text-gray-500 my-2 font-bold text-4xl">{user?.username}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-wrap p-16 flex">
                    <div className="my-2  w-1/2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username :</label>
                        <input type="text" value={user?.username} {...register("username",
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
                    <div className="my-2  w-1/2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email :</label>
                        <input type="text" value={user?.email} {...register("email",
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
                    {/* <div className="my-2  w-1/2">
                        <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">Profile Picture :</label>
                        <input type="file" value={user?.profilePicture} {...register("profilePicture",
                            {
                                required: "Profile Picture is required",
                            })} id="profilePicture" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                        {errors.profilePicture && <p className="text-red-500 text-sm">{
                            errors.profilePicture.message
                        }</p>}
                    </div> */}
                </form>
            </div>
        </>
    );
};