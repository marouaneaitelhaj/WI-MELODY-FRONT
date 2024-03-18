import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../state/store";
import { Pack } from "./Pack";
import { useSelector } from "react-redux";
import { getPacks, getPacksByArtistId } from "../../state/pack/packActions";
import { Tuser } from "../../state/types";

export default function Packs(props: { selectedArtist: Tuser | null }) {
    const dispatch = useAppDispatch();

    const { packs } = useSelector((state: RootState) => state.pack);
    const { selectedArtist } = useSelector((state: RootState) => state.artist);

    useEffect(() => {
        dispatch(getPacksByArtistId(selectedArtist?.id!));
    }, [])
    return (
        <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
            <div className="text-3xl w-full text-center my-3">Recent posts by {selectedArtist?.username}</div>
            <div className="flex flex-wrap justify-center">
                {packs.map((pack) => {
                    return <Pack key={pack.id} pack={pack} />
                })}
            </div>
        </div>
    )
}