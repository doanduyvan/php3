

function Title({ value, setTitle }) {
  return (
    <div className="mb-4">
    <label htmlFor="title" className="block text-lg font-medium text-gray-700">Tiêu đề bài viết</label>
    <input
      type="text"
      id="title"
      name="title"
      value={value}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Nhập tiêu đề bài viết"
      className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>

  );
}

export default Title;