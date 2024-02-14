import Tier from "../compenents/Tier";

export default function Profile() {
    return (
        <>
            <div className="w-screen h-96 flex flex-col">
                <img
                    className="h-96 w-screen object-cover"
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/a62e97d786d84cf78bc3f63c990e4ea8/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/1.jpg?token-time=1709510400&token-hash=S379zrDrSVHVJQTnYXD7rjZIuoKE9qy93BVivI5n6ug%3D"
                    alt=""
                />
            </div>
            <div className="w-screen h-full flex-col flex -mt-16 items-center bg-gray-100 pb-10">
                <img
                    className="h-32 rounded-md border w-32"
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10767360/7be70c26aec440e2b58ebe31ff2851ef/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/1.jpeg?token-time=1708646400&token-hash=yVYwWNmMbbYA3LxLCv2EsXTpWZaLsnq6p5zsbtgS_QI%3D"
                    alt=""
                />
                <p className="text-gray-500">309 posts</p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4">Follow</button>
                <ul className="flex">
                    <li className="mx-5 border-b-2 border-black">Home</li>
                    <li className="mx-5 border-b-2 border-black">About</li>
                </ul>
                <div className="w-full h-96 bg-gray-100 flex flex-col items-center">
                    <h1 className="text-3xl my-3">Choose your membership</h1>
                    <div className="flex">
                        <Tier />
                        <Tier />
                        <Tier />
                        <Tier />
                    </div>
                </div>
            </div>
        </>
    )
}