import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">© 2025 NextHire. All rights reserved</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
              aria-label="Facebook"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3v1.9h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
              aria-label="Twitter"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.6 7.5c.01.15.01.3.01.45 0 4.6-3.5 9.9-9.9 9.9-2 0-3.8-.6-5.3-1.7a7.1 7.1 0 005.2-1.4 3.5 3.5 0 01-3.2-2.4 3.5 3.5 0 001.6-.1 3.5 3.5 0 01-2.8-3.4v-.04a3.5 3.5 0 001.6.5 3.5 3.5 0 01-1.1-4.7 9.9 9.9 0 007.2 3.7 3.5 3.5 0 015.9-3.2 7 7 0 002.2-.8 3.5 3.5 0 01-1.5 1.9 7 7 0 002-.6 7.5 7.5 0 01-1.7 1.8z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-700"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.3 19H5.5v-9h2.8v9zM6.9 8.3a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zM19 19h-2.8v-4.6c0-1.1-.4-1.8-1.3-1.8s-1.5.7-1.5 1.8V19H10v-9h2.7v1.2a3 3 0 012.7-1.5c1.9 0 3.3 1.2 3.3 3.7V19z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
