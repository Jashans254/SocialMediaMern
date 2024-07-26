import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

export const isAuth = async(req , res , next) =>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(403).json({
                message : "Unauthorized"
            })
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedData){
            return res.status(400).json({
                message : "Token Expired"
            })
        }

        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel.js";
// import { promisify } from 'util';

// export const isAuth = async (req, res, next) => {
//     try {
//         // Check if cookies are present and the token is not undefined
//         if (!req.cookies || !req.cookies.token) {
//             return res.status(403).json({
//                 message: "Unauthorized",
//             });
//         }

//         const token = req.cookies.token;

//         // Log the token for debugging purposes
//        // console.log('JWT:', token);

//         // Verify the token and decode the data
//         const decodedData = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//         if (!decodedData) {
//             return res.status(400).json({
//                 message: "Token Expired",
//             });
//         }

//         // Find the user by decoded id
//         req.user = await User.findById(decodedData.id);

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         // Handle any errors that occur
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };
