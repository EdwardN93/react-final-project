import { useNavigate } from "react-router";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    const formData = event.target;
    const { firstName, lastName, email, password, reTypePassword } = formData;

    if (password.value !== reTypePassword.value) {
      alert("Passwords don't match");
      return;
    }

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
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
        throw new Error(`Error: ${JSON.stringify(payload)}`);
      }

      alert("Your account was created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Network or server error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={register} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <div className="form-group">
          <label htmlFor="reTypePassword">Confirm Password</label>
          <input type="password" id="reTypePassword" name="reTypePassword" />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
