import Link from "next/link";
import styles from "./Button.module.css";

export default function ButtonLink({ className = "", ...props }) {
  return (
    <Link href={""} className={`${styles.button} ${className}`} {...props} />
  );
}
