import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ValidatedInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errorMessage?: string;
}

export default function ValidatedInput(props: ValidatedInputProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
      <p className="error-message">{props.errorMessage}</p>
    </>
  );
}
