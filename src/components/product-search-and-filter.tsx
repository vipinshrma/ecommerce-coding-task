'use client'
import { Product } from '@/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react"; 
import { getProductCategories } from '@/server/products';
import { useSearchParams } from 'next/navigation';

type ProductSearchAndFilterProps = {
  products: Product[];
};

export default  function ProductSearchAndFilter({ products }: ProductSearchAndFilterProps) {
    const [categories,setCategories] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const onSearch = (searchTerm: string) => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (searchTerm.trim()) {
            newSearchParams.set('search', searchTerm);
        } else {
            newSearchParams.delete('search');
        }
        window.history.pushState(null, '', `?${newSearchParams.toString()}`);
    };
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getProductCategories();
                setCategories(categories as never[]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [rating, setRating] = useState(0);

  const handleSearch = () => {
    let filteredProducts = products;

    // Apply search query filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (rating > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= rating
      );
    }

    // onSearch(filteredProducts);
  };

  const categoriesss = Array.from(new Set((products?.map(product => product.category) || [])));

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex gap-2">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onSearch(e.target.value)
          }}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label>Category</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories?.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price Range</Label>
          <Slider
            min={0}
            max={2000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <Label>Minimum Rating</Label>
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={[rating]}
            onValueChange={([value]) => setRating(value)}
            className="mt-2"
          />
          <div className="text-sm text-gray-500 mt-1">
            {rating.toFixed(1)} stars
          </div>
        </div>
      </div> */}
    </div>
  );
}
