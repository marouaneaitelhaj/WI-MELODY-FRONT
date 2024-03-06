import ProfileCard from "../compenents/profil/ProfileCard";
import { useEffect } from "react";
import AxiosInstanceForMyApi from "../axios/AxiosInstanceForMyApi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { getArtists } from "../state/artist/artistActions";
import { Link } from "react-router-dom";

export default function Artists() {
    const { artists } = useSelector((state: RootState) => state.artist);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getArtists())
    }, []);

    return (
        <div className="w-screen h-96 flex items-center flex-col pt-5">
            <p className="text-4xl font-bold px-56 my-2 text-right text-white">Find artists you love</p>
            <input type="text" className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50x" />
            <div className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border bg-gray-50 rounded-lg bg-gray-50x">
                {Array.isArray(artists) ? artists.map((artist) => (
                    <ProfileCard key={artist.id} artist={artist} />
                )) : null}
            </div>
        </div>
    )
}