function HandlTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp * 1000);

    // Tính sự khác biệt giữa thời gian hiện tại và thời gian được cung cấp
    const diffInSeconds = Math.floor((now - time) / 1000); // Tính sự khác biệt bằng giây
    const diffInMinutes = Math.floor(diffInSeconds / 60);  // Chuyển sang phút
    const diffInHours = Math.floor(diffInMinutes / 60);    // Chuyển sang giờ
    const diffInDays = Math.floor(diffInHours / 24);       // Chuyển sang ngày

    // Kiểm tra điều kiện
    if (diffInDays > 1) {
        // Nếu hơn 1 ngày, trả lại ngày tháng năm
        return time.toLocaleDateString();
    } else if (diffInDays === 1) {
        // Nếu 1 ngày, trả lại "Hôm qua"
        return "Hôm qua";
    } else if (diffInHours > 0) {
        // Nếu quá 1 giờ nhưng dưới 24 giờ, trả lại số giờ
        return `${diffInHours} giờ trước`;
    } else if (diffInMinutes > 0) {
        // Nếu dưới 1 giờ, trả lại số phút
        return `${diffInMinutes} phút trước`;
    } else {
        // Nếu dưới 1 phút, trả lại số giây
        return `${diffInSeconds} giây trước`;
    }
}

export { HandlTime };

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