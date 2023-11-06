import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col dark:bg-gray-800 dark:text-white">
      <h2 className="text-6xl font-semibold">404</h2>
      <p className="text-2xl">This is not the webpage you are looking for.</p>
    </div>
  );
};

export default NotFound;
