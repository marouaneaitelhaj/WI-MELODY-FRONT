import { SubmitHandler, useForm } from "react-hook-form";
import { Ttier } from "../state/types";

export function AddTier() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Ttier>();
    const onSubmit: SubmitHandler<Ttier> = async (data: Ttier) => {
        // dispatch(loginAction(data)).then((res) => {
        //     dispatch(getUserAction())
        // })
    }
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Tier</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="block">
                    <label className="text-gray-700">Monthly price</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-7 pr-12"
                            placeholder="5.00"
                            type="number"
                            {...register("price", {
                                required: "Price is required",
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: "Price must be a number with 2 decimal places"
                                }
                            })
                            }
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>
                </div>
                <div className="block">
                    <label className="text-gray-700">Tier name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  pr-12"
                            placeholder="Tier name"
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 5,
                                    message: "Name must be at least 5 characters"
                                }
                            })
                            }
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                </div>
                <div className="block">
                    <label className="text-gray-700">Tier description</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        placeholder="Access to exclusive content and more"
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters"
                            }
                        })
                        }
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex justify-between">
                    <button className="inline-flex bg-black text-slate-50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}