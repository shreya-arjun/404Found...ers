import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <section className="homePageSidebar">
      <div
        className="accountInfo"
        onClick={() => {
          navigate("/account");
        }}>
        <img className="accountPFP" src="/default_user.png" alt="default pfp" />
        <h3 className="accountUsername">Spotify Username</h3>
      </div>

      <button
        className="sidebarButton"
        onClick={() => {
          localStorage.setItem("isLoggedIn", "false");
          console.log("false");
          navigate("/");
        }}>
        Logout
      </button>

      <button
        className="sidebarButton"
        onClick={() => {
          navigate("/suggestion");
        }}>
        New Suggestion
      </button>
    </section>
  );
}
