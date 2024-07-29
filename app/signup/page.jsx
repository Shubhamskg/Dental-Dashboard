import styles from "../../app/ui/signup/signup.module.css";
import SignupForm from "../ui/signup/signupForm/signupForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <SignupForm/>
    </div>
  );
};

export default LoginPage;
