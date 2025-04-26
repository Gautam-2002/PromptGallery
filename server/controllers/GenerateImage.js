import axios from "axios";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import FormData from "form-data";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Prepare the payload
    const payload = {
      prompt,
      output_format: "jpeg", // You can change this to png or webp
      aspect_ratio: "1:1", // Default aspect ratio
    };

    // Use FormData to send the request
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Make the API call
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, // API key from .env
          Accept: "image/*", // Receive the image directly
          ...formData.getHeaders(), // Include FormData headers
        },
        responseType: "arraybuffer", // Receive binary data
      }
    );

    if (response.status === 200) {
      // Convert the binary data to base64
      const base64Image = Buffer.from(response.data).toString("base64");
      res.status(200).json({ photo: base64Image });
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.message || error.message
      )
    );
  }
};
