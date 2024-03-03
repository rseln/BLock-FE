import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate()
  useEffect(()=>{
      navigate("/home"); // a bit hacky rn but works due to authentication guard: )
  },[])
  return (
      <div></div>
  );
};

export default Welcome;
