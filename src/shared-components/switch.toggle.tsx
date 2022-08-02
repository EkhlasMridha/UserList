import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";

interface SwitchProps {
  check?: boolean;
  onClick?: (value: boolean) => void;
}

export const Switch = (props: SwitchProps) => {
  const [toggle, setToggle] = useState<boolean>(props?.check ?? false);
  const toggleClass = "transform translate-x-9";

  const onToggle = () => {
    setToggle(!toggle);
    props?.onClick && props.onClick(!toggle);
  };

  useEffect(() => {
    setToggle(props?.check ?? false);
  }, [props?.check]);

  return (
    <div
      className={
        "w-20 h-10 flex items-center rounded-full p-1 cursor-pointer " +
        (toggle ? "bg-green-500" : "bg-gray-300")
      }
      onClick={() => {
        onToggle();
      }}
    >
      <div
        className={
          "bg-white h-9 w-9 rounded-full flex justify-center items-center shadow-md transform duration-150 ease-in-out " +
          (toggle ? null : toggleClass)
        }
      >
        {toggle && <CheckIcon className="h-7 w-6 text-green-500" />}
      </div>
      {!toggle && (
        <CheckIcon className="text-slate-100 -translate-x-9 h-8 w-7" />
      )}
    </div>
  );
};
