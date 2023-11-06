import { useState, useEffect } from "react";

export const useFetchAPI = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchFromAPI = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchFromAPI();
  }, []);
  return {data, loading, error};
};
