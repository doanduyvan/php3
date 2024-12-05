
import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      {/* 404 Text */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">Trang Không Tồn Tại</h2>

      {/* Button to Go Back Home */}
      <Link to={'/'} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Về Trang Chủ
      </Link>
    </div>
  );
}

export default Page404;