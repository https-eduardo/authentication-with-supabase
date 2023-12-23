import { API_BASE_URL } from "@/constants/api";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import ValidatedInput from "../ValidatedInput";
import {
  CONFIRMATION_LINK_SENT,
  INVALID_EMAIL,
  PASSWORDS_DONT_MATCH,
  REQUIRED_FIELD,
} from "@/constants/messages";
yup.setLocale({ mixed: { required: REQUIRED_FIELD } });

export function RegisterForm() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email(INVALID_EMAIL).required(),
      password: yup.string().required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], PASSWORDS_DONT_MATCH)
        .required(),
    }),
    onSubmit: async (values) => {
      setButtonDisabled(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setButtonDisabled(false);

      if (!response.ok) {
        toast.error(response.statusText);
        return;
      }

      toast.success(CONFIRMATION_LINK_SENT, {
        duration: 15,
      });
      router.push("/auth/login");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="title">Registrar-se</h2>
      <ValidatedInput
        label="Nome de usuário"
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        errorMessage={formik.errors.name}
      />

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

      <ValidatedInput
        label="Confirme sua senha"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        errorMessage={formik.errors.confirmPassword}
      />

      <button type="submit" aria-disabled={buttonDisabled}>
        Cadastrar-se
      </button>
    </form>
  );
}
