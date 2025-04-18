export interface IProductsModel {
    id: number;
    name: string;
    brand: string;
    type: string;
    price: number;
    stars: number;
    quantity: number;
    Model: string;
    color: string;
    count: number;
    imgSrc: string;
    isFavorite: boolean;
    display: string;
    processor: string;
    graphics: string;
    hard_disk_size?: number;
    RefreshRate?: number;
    Os: string;
    ram: number;
    Memory_Storage?: number;
}