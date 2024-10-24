import type { Product as ProductType} from '@/app/types/ProductType';
import Image from 'next/image';

export default function Product({product} : {product: ProductType}) {
    return (
        <div className="products__item">
            {product.thumbnail && 
                <div className="products__item__image">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                    ></Image>   
                </div>
            }
            <div className="products__item__info">
                <p className="products__item__name">
                    {product.title}
                </p>
                <p className="products__item__brand">
                    {product.brand}
                </p>
                <p className="products__item__price">
                    {product.price}
                </p>
            </div>
        </div>
    )
}