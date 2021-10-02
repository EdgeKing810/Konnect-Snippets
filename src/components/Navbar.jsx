import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/logo.png";

import { LocalContext } from "../wrappers/LocalContext";

export default function Navbar() {
  const { darkTheme, changeTheme } = useContext(LocalContext);
  const history = useHistory();

  return (
    <div
      className={`w-full fixed h-20 px-2 lg:px-4 z-50 ${
        !darkTheme ? "bg-gray-100" : "bg-gray-900"
      } py-2 duration-500 ease-in-out border-b-2 border-purple-500 flex items-center justify-between`}
    >
      <button
        className="flex items-center justify-between h-full"
        onClick={() => history.push("/")}
      >
        <img src={logo} alt="konnect-logo" className="object-contain h-full" />
        <div
          className={`${
            !darkTheme ? "text-gray-900" : "text-gray-100"
          } font-bold font-spartan ml-2 text-2xl pt-1`}
        >
          Snippets
        </div>
      </button>

      <button
        onClick={() => changeTheme()}
        title="Switch theme"
        className={`p-2 w-12 h-12 rounded-lg bg-dark-900 opacity-90 border-purple-500 border-2`}
      >
        <i
          className={`w-full h-full flex items-center justify-center text-xl ri-${
            !darkTheme ? "moon" : "sun"
          }-fill ${
            !darkTheme ? "text-gray-700" : "text-gray-300"
          } duration-500 ease-in-out`}
        />
      </button>
    </div>
  );
}
