import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { setCurrentPage } from "../state/artist/artistSlice";
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfileCard from "../compenents/profil/ProfileCard";
import { getArtists } from "../state/artist/artistActions";

export default function Artists() {
    const { artists, currentPage, totalPages } = useSelector((state: RootState) => state.artist);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        dispatch(getArtists({ page: currentPage, size: 10 }));
    }, [currentPage, dispatch]);

    const fetchMoreData = () => {
        if (currentPage + 1 < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        } else {
            setHasMore(false);
        }
    };

    return (
        <div className="w-screen h-96 flex items-center flex-col pt-5">
            <p className="text-4xl font-bold px-56 my-2 text-right text-white">Find artists you love</p>
            <input type="text" className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50x" />
            <InfiniteScroll
                dataLength={artists.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more data to load</b>
                    </p>
                }
            >
                <div className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border bg-gray-50 rounded-lg bg-gray-50x">
                    {artists.map((artist) => (
                        <ProfileCard key={artist.id} artist={artist} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}
