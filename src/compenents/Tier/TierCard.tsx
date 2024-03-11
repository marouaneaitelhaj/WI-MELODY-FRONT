import { Link } from "react-router-dom";
import { Ttier } from "../../state/types";

export default function Tier(props: { tier: Ttier }) {
    return (
        <div className="bg-white w-80 p-3 flex-col rounded-md m-2 flex">
            <img className="h-32 w-80 object-cover" src="https://www.bravado.com/files/2023/03/metro-boomin.png" alt="" />
            <div>{props.tier.name}</div>
            <div><span>${props.tier.price}</span> / month</div>
            <Link to={'../payment/' + props.tier.id} className="bg-blue-800 justify-center flex text-white px-4 py-2 rounded-md mt-4">Join</Link>
            <div>{props.tier.description}</div>
        </div>
    )
}