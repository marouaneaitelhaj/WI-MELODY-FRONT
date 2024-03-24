import { Link } from "react-router-dom";
import { Ttier } from "../../state/types";

export default function Tier(props: { tier: Ttier }) {
    return (
        <div className="bg-white w-80 p-5 flex-col rounded-md m-2 flex">
            <img className="h-32 w-80 object-cover" src={props.tier.cover} alt="" />
            <div>{props.tier.name}</div>
            <div><span>${props.tier.price}</span> / month</div>
            {!props.tier.subscribed && (<Link to={'../payment/' + props.tier.id} className="bg-blue-500 justify-center flex text-white px-4 py-2 rounded-md mt-4">Join</Link>)}
            {props.tier.subscribed && (<Link to={'../payment/' + props.tier.id} className="bg-green-500 justify-center flex text-white px-4 py-2 rounded-md mt-4">Already Subsribed</Link>)}
            <div className="py-2">{props.tier.description}</div>
        </div>
    )
}