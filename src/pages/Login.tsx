import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { getUserAction, loginAction } from "../state/auth/authActions";
import { Tuser } from "../state/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Login() {
    const { error, loading, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Tuser>();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/artists");
        }
    }, [isAuthenticated])
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Tuser> = async (data: Tuser) => {
        dispatch(loginAction(data)).then((res) => {
            dispatch(getUserAction())
        })
    }
    return (
        <div className="w-screen h-[700px] flex justify-center items-center">
            <img className="w-1/2 h-full object-cover" src="https://i0.wp.com/www.passionweiss.com/wp-content/uploads/2017/01/boomin.jpg?ssl=1" alt="" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full bg-gray-50  flex items-center flex-col justify-center">
                <p className="text-4xl font-bold px-56 text-right text-black my-4">Log in</p>
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
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Password :</label>
                    <input type="text" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        }
                    })} id="username" className="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                    {errors.password && <p className="text-red-500 text-sm">{
                        errors.password.message
                    }</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                {/* <Link to="/signup">
                    <p className="text-blue-800">Don't have an account? Sign up</p>
                </Link> */}
                <button disabled={isSubmitting} className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">
                    {(isSubmitting || loading) ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}