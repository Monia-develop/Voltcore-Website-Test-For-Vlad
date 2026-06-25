import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = ({ name = "This industry" }) => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center duration-300">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 block mb-3">
          Industries
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          {name}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">
            Coming Soon
          </span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          We're putting together the case study and content for this industry. Check back shortly.
        </p>
        <Link
          to="/industries"
          className="primary-btn inline-block bg-gradient-to-r from-[#3b82f6] to-[#bc13fe] text-white font-bold px-6 py-3 rounded-full hover:scale-105 duration-300"
        >
          ← Back to Industries
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
