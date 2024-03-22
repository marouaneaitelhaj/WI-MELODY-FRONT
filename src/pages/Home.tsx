export default function Home() {
    return (
        <div className="w-screen h-[500px] flex flex-col justify-around items-center">
            <p className="text-5xl font-bold px-56 text-center    text-black">Search 200000+ Free & Premium <span className="text-blue-500">Tracks</span></p>
            <div>
                <input type="text" className="shadow-2xl border focus:ring-blue-500 rounded-l-md w-[1000px] p-4 focus:outline-none hover:border-blue-500" placeholder="mike dean, kanye west, ..." />
                <span className="bg-blue-500 rounded-r-md text-white p-4">Search</span>
            </div>
        </div>
    )
}