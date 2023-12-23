import { PropsWithChildren } from "react";
import style from "./layout.module.css";
import Image from "next/image";
import signInBg from "@/assets/images/sign-in-bg.jpg";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={style.formContainer}>
      {children}
      <div className={style.bgContainer}>
        <Image src={signInBg} alt="Background image" className={style.bgImg} />
      </div>
    </div>
  );
}
