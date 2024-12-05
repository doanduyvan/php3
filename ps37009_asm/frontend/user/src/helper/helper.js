function truncateText(text, maxLength = null) {
    if (!maxLength) {
      return text; // Nếu không có giới hạn, trả về chuỗi gốc
    }
    if (text.length <= maxLength) {
      return text; // Nếu chuỗi ngắn hơn hoặc bằng giới hạn, trả về chuỗi gốc
    }
    return text.slice(0, maxLength) + "..."; // Cắt chuỗi và thêm dấu "..."
  }

  export { truncateText };