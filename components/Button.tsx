import { ReactPropTypes } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  className: string;
  as: any;
  props: ReactPropTypes;
}

export default function Button({ className = "", as, ...props }: ButtonProps) {
  return <button className={`${styles.button} ${className}`} {...props} />;
}
