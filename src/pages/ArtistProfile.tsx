import { useSelector } from "react-redux";
import { Tuser } from "../state/types";
import { RootState, useAppDispatch } from "../state/store";
import { useEffect } from "react";
import { getArtistById } from "../state/artist/artistActions";
import { Post } from "../compenents/Post";
import Tier from "../compenents/Tier";

export default function ArtistProfile(props: { artistId: string | undefined }) {
    const { selectedArtist } = useSelector((state: RootState) => state.artist);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getArtistById(props.artistId!))
    }, []);
    return (
        <>
            <div className="w-screen h-72 flex flex-col">
                <img
                    className="h-72 w-screen object-cover"
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/a62e97d786d84cf78bc3f63c990e4ea8/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/1.jpg?token-time=1709510400&token-hash=S379zrDrSVHVJQTnYXD7rjZIuoKE9qy93BVivI5n6ug%3D"
                    alt=""
                />
            </div>
            <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                <img
                    className="h-32 rounded-md border w-32"
                    src={selectedArtist?.profilePicture}
                    alt=""
                />
                <p className="text-black text-3xl my-5">{selectedArtist?.username}</p>
                <p className="text-gray-500">309 posts</p>
                <button className="bg-blue-800 text-white px-4 my-5 py-2 rounded-md mt-4">Follow</button>
                <ul className="flex">
                    <li className="mx-5 border-b-2 border-black">Home</li>
                    <li className="mx-5 border-b-2 border-black">About</li>
                </ul>
                <div className="my-5  w-full bg-gray-100 flex flex-col items-center h-96">
                    <h1 className="text-3xl my-3">Choose your tier</h1>
                    <div className="flex">
                        {selectedArtist?.tiers.map((tier) => (
                            <Tier tier={tier} />
                        ))}
                    </div>
                </div>
                <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
                    <h1 className="text-3xl my-3">Recent posts by Fit Food Diary</h1>
                    <div className="flex flex-wrap justify-center">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
        </>
    )
}