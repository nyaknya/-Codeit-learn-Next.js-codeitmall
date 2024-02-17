import { RouterQuery } from "./products/[id]";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import styles from "@/styles/Search.module.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Head from "next/head";

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
    <>
      <Head>
        <title>{q} 검색 결과 - Codeitmall</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <ProductList className={styles.productList} products={products} />
    </>
  );
}
