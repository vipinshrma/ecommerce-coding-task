import { notFound } from 'next/navigation';
import { getProductById } from '@/server/products';
import { Product } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';
import { AddToCart } from '@/components/add-to-cart';
import { WishlistButton } from '@/components/wishlist';

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
 const {productId} =  await params
  let product: Product;
  try {
    product = await getProductById(Number(productId));
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.brand}</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : i < product.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-4xl font-bold">
              ${product.price}{' '}
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <span className="text-sm text-red-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              ) : null}
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="font-medium">Availability:</span>
                {product.stock > 0 ? (
                  <Badge variant='default'>In Stock ({product.stock} available)</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <AddToCart
              product={product}
              className="flex-1"
              size="lg"
            />
           <WishlistButton
           productId={productId}
           variant='button'
           />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Weight</h3>
                <p className="text-gray-600">{product.weight} kg</p>
              </div>
              <div>
                <h3 className="font-medium">Dimensions</h3>
                <p className="text-gray-600">
                  {product.dimensions?.width ?? 'N/A'} x {product.dimensions?.height ?? 'N/A'} x{' '}
                  {product.dimensions?.depth ?? 'N/A'} cm
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium">Warranty</h3>
              <p className="text-gray-600">{product.warrantyInformation}</p>
            </div>

            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-gray-600">{product.shippingInformation}</p>
            </div>

            <div>
              <h3 className="font-medium">Return Policy</h3>
              <p className="text-gray-600">{product.returnPolicy}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
