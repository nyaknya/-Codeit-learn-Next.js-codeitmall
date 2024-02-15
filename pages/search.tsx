import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import axios from "@/lib/axios";
import { RouterQuery } from "./products/[id]";
import { useEffect, useState } from "react";

export default function Search() {
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const { q } = router.query;

  async function getProducts(query: RouterQuery) {
    const res = await axios.get(`/products/?q=${query}`);
    const nextProducts = res.data;
    setProducts(nextProducts);
  }

  useEffect(() => {
    if (!q) return;

    getProducts(q);
  }, [q]);

  return (
    <div>
      <h1>Search 페이지</h1>
      <SearchForm initialValue={q} />
      <h2>{q} 검색 결과</h2>
      <ProductList products={products} />
    </div>
  );
}
