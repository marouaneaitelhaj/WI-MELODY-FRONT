export function Post() {
    return (
        <div className="max-w-sm  m-5">
            <div className="relative">
                <img
                    src="https://image.mux.com/CQEX5NhTEp28R4rtIcXqMx1HpaifwWvEKjXjrQiasF00/thumbnail.jpg?token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5CY3o3Sk5RcUNmdDdWcmo5MWhra2lEY3Vyc2xtRGNmSU1oSFUzallZMDI0IiwidHlwIjoiSldUIn0.eyJzdWIiOiJDUUVYNU5oVEVwMjhSNHJ0SWNYcU14MUhwYWlmd1d2RUtqWGpyUWlhc0YwMCIsImV4cCI6MTcxMDg2NTQwMSwiYXVkIjoidCIsInRpbWUiOjIuMH0.lnXn9jrbhsjlIZSEWfcyLx_lhFrooBbNS1K0GMhNVjAkUWoYSu76PEO1EMt7a8FsnYqNVcKysHlrPS2XquC8Sqr9Q1taf7DSyTC8sr5968ibmUxrE_oTwrZF04SdcKWXNOO6pjJSpR1ljBFzgeVtl2jBEwuo04zDG_0IFsx9-UQcgV4n9QCEG5maAXgmQHTXNGGrfNM45vxbfEVIC2jnpym6LI6_WoDUhYmpLrS9dpGfc-KDZxt1w1G1oyG7_rVhprq50p_KU8S2N2jFavlfoCXqqqFH9fkq2A0uYobwT9SrfEn4MX6AMb90eKkYJpS8OrR3Z-aFtVEWJoI7HAw9iA"
                    alt="Prawn &amp; Feta Pitta"
                    className="w-full h-auto rounded-t-lg aspect-w-1 aspect-h-1 overflow-hidden"
                    width="300"
                    height="300"
                    // style="aspect-ratio: 300 / 300; object-fit: cover;"
                />
                <div className="absolute top-0 left-0 p-4">
                    <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        Prawn &amp; Feta Pittas
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
                    <p>306 calories</p>
                    <p>24g protein</p>
                </div>
            </div>
            <div className="p-4 bg-white rounded-b-lg">
                <h3 className="text-lg font-bold">Prawn &amp; Feta Pitta</h3>
                <p className="text-sm text-gray-500">2 days ago</p>
                <p className="mt-2 text-sm">
                    A quick, easy meal to make and you could also make this for prep by just preparing the filling, adding to a
                    pitta on the day you wish to eat...
                </p>
                <div className="mt-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
                        Join to unlock
                    </button>
                </div>
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