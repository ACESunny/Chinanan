import mongoose, { Schema } from "mongoose";

const fpsSchema = new Schema(
    {
        record_id: {
            type: String,
            required: true,
        },
        frame_number: {
            type: Number,
            required: true,
        },
        fps: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now, // บันทึกเวลาที่เข้ามา
        },
    }
);

const postFPS = mongoose.models.postFPS || mongoose.model("postFPS", fpsSchema);
export default postFPS;