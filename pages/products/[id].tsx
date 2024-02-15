import SizeReviewList from "@/components/SizeReviewList";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type RouterQuery = string | string[];

interface ProdutData {
  createdAt: number;
  updatedAt: number;
  id: number;
  name: string;
  englishName: string;
  brand: string;
  productCode: string;
  price: number;
  salePrice: number;
  starRating: number;
  starRatingCount: number;
  likeCount: number;
  point: number;
  imgUrl: string;
}

export interface SizeReviewsData {
  createdAt: number;
  updatedAt: number;
  id: number;
  sex: "male" | "female";
  height: number;
  size: string;
  fit: "small" | "good" | "big";
  productId: number;
}

export default function Product() {
  const [product, setProduct] = useState<ProdutData>();
  const [sizeReviews, setSizeReviews] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  async function getProduct(targetId: RouterQuery) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProduct = res.data;
    setProduct(nextProduct);
  }

  async function getSizeReviews(targetId: RouterQuery) {
    const res = await axios.get(`/size_reviews/?produtct_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;

    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imgUrl} alt={product.name} />
      <SizeReviewList sizeReviews={sizeReviews} />
    </div>
  );
}
