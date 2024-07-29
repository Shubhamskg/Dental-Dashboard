"use client";

import { authenticate } from "../../../../app/lib/actions";
import styles from "./signupForm.module.css";
import { useFormState } from "react-dom";
const SignupForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  console.log("state",state)
  console.log("formaction",authenticate)
  return (
    <form action={formAction} className={styles.form}>
      <h1>Sign Up</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Sign Up</button>
      {state && state}
    </form>
  );
};

export default SignupForm;
