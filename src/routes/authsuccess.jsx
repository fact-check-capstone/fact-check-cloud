import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";

export default function AuthSuccess() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);

      setInterval(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);

  return (
    <div className="h-screen flex items-center">
      {/* all the other elements */}
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={200}
        width={200}
      />
    </div>
  );
}
