import type { AppProps } from "next/app";
import "./styles/globals.css";
import "./styles/components.css";
import { Kumbh_Sans } from "next/font/google";
import { Toaster } from "sonner";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${kumbhSans.style.fontFamily};
        }
      `}</style>
      <Toaster theme="dark" position="top-right" richColors />
      <Component {...pageProps} />
    </>
  );
}
