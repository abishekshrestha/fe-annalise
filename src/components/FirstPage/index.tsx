import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirstPageForm from "./FirstPageForm";

const FirstPage = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSubmit = (firstName: string) => {
    if (firstName) {
      navigate("/secondPage", { state: { name: firstName } });
      return;
    }
    setIsValid(false);
  };

  return (
    <FirstPageForm
        handleSubmit={handleSubmit}
        isValid={isValid}
    />
  );
};

export default FirstPage;
