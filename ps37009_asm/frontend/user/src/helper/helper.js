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

  function convertToSlug(text) {
    return text
        .toLowerCase() // Chuyển thành chữ thường
        .normalize("NFD") // Chuẩn hóa ký tự Unicode
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/đ/g, "d") // Thay thế ký tự đặc biệt 'đ'
        .replace(/[^a-z0-9 ]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ khoảng trắng dư thừa
}

export { convertToSlug };

function timeAgo(timestamp, getTimestamp = false) {
  const time = new Date(timestamp); // Chuyển chuỗi thời gian thành đối tượng Date
  const now = new Date(); // Lấy thời gian hiện tại
  const diff = Math.floor((now - time) / 1000); // Tính khoảng cách thời gian (giây)

  if (diff < 60) {
    return `${diff} giây trước`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} phút trước`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} giờ trước`;
  } else {

    if (getTimestamp) {
      return  time.toLocaleString("vi-VN", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      });
    }else{
      return  time.toLocaleString("vi-VN", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
      });
    }
  }
}

export { timeAgo };