// controller for signup process
const signupController = async (req, res, next) => {
    try {
        return res.json({
            success: true,
            message: "Signup controller",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = signupController;
