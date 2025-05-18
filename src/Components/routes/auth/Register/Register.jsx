import { useNavigate } from "react-router";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();

    const formData = event.target;
    const { userName, email, password, reTypePassword } = formData;

    if (password.value !== reTypePassword.value) {
      console.warn("Passwords don't match");
      return;
    }

    const user = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const payload = await response.json();

      if (!response.ok) {
        console.warn("Server responded with an error:", payload);
      }
      navigate("/");
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={register}>
        <fieldset>
          <label htmlFor="userName">User Name:</label>
          <input type="text" name="userName" id="userName" />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </fieldset>
        <fieldset>
          <label htmlFor="reTypePassword">Confirm Password</label>
          <input type="password" name="reTypePassword" id="reTypePassword" />
        </fieldset>
        <div>
          <button className="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
