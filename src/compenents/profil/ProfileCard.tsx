import { Link } from "react-router-dom";
import { Tuser } from "../../state/types";

export default function ProfileCard(props: { artist: Tuser }) {
    return (
        <Link to={`/artist/${props.artist.id}`}>
            <div className=" rounded-lg cursor-pointer flex items-center justify-start hover:bg-gray-200">
                <img className="w-14 mx-5 my-2 h-14 object-cover" src={props.artist.profilePicture} alt="" />
                <div>
                    <p className="text-lg font-bold">{props.artist.username}</p>
                    <p className="text-sm">Creator Description</p>
                    <p className="text-xs">412 posts · 603 members</p>
                </div>
            </div>
        </Link>
    )
}