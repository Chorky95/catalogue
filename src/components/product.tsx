import type { Product as ProductType} from '@/app/types/ProductType';
import limitString from '@/app/utilities/limitString';
import Image from 'next/image';

export default function Product({product} : {product: ProductType}) {

    console.log(product)

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
            {(product.title || product.price) && 
                <div className="products__item__info">
                    {product.title && 
                        <p className="products__item__name">
                            {product.title}
                        </p>
                    }
                    {product.price && 
                        <p className="products__item__price">
                            {product.price}€
                        </p>
                    }
                </div>
            }
            {product.description && 
                <p className="products__item__description">
                    {limitString(product.description)}
                </p>
            }
        </div>
    )
}