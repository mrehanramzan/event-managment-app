import User from "../models/user.model.js";
export async function getUser(request, response, next) {

    try {
        const userId = request.user_id;
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return response.status(200).json({
            message: "User retrieved successfully",
            success: true,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            }
        });

    } catch (error) {

        next(error);

    }

}