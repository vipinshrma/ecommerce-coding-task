'use client'

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types";
import { ComponentProps } from "react";

interface AddToCartProps extends ComponentProps<typeof Button> {
    product: Product
}

export function AddToCart({ product, className, size = "sm", ...props }: AddToCartProps) {
    const addItem = useCartStore(state => state.addItem);

    return (
        <Button
            variant={product.stock > 0 ? "default" : "outline"}
            size={size}
            disabled={product.stock === 0}
            className={`gap-1 ${className}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
            }}
            {...props}
        >
            <ShoppingCart className="h-4 w-4" />
            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
        </Button>
    );
}
