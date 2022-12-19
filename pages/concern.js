import React from "react";
import Link from "next/link";
import { useState } from "react";

const concern = () => {
  const [messae, setMessage] = useState("");
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-slate-500">
      <label className="font-bold mb-3">Please Share Your Opinion</label>
      <textarea
        className="w-[80vw] h-[300px] rounded-lg bg-slate-700 text-cyan-300 text-base p-4"
        type="text"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        value={messae}
      ></textarea>
      <button
        onClick={(event) => {
          alert("Thanks For Your Opinion");
          setMessage("");
        }}
        type="submit"
        className="mt-5 h-10 bg-black text-white rounded-lg [font-size:12px] sm:text-base w-16 sm:w-20"
      >
        Submit
      </button>
      <button className="mt-5 h-10 bg-black text-white w-28 rounded-lg [font-size:12px] sm:text-base sm:w-36 mb-4">
        <Link href="./">Back To Home</Link>
      </button>
    </div>
  );
};

export default concern;
