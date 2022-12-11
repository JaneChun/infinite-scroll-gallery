import { useEffect, useState } from "react";
import axios from "axios";

function useAxios(pageNum) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL =
    "https://api.unsplash.com/photos?page=1&client_id=BzK9qcDoVOU37glq0ApRxpPRDnL2aFmNrkoUCVMo2BI";

  const fetchData = (pageNum) => {
    axios({
      method: "GET",
      url: URL,
      params: { page: pageNum }
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  return { data, loading };
}

export default useAxios;
