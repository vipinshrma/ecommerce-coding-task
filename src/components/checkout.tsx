'use client'

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Plus, Minus, Trash, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Checkout() {
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();
  const totalPrice = getTotalPrice();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push('/thank-you');
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items?.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{item.product.title}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.product.id.toString(), item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-muted-foreground w-8 text-center">
                          {item.quantity}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.product.id.toString(), item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2 mt-2">
                        {item.product.tags?.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs bg-primary/10 border-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-16 font-medium">Brand:</span>
                          <span className="flex-1">{item.product.brand || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-16 font-medium">Rating:</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.round(item.product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-muted-foreground/20 text-muted-foreground/20'
                                }`}
                              />
                            ))}
                            <span>({item.product.rating})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-16 font-medium">Stock:</span>
                          <span className="flex-1">{item.product.stock}</span>
                        </div>
                        {item.product.discountPercentage && (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <span className="w-16 font-medium">Discount:</span>
                            <span className="flex-1">{item.product.discountPercentage}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeItem(item.product.id.toString())}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiration Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <ShoppingCart className="h-4 w-4" />
                Complete Purchase
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
