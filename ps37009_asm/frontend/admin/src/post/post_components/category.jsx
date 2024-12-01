import React, { useState, useEffect } from "react";
import api from "/src/api";

function CategoryPost({ value, setCategory }) {

    let [ListCategory, SetListCategory] = useState(null);

    useEffect(() => {
        api.get('/admin/category')
        .then(res => {
            SetListCategory(res.data);
        })
        .catch(err => {
            console.log("dv error: ",err);
        })
    }, []);

  return (
    <div className="mb-4">
    <label htmlFor="category" className="block text-lg font-medium text-gray-700">Danh mục</label>
    <select
      id="category"
      name="category"
        value={value ?? ""}
        onChange={(e) => setCategory(e.target.value)}
      className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Chọn danh mục</option>
      {ListCategory && ListCategory.map((item, index) =>  <option key={"category_" + index} value={item.id}>{item.title}</option>)}
      {/* Thêm các danh mục khác tùy thuộc vào dự án */}
    </select>
  </div>
  );
}

export default CategoryPost;

