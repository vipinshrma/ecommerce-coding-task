'use client'
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const { items, getItemCount, removeItem, clearCart } = useCartStore();
    const itemCount = getItemCount();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleSheetOpen = () => {
        setIsSheetOpen(!isSheetOpen);
    };


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="font-bold text-lg">
                        My Store
                    </Link>
                </div>

                <div className="flex-1 flex justify-end">
                    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpen}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative hover:bg-primary/10"
                            onClick={handleSheetOpen}
                        >
                            <ShoppingCart className="h-6 w-6 text-primary" />
                            <span className="sr-only">Cart</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                        <SheetContent className="w-full sm:max-w-lg">
                            <SheetHeader>
                                <SheetTitle className="text-primary">Your Cart</SheetTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600 transition-colors group"
                                    onClick={() => {
                                        clearCart()
                                        handleSheetOpen()
                                    }}
                                >
                                    {
                                        itemCount > 0 && <span className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="group-hover:scale-110 transition-transform"
                                            >
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                <line x1="10" x2="10" y1="11" y2="17" />
                                                <line x1="14" x2="14" y1="11" y2="17" />
                                            </svg>
                                            Clear Cart
                                        </span>
                                    }
                                </Button>
                            </SheetHeader>
                            <div className="py-4">
                                {items.length > 0 ? (
                                    <div className="space-y-4">
                                        {(items || [])?.map((item) => (
                                            <div key={item?.product?.id} className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-primary/5 transition-colors border border-primary/10">
                                                {item.product?.thumbnail && (
                                                    <div className="relative w-16 h-16 rounded-md overflow-hidden shadow-sm">
                                                        <Image
                                                            src={item.product.thumbnail}
                                                            alt={item.product?.title || 'Product image'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-primary/90">{item.product?.title || 'Untitled Product'}</p>
                                                    {item.product?.price && (
                                                        <p className="text-sm text-primary/70">${item.product.price.toFixed(2)}</p>
                                                    )}
                                                    {item?.quantity && (
                                                        <p className="text-sm text-primary/70">Quantity: {item.quantity}</p>
                                                    )}
                                                </div>
                                                {item.product?.id && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-primary/20 hover:bg-primary/10 hover:border-primary/30 text-primary/80"
                                                        onClick={() => removeItem(item.product.id.toString())}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <div className="mt-6 space-y-4 px-4">
                                            <Link href="/checkout" className="block" onClick={handleSheetOpen}>
                                                <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white">
                                                    <ShoppingCart className="h-4 w-4" />
                                                    Proceed to Checkout
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[200px]">
                                        <ShoppingCart className="h-12 w-12 text-primary/30 mb-4" />
                                        <p className="text-primary/50">Your cart is empty</p>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
