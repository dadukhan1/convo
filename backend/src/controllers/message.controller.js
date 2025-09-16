import { cloudinary } from '../lib/cloudinary.js';
import Message from '../model/Message.js';
import User from '../model/User.js';

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ message: "Server error" });

    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        });

        res.status(200).json(message);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploder.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // send message in realtime - socket.io

        await newMessage.save();




        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getChatsPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });

        const chatPartnerIds = [...new Set(messages.map(message => message.senderId.toString() === loggedInUserId.toString() ? message.receiverId.toString() : message.senderId.toString()))];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        return res.status(200).json(chatPartners);
    } catch (error) {
        console.log("Error in getChatPartners: ", error.message);
        res.status(500).json({ message: "Internal server error." });

    }
}