

// Hàm lưu data vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy data từ local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? null;
}
export {saveToStorage, getFromStorage}