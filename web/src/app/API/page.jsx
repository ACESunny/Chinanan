// API/page.jsx
export default function handler(req, res) {
  // สร้าง array ของ object ที่มี id และ value ตั้งแต่ 1 ถึง 100
  const data = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    value: index + 1,
  }));

  // ส่ง response กลับเป็น JSON
  res.status(200).json(data);
}