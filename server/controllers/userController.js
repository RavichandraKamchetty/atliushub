// import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helper.js";

export const signUpUser = async (request, response) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
        return response.send({ error: "All fields Required" });
    }

    try {
        const user = await User.findOne({ email });
        if (user != null) {
            return response.send({ error: "User already exists" });
        }

        const userNameRegex =
            "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
        const usernameValid = username.match(userNameRegex);
        if (usernameValid === null) {
            return response.send({
                error: "Username must be between 8 to 20 characters",
            });
        }

        const passwordRegex =
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
        const passwordValid = password.match(passwordRegex);
        if (passwordValid === null) {
            return response.send({
                error: "Password should contain atleast one number and one special character",
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, response);
        console.log("User Login Succesfully");
        response.send(newUser);
    } catch (error) {
        console.log("Error in loginUser route", error);
        response.json({ error: error.message });
    }
};
