import { useEffect, useState } from "react";
import CardHistory from "../components/CardHistory";
import PredictHoaxService from "../services/PredictHoaxService";

export default function History() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await PredictHoaxService.histories();
        console.log("result1", result.data);
        if (result.data) {
          console.log(result.data);
          setHistories(result.data.data); // Mengubah state histories dengan data yang diterima dari server
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized"); // Menangkap error 401
          localStorage.clear();
          // window.location.href = "/";
          // history.replace("/login");
          window.history.replaceState("/login");
        } else {
          console.log(error.response.data);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div>
        {Array.isArray(histories) &&
          histories.map((history, index) => (
            <CardHistory key={index} predict={history} />
          ))}
      </div>
    </div>
  );
}
