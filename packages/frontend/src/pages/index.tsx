import { useState } from "react";
import Home from "./home";
import Login from "./login";
import "../styling/index.sass";

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Home setLoggedIn={setLoggedIn} />
  ) : (
    <Login setLoggedIn={setLoggedIn} />
  );
}
