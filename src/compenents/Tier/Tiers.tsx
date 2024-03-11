import { Tuser } from "../../state/types";
import Tier from "./TierCard";

export default function Tiers(props: { selectedArtist: Tuser | null }) {
    return (
        <div className="my-5  w-full bg-gray-100 flex flex-col items-center h-96">
            <div className="text-3xl my-3">Choose your tier</div>
            <div className="flex">
                {props.selectedArtist?.tiers.map((tier) => (
                    <Tier tier={tier} key={tier.id} />
                ))}
            </div>
        </div>
    )
}