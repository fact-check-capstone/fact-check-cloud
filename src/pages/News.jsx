import { useEffect, useState } from "react";
import NewsSerivice from "../services/NewsSerivice";
import CardNews from "../components/CardNews";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await NewsSerivice.news();
        console.log("result1", result.data);
        if (result.data) {
          console.log(result.data);
          setNews(result.data.data); // Mengubah state news dengan data yang diterima dari server
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
        {Array.isArray(news) &&
          news.map((data, index) => (
            <CardNews key={index} data={data} />
          ))}
      </div>
    </div>
  );
}
