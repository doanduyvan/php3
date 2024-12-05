import React, {useState, useEffect} from "react";

function AvatarPost({ value, setAvatar }) {
    useEffect(() => {
        return () => {
            value?.preview && URL.revokeObjectURL(value.preview);
        };
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

  return (
    <div className="shadow-lg p-4 rounded-md">
    <label htmlFor="thumbnail" className="block text-lg font-medium text-gray-700">Ảnh đại diện</label>
    {value &&
    <div className="text-center mt-3">
        <img className="inline-block max-w-[400px] aspect-video object-cover" src={value?.preview || value} alt="" />
    </div>
    }

    <div className="mb-4 mt-3">
    <input
      type="file"
      id="thumbnail"
      name="thumbnail"
        onChange={handleFileChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
      accept="image/*"
    />
  </div>
  </div>
  );
}

export default AvatarPost;