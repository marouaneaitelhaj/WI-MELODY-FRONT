import { createLike } from "../../state/like/likeActions";
import { getMediasByPack } from "../../state/media/mediaActions";
import { useAppDispatch } from "../../state/store";
import { Tpack } from "../../state/types";

export function Pack(props: { pack: Tpack }) {
    const dispatch = useAppDispatch();
    return (
        <div className="max-w-sm  m-5">
            <div className="relative" onClick={() => {
                dispatch(getMediasByPack(props.pack.id))
            }}>
                <img
                    src={props.pack.cover.toString()}
                    alt="Prawn &amp; Feta Pitta"
                    className="w-full h-auto rounded-t-lg aspect-w-1 aspect-h-1 overflow-hidden hover:brightness-75 cursor-pointer duration-500 ease-in-out"
                    width="300"
                    height="300"
                />
            </div>
            <div className="p-4 bg-white rounded-b-lg">
                <h3 className="text-lg font-bold">{props.pack.name}</h3>
                <p className="text-sm text-gray-500">{
                    new Date(props.pack.date).toLocaleString()
                }</p>
                <p className="mt-2 text-sm">
                    {props.pack.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={props.pack.liked ? "text-red-400" : "text-gray-400" + " cursor-pointer"}
                        onClick={() => {
                            dispatch(createLike({ pack_id: props.pack.id }))
                        }}
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                    >
                        <polyline points="9 17 4 12 9 7"></polyline>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                    >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}