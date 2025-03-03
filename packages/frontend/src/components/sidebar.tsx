import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataService } from "../services/userDataService";

const fakeUserData = {
  username: "test user",
  imageURL: "/default_user.png"
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [userAccountData, setUserAccountData] = useState({ username: "loading...", imageURL: "default_user.png" });

  useEffect(() => {
    const fetchAccountData = async () => {
      const userAccountData = await UserDataService.fetchUserAccountData();
      console.log("fetched data" + userAccountData)
      console.log("after")

      if (!userAccountData || !userAccountData.username) {
        console.error("Invalid user data received, using fallback.");
        setUserAccountData(fakeUserData);
      } else {
        setUserAccountData(userAccountData);
      }
    }
    fetchAccountData();
  }, [])

  return (
    <section className="homePageSidebar">
      <div
        className="accountInfo"
        onClick={() => {
          navigate("/account");
        }}>
        <img
          className="accountPFP"
          src={userAccountData.imageURL}
          alt="default pfp"
        />
        <h3 className="accountUsername">{userAccountData.username}</h3>
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
