function timeAgo(timestamp) {
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
      return time.toLocaleString("vi-VN", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      });
    }
  }

export { timeAgo };