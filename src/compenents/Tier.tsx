import { Ttier } from "../state/types";

export default function Tier(props : {tier : Ttier}) {
    return (
        <div className="bg-white w-80 p-3 flex-col rounded-md m-2 flex">
            <img className="h-32 w-80 object-cover" src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/a62e97d786d84cf78bc3f63c990e4ea8/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/1.jpg?token-time=1709510400&token-hash=S379zrDrSVHVJQTnYXD7rjZIuoKE9qy93BVivI5n6ug%3D" alt="" />
            <p>{props.tier.name}</p>
            <p><span>${props.tier.price}</span> / month</p>
            <button className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">Join</button>
            <p>{props.tier.description}</p>
        </div>
    )
}