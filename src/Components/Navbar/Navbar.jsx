import { useNavigate } from "react-router";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/")}>HOME</div>
      <div>
        <ul>
          <li onClick={() => navigate("/register")}>REGISTER</li>
          <li>THINGS</li>
          <li>STUFF</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
