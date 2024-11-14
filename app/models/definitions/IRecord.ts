export interface IRecord {
    name: string;
    author: { _id: string, name: string },
    image: string;
    unitsInAlbum: {_id: string, name: string};
    price: number;
    releaseDate: Date;
    genres: { _id: string, name: string }[] | []
    songs: string[],
    priceId: string,
    quantity: number
    createdAt: string,
    _id: string,
    iFramelink: string,
    productId: string
}