export type Tuser = {
    id: string,
    username: string,
    password: string,
    email: string,
    profilePicture: string,
    tiers: Ttier[],
    role: string,
    banner: string | null,
    alreadyRequested: boolean,
    likes : number,
}
export type Ttier = {
    id: string,
    name: string,
    price: number,
    description: string,
    artist_id: string,
    subscribed: boolean,
    cover: string,
}
export type Tpack = {
    id: string,
    cover: string,
    name: string,
    description: string,
    date: string,
    tier: Ttier,
    tier_id: string,
    liked: boolean,
}

export type Tlike = {
    id: string,
    pack: Tpack,
    pack_id: string,
    fan: Tuser,
    fan_id: string,
}

export type Tmedia = {
    id: string,
    src: string,
    pack: Tpack,
    pack_id: string,
}

export type Tpayment = {
    id: string,
    date: string,
    tier_id: string,
    fan_id: string,
    tier: Ttier,
    fan: Tuser,
}


export type TartistRequests = {
    id: string,
    fan_id: string,
    artistName: string,
    requestDate: string,
    Status: string,
    admin_id: string,
    fan: Tuser,
    admin: Tuser,
}