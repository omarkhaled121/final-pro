import React, { useEffect } from 'react';
import img from "../../assets/error.svg";
import { useParams, useNavigate } from 'react-router-dom';

export default function Notfound() {
  let { "*": wildcardParam } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (wildcardParam === 'checkout/allorders') {
      navigate("/");
    }
  }, [wildcardParam, navigate]);

  return (
    <div className="bg-contain bg-no-repeat bg-center h-screen" style={{ backgroundImage: `url(${img})` }}>
      <div className="text-center text-xl text-gray-700"></div>
    </div>
  );
}
