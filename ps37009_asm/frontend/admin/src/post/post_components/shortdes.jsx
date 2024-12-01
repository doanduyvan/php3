

function ShortDes({value, setShortDes}) {
  return (
    <div className="mb-4">
    <label htmlFor="content" className="block text-lg font-medium text-gray-700">Mô tả ngắn</label>
    <textarea
      id="content"
      name="content"
      rows="3"
      value={value}
      onChange={(e) => setShortDes(e.target.value)}
      placeholder="Mô tả..."
      className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      required
    ></textarea>
  </div>
  );
}

export default ShortDes;