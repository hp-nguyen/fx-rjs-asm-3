export default function convertMoney(money) {
  // Chuyển money sang dạng array
  const digits = String(money).split('');
  let totalDigits = digits.length;

	// Vị trí bắt đầu thêm dấu chấm (chữ số thứ 3 tính từ cuối cùng ra phía trước)
  let curDigit = -3;
	// Khoảng cách đến vị trí thêm dấu chấm tiếp theo
  const step = -4;

  while (-curDigit < totalDigits) {
    digits.splice(curDigit, 0, '.');
    curDigit += step;
    totalDigits++;
  }
  return digits.join('');
}
