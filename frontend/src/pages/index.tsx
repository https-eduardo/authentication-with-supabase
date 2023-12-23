import { API_BASE_URL } from "@/constants/api";
import style from "./index.module.css";
import { toast } from "sonner";
import { CANNOT_LOGOUT } from "@/constants/messages";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  async function handleSignOut() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) toast.error(CANNOT_LOGOUT);

    router.push("/auth/login");
  }

  return (
    <div className={style.homePage}>
      <h2 className={style.welcome}>Seja bem-vindo.</h2>
      <p className={style.loggedText}>Agora você está logado.</p>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
}
