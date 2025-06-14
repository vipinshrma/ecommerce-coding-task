'use client'

import { useWishlistStore } from "@/store/cart";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface WishlistButtonProps {
    productId: string;
    variant?: 'icon' | 'button';
}

export function WishlistButton({ productId, variant = 'icon' }: WishlistButtonProps) {
    const { toggleWishlist, getWishlistItems } = useWishlistStore();
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Update wishlist state when productId or wishlist changes
    useEffect(() => {
        const wishlistItems = getWishlistItems();
        const isProductInWishlist = wishlistItems.some(
            (item: { productId: string }) => item.productId === productId
        );
        setIsInWishlist(isProductInWishlist);
    }, [getWishlistItems, productId]);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleWishlist(productId);
        setIsInWishlist(!isInWishlist); // Optimistic UI update
    };

    if (variant === 'button') {
        return (
            <Button variant="outline" size="lg" onClick={handleClick}>
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
        );
    }

    return (
        <button
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
            onClick={handleClick}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={`h-4 w-4 transition-colors duration-200 ${isInWishlist
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
            />
        </button>
    );
}
