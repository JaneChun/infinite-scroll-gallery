import { useEffect, useState } from "react";
import axios from "axios";

export function useAxios(url, pageNum, setLoading) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url: url,
      params: { page: pageNum }
    })
      .then((response) => {
        setTimeout(() => {
          if (data.length === 0) {
            setData(response.data);
          } else {
            setData((data) => [...data, ...response.data]);
          }
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNum]);

  return { data };
}
