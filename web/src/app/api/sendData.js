import { connectToDatabase } from '../../../lib/mongodb';
import postFPS from '../../../models/postFPS';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // เชื่อมต่อกับ MongoDB
            await connectToDatabase();

            // รับข้อมูลจาก request body
            const { record_id, frame_number, fps } = req.body;

            // สร้างเอกสารใหม่
            const newFrame = new postFPS({
                record_id,
                frame_number: parseInt(frame_number),
                fps: parseInt(fps),
            });

            // บันทึกข้อมูล
            await newFrame.save();

            // ส่งข้อความสำเร็จกลับ
            res.status(201).json({ message: 'บันทึกข้อมูลสำเร็จ' });
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // อนุญาตเฉพาะ POST request
    }
}