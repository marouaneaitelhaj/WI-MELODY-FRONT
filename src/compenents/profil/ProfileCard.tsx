import { Link } from "react-router-dom";
import { Tuser } from "../../state/types";

export default function ProfileCard(props: { artist: Tuser }) {
    return (
        // <Link to={`/artist/${props.artist.id}`}>
        //     <div className=" rounded-lg cursor-pointer flex items-center justify-start hover:bg-gray-200">
        //         <img className="w-14 mx-5 my-2 h-14 object-cover" src={props.artist.profilePicture} alt="" />
        //         <div>
        //             <p className="text-lg font-bold">{props.artist.username}</p>
        //             <p className="text-sm">Creator Description</p>
        //             <p className="text-xs">412 posts · 603 members</p>
        //         </div>
        //     </div>
        // </Link>
        <Link to={`/artist/${props.artist.id}`} className="max-w-sm p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div className="flex space-x-2">
                    <img
                        src={props.artist.profilePicture || "https://images.unsplash.com/photo-1612833835541-4f3b3f7b3b3d"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                        width="50"
                        height="50"
                        // style="aspect-ratio: 50 / 50; object-fit: cover;"
                        style={{ aspectRatio: "50 / 50", objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="text-lg font-bold">{props.artist.username}</h5>
                        <p className="text-sm text-gray-500">@{props.artist.username}</p>
                    </div>
                </div>
                <div className="inline-flex items-center bg-red-500 text-white rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Live
                </div>
            </div>
            <img
                src={props.artist.banner || "https://images.unsplash.com/photo-1612833835541-4f3b3f7b3b3d"}
                alt="Content"
                className="mt-3 w-full rounded-lg hover:brightness-50 transition duration-300 ease-in-out"
                width="300"
                height="150"
                style={{ aspectRatio: "300 / 150", objectFit: "cover" }}
            />
            <div className="flex justify-between items-center mt-3">
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-red-500"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <span className="text-lg font-semibold">55,690</span>
                </div>
                <div className="flex items-center space-x-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-gray-700"
                    >
                        <path d="m22 8-6 4 6 4V8Z"></path>
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                    </svg>
                    <span className="text-lg font-semibold">{props.artist.tiers.length}</span>
                </div>
            </div>
        </Link>
    )
}