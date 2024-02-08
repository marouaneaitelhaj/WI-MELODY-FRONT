import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-around">
      <div>
        <ul className="flex justify-between">
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            <Link to="/creators">Creators</Link>
          </li>
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            Pricing
          </li>
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            Resources
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-white mx-5 bg-black my-3 py-2 px-5  font-bold text-2xl">WIMELO</h1>
      </div>
      <div>
        <ul className="flex justify-between">
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            Find Creator
          </li>
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            Log in
          </li>
          <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
            Get Started
          </li>
        </ul>
      </div>
    </nav>

    // <Routes>
    //   <Route index element={<Home />} />
    //   <Route path="/creators"  element={<Creators />} />
    // </Routes>

  )
}