import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
// import dotenv from "dotenv";

// dotenv.config();

const prisma = new PrismaClient();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const emailCheck = await prisma.users.findUnique({
      where: { email: email },
    });

    if (emailCheck) {
      return res.json({ message: "failed" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    try {
      // Create user in database
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
      };

      const secret = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 1; // 1 hour

      const token = jwt.sign(payload, secret, { expiresIn });

      return res.status(201).json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
        },
        // tokenGoogle: tokens.id_token,
        token,
      });

      // return res.json({ message: "user created" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to register user" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(404).json({ message: "Password not set" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = {
        id: user.id,
        name: user.name,
        address: user.address,
      };

      const secret = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 1;

      const token = jwt.sign(payload, secret, { expiresIn });

      return res.json({
        data: {
          id: user.id,
          name: user.name,
          address: user.address,
        },
        token: token,
      });
    } else {
      return res.status(403).json({ message: "Wrong password" });
    }
  },

  loginWithGoogle: async (req, res) => {
    res.redirect(authorizationUrl);
  },

  googleCallback: async (req, res) => {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).json({ error: "Missing code parameter" });
      }

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      if (!data.email || !data.name) {
        return res
          .status(400)
          .json({ error: "Incomplete user data from Google" });
      }

      let user = await prisma.users.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        user = await prisma.users.create({
          data: {
            name: data.name,
            email: data.email,
            password: "",
            address: "-", // default address
          },
        });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
      };

      const secret = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 1; // 1 hour

      const token = jwt.sign(payload, secret, { expiresIn });

      return res.redirect(`http://localhost:5173/auth-success?token=${token}`);

      return res.json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
        },
        // tokenGoogle: tokens.id_token,
        token,
      });
    } catch (error) {
      console.error("Error in googleCallback:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  me: async (req, res) => {
    const Auth = req.userData;

    try {
      return res.json({
        message: "success",
        data: Auth,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    const Auth = req.userData;
    const { id } = Auth; // Assuming the user ID is stored in the authenticated user's data
    const { name, email, address } = req.body; // Ensure 'address' is also included if required

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const emailCheck = await prisma.users.findUnique({
        where: { email: email },
      });

      // Check if the email belongs to another user
      if (emailCheck && emailCheck.id !== id) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }

      const result = await prisma.users.update({
        data: {
          name: name,
          email: email,
          address: address,
        },
        where: {
          id: Number(id),
        },
      });
      const data = {
        id: result.id,
        name: result.name,
        email: result.email,
        address: result.address,
      };
      return res.json({
        message: "Profile updated successfully",
        data,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  },
  updatePassword: async (req, res) => {
    const Auth = req.userData;
    const { id } = Auth; // Assuming the user ID is stored in the authenticated user's data
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required" });
    }

    try {
      // Fetch the user from the database
      const user = await prisma.users.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify the current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password in the database
      const result = await prisma.users.update({
        data: {
          password: hashedPassword,
        },
        where: {
          id: Number(id),
        },
      });

      return res.json({
        message: "Password updated successfully",
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
          address: result.address,
        },
      });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  },
};

export default authController;
