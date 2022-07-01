import React from "react";

const Footer = () => {
  // Get current year
  const year = new Date().getFullYear();
  return (
    <div className="text-xs text-center text-neutral-500 border-t-2 border-t-neutral-900 mt-6 py-6">
      &copy; {year} Aerdeets. All Rights Reserved
    </div>
  );
};

export default Footer;
