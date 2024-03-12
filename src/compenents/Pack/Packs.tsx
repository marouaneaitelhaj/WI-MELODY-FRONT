import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { Pack } from "./Pack";
import { useSelector } from "react-redux";
import { getPacks } from "../../state/pack/packActions";

export default function Packs() {
    const dispatch = useAppDispatch();

    const { packs } = useSelector((state: RootState) => state.pack);
    const { selectedArtist } = useSelector((state: RootState) => state.artist);

    useEffect(() => {
        dispatch(getPacks());
    })
    return (
        <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
            <div className="text-3xl my-3">Recent posts by {selectedArtist?.username}</div>
            <div className="flex flex-wrap justify-center">
                {packs.map((pack) => {
                    return <Pack key={pack.id} pack={pack} />
                })}
            </div>
        </div>
    )
}