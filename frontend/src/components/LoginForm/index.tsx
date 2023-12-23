import { useFormik } from "formik";
import ValidatedInput from "../ValidatedInput";
import { useState } from "react";
import { API_BASE_URL } from "@/constants/api";
import { toast } from "sonner";
import { SUCCESSFUL_LOGIN } from "@/constants/messages";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      setButtonDisabled(true);
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      setButtonDisabled(false);

      if (!response.ok) {
        toast.error(response.statusText);
        return;
      }

      toast.success(SUCCESSFUL_LOGIN);
      router.push("/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="title">Login</h2>

      <ValidatedInput
        label="Email"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        errorMessage={formik.errors.email}
      />

      <ValidatedInput
        label="Senha"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        errorMessage={formik.errors.password}
      />

      <button type="submit" aria-disabled={buttonDisabled}>
        Entrar
      </button>
      <span className="link-span">
        Ainda não tem uma conta?{" "}
        <Link href="/auth/register" className="link">
          Crie uma aqui.
        </Link>
      </span>
    </form>
  );
}
