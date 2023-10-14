import { useEffect, useState } from "react";

const useFormattedNumber = (number) => {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    const formatted = number.toLocaleString("es-ES", { useGrouping: true });
    setFormattedNumber(formatted);
  }, [number]);

  return formattedNumber;
};

export default useFormattedNumber;
