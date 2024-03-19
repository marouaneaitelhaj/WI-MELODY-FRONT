import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { reset, setCurrentPage } from "../state/artist/artistSlice";
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfileCard from "../compenents/profil/ProfileCard";
import { getArtists } from "../state/artist/artistActions";
import { useSearchParams } from "react-router-dom";

export default function Artists() {
    const { artists, currentPage, totalPages } = useSelector((state: RootState) => state.artist);
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({ text: "" });


    useEffect(() => {
        dispatch(reset())
    }, [searchParams])

    useEffect(() => {
        dispatch(getArtists({ page: currentPage, size: 10, text: searchParams.get('text') || '' }));
    }, [currentPage, searchParams]);

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
            <input type="text" value={
                searchParams.get('text') || ''
            } onChange={
                (e) => {
                    setSearchParams({ text: e.target.value })
                }
            } className="p-2 w-3/5 my-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50x" />
            <InfiniteScroll
                className="w-screen flex items-center flex-col pt-5"
                dataLength={artists.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-white">Loading...</h4>}
                endMessage={
                    <p className="text-white" style={{ textAlign: 'center' }}>
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
