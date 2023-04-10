import mongoose from 'mongoose';

const messagesCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
})

export const messageModel = mongoose.model(messagesCollection, messageSchema);
