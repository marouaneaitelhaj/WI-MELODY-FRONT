import { Tpack } from "../../state/types";

export function Pack(props : {pack:Tpack}) {
    return (
        <div className="max-w-sm  m-5">
            <div className="relative">
                <img
                    src={props.pack.cover.toString()}
                    alt="Prawn &amp; Feta Pitta"
                    className="w-full h-auto rounded-t-lg aspect-w-1 aspect-h-1 overflow-hidden"
                    width="300"
                    height="300"
                    // style="aspect-ratio: 300 / 300; object-fit: cover;"
                />
                <div className="absolute top-0 left-0 p-4">
                    <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {props.pack.name}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                    <div className="flex items-center space-x-2">
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
                            className="text-white"
                        >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="text-white">Locked</span>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 p-4 bg-[#00000080] text-white rounded">
                    <span className="text-xs font-semibold">{props.pack.tier.name}</span>
                </div>
            </div>
            <div className="p-4 bg-white rounded-b-lg">
                <h3 className="text-lg font-bold">Prawn &amp; Feta Pitta</h3>
                <p className="text-sm text-gray-500">{props.pack.date}</p>
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-gray-400"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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