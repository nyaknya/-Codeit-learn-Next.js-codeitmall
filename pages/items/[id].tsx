import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import SizeReviewList from "@/components/SizeReviewList";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import { useState } from "react";

export async function getServerSideProps(context: any) {
  const productId = context.params["id"];
  let product;

  try {
    const res = await axios.get(`/products/${productId}`);
    product = res.data;
  } catch {
    return {
      notFound: true,
    };
  }

  const res = await axios.get(`/size_reviews/?produtct_id=${productId}`);
  const sizeReviews = res.data.results ?? [];

  return {
    props: {
      product,
      sizeReviews,
    },
  };
}

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

export default function Product({
  product,
  sizeReviews: initialSizeReviews,
}: any) {
  const [sizeReviews, setSizeReviews] = useState(initialSizeReviews);
  const [formValue, setFormValue] = useState({
    size: "m",
    sex: "male",
    height: 173,
    fit: "good",
  });

  async function handleSubmit(e: any) {
    e.preventDefalut();
    const sizeReview = {
      ...formValue,
      productId: product.id,
    };

    const res = await axios.post("/size_seviews/", sizeReview);
    const nextSizeReview = res.data;
    setSizeReviews((prevSizeReviews: any) => [
      nextSizeReview,
      ...prevSizeReviews,
    ]);
  }

  async function handleInputChange(e: any) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  async function handleChange(name: any, value: any) {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  return (
    <>
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image fill src={product.imgUrl} alt={product.name} />
        </div>
        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제품 정보</h2>
            <div className={styles.info}>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>브랜드 / 품번</th>
                    <td>
                      {product.brand} / {product.productCode}
                    </td>
                  </tr>
                  <tr>
                    <th>제품명</th>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>
                      <span className={styles.salePrice}>
                        {product.price.toLocaleString()}원
                      </span>{" "}
                      {product.salePrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th>포인트 적립</th>
                    <td>{product.point.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>구매 후기</th>
                    <td className={styles.starRating}>
                      <StarRating value={product.starRating} />{" "}
                      {product.starRatingCount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th>좋아요</th>
                    <td className={styles.like}>
                      ♥{product.likeCount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천</h2>
            <SizeReviewList sizeReviews={sizeReviews ?? []} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
          </section>
        </div>
      </div>
    </>
  );
}
