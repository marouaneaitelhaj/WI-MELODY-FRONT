export type Tuser = {
    id : string,
    username: string,
    password: string,
    email: string,
    profilePicture: string,
    tiers : Ttier[],
    // posts : Tpost[],
}
export type Ttier = {
    id : string,
    name: string,
    price: number,
    description: string,
    artist_id : string,
}