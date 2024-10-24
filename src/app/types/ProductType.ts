
export type Product = {
    title: string,
    availabilityStatus: string,
    brand: string,
    category: string,
    description: string,
    id: number,
    images: string[],
    price: number
    rating: number,
    returnPolicy: 'string'
    thumbnail: 'string',
    weight: number,
    warrantyInformation: string,
    sku: string,
    meta: {
        barcode: string,
        createdAt: Date,
        qrCode: string,
        updatedAt: Date
    },
    tags: string[]
}