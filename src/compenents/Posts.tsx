import { Post } from "./Post";

export default function Posts() {
    return (
        <div className="my-5  justify-center w-full bg-gray-100 flex flex-wrap">
            <h1 className="text-3xl my-3">Recent posts by Fit Food Diary</h1>
            <div className="flex flex-wrap justify-center">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}