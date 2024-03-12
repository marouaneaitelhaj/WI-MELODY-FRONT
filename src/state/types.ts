export type Tuser = {
    id: string,
    username: string,
    password: string,
    email: string,
    profilePicture: string,
    tiers: Ttier[],
    role: string,
    // posts : Tpost[],
}
export type Ttier = {
    id: string,
    name: string,
    price: number,
    description: string,
    artist_id: string,
}
export type Tpack = {
    id: string,
    cover: string | File[],
    name: string,
    description: string,
    date: string,
    tier: Ttier,
    tier_id: number,
}

export type Tmedia = {
    id: string,
    src: string,
    pack: Tpack,
    pack_id: string,
}

export type Tpayment = {
    id : string,
    date : string,
    tier_id : string,
    fan_id : string,
    tier : Ttier,
    fan : Tuser,
}


export type TartistRequests = {
    id : string,
    fan_id : string,
    ArtistName : string,
    RequestDate : string,
    Status : string,
    admin_id : string,
}