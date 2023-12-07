import { useEffect, useState } from "react";
import instance from "../../lib/axios";

export default function Total() {
  const [total, setTotal] = useState(0);
  async function getTotal(username, password) {
    try {
      const response = await instance.post("/stats", {
        username: username,
        password: password,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const setTotalData = async (username, password) => {
    const userdata = getTotal(username, password);
    const getProfileData = () => {
      userdata.then((res) => {
        setTotal(res.data.num.length);
      });
    };
    getProfileData();
  };

  useEffect(() => {
    setTotalData();
  }, []);

  return <h3>지금까지 총 {total}명이 참여 하였습니다.</h3>;
}
