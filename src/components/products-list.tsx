import { Product } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import {
    Heart,
    ShoppingCart,
    Star,
    MoreHorizontal
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ProductSearchAndFilter from './product-search-and-filter';
import { ProductCard } from './product-card';

type Props = {
    products: Product[];
}

export default function ProductsLists({ products }: Props) {

    return (
        <>
            {/* <ProductSearchAndFilter
                products={products}
            /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        product={product}
                        key={product.id}
                    />
                ))}
            </div>
        </>
    );
}