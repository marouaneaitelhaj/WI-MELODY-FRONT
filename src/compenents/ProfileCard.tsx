export default function ProfileCard() {
    return (
        <div className=" rounded-lg cursor-pointer flex items-center justify-start hover:bg-gray-200">
            <img className="w-14 mx-5 my-2 h-14 object-cover" src='https://c10.patreonusercontent.com/4/patreon-media/p/campaign/5351564/2dd8c6cd006640d7b94b970e1261bba1/eyJ3IjoyMDB9/1.png?token-time=2145916800&token-hash=lq3PAL9K2pqC0K950tc7Oqw1C1CaeBWvFeemXjhKRyw%3D' alt="" />
            <div>
                <p className="text-lg font-bold">Creator Name</p>
                <p className="text-sm">Creator Description</p>
                <p className="text-xs">412 posts · 603 members</p>
            </div>
        </div>
    )
}