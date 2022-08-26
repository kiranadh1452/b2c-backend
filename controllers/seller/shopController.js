// controller to handle shop adding operation
const addShopController = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "`Add shop` controller loaded",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// controller to handle shop editing operation
const editShopController = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "`Edit shop` controller loaded",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = { addShopController, editShopController };
