import mongoose from "mongoose";
import Post from "./models/Posts.js";
import * as dotenv from "dotenv";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // Simplified connection
    console.log("Connected to MongoDB");

    const posts = [
      {
        name: "John Doe",
        prompt: "A futuristic cityscape at sunset",
        photo:
          "https://plus.unsplash.com/premium_photo-1661908853318-893732a14e42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Jane Smith",
        prompt: "Old Music Instruments",
        photo:
          "https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Captain Roger",
        prompt: "A serene mountain landscape",
        photo:
          "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Captain Kid",
        prompt: "A cat with black background",
        photo:
          "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },

      {
        name: "Captain Law",
        prompt: "A cute puppy running",
        photo:
          "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];

    await Post.insertMany(posts);
    console.log("Test data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to insert test data");
    console.error(error);
    process.exit(1);
  }
};

seedData();
