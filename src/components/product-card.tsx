import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { AddToCart } from "./add-to-cart";
import { Product } from "@/types";
import { WishlistButton } from "./wishlist";

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
       
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-sm hover:shadow-black/10 bg-white h-64">
                <div className="flex h-full">
                    {/* Left side - Image */}
                    <div className="relative w-48 h-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Heart button */}
                      <WishlistButton
                        productId={String(product.id)}
                      />
                        {/* Out of stock overlay */}
                        {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                <Badge variant="destructive" className="text-sm font-semibold py-1.5 px-3 shadow-lg">
                                    Out of Stock
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Right side - Content */}
                    <Link href={`/product/${product.id}`} className="block group">
                    <div className="flex-1 flex flex-col min-w-0 h-full">
                        {/* Header section */}
                        <div className="flex-1 p-4 pb-2">
                            <div className="flex justify-between items-start gap-2 mb-3">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-lg font-bold leading-tight hover:text-blue-600 transition-colors duration-200 truncate mb-1">
                                        {product.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </CardDescription>
                                </div>
                              
                            </div>

                            {/* Rating section */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 transition-colors duration-200 ${
                                                i < Math.floor(product.rating)
                                                    ? "text-amber-400 fill-amber-400"
                                                    : i < product.rating
                                                        ? "text-amber-400 fill-amber-400"
                                                        : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-gray-600">
                                    ({product.reviews?.length || 0})
                                </span>
                            </div>

                            {/* Tags section */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {product.tags.slice(0, 3).map(tag => (
                                        <Badge 
                                            key={tag} 
                                            variant="outline" 
                                            className="text-xs font-medium px-2 py-0.5 rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    {product.tags.length > 3 && (
                                        <Badge 
                                            variant="outline" 
                                            className="text-xs font-medium px-2 py-0.5 rounded-full border-gray-200 text-gray-500"
                                        >
                                            +{product.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer section - Add to cart */}
                        <div className="p-4 pt-0 mt-auto">
                            <AddToCart product={product} />
                        </div>
                    </div>
                    </Link>
                </div>
            </Card>
      
    );
}