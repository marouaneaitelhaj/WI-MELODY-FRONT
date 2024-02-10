import { get } from "react-hook-form";
import ProfileCard from "../compenents/ProfileCard";
import { useEffect } from "react";
import axios from "axios";
type Artist = {
    id : string,
    username : string,
    role : string
}
export default function Artists() {

    useEffect(() => {
        axios.get("/artists").then(res => {
            console.log(res.data)
        })
    }, []);

    return (
        <div className="w-screen h-96 flex items-center flex-col pt-5">
            <p className="text-4xl font-bold px-56 my-2 text-right text-white">Find artists you love</p>
            <input type="text" className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50x" />
            <div className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border bg-gray-50 rounded-lg bg-gray-50x">
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
            </div>
        </div>
    )
}