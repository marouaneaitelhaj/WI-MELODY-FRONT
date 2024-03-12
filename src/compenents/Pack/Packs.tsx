import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { Pack } from "./Pack";
import { useSelector } from "react-redux";

export default function Packs() {
    const {selectedArtist} = useSelector((state : RootState) => state.artist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getPackById)
    }, []);
    return (
        <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
            <h1 className="text-3xl my-3">Recent posts by Fit Food Diary</h1>
            <div className="flex flex-wrap justify-center">
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
            </div>
        </div>
    )
}