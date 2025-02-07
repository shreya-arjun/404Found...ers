import { useState } from "react";

export default function Home({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newRequestButton, toggleNewRequestButton] = useState(false);

  return (
    <>
      <>Home Page</>
      <button
        onClick={() => {
          setLoggedIn(false);
        }}>
        Logout
      </button>
    </>
  );
}
