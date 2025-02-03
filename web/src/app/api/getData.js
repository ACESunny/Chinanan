import { connectToDatabase } from '../../../lib/mongodb'; // ฟังก์ชันเชื่อมต่อ MongoDB
import postFPS from '../../../models/postFPS'; // นำเข้า Model

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // เชื่อมต่อกับ MongoDB
            await connectToDatabase();

            // ดึงข้อมูลทั้งหมดจาก collection
            const frames = await postFPS.find({}).sort({ timestamp: 1 }); // เรียงลำดับตามเวลา

            // ส่งข้อมูลกลับเป็น JSON
            res.status(200).json(frames);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // อนุญาตเฉพาะ GET request
    }
}