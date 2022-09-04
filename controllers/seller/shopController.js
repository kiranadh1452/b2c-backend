const Shop = require("../../models/shopModel");
const checkPermission = require("../../accessControl/ability");

// controller to handle shop adding operation
const addShopController = async (req, res) => {
    try {
        const data = {
            shopName: req.body?.shopName,
            shopAddress: req.body?.shopAddress,
            shopPhone: req.body?.shopPhone,
            shopEmail: req.body?.shopEmail,
            shopWebsite: req.body?.shopWebsite,
            shopDescription: req.body?.shopDescription,
            shopLogo: req.body?.shopLogo,
            shopBanner: req.body?.shopBanner,
            seller: res.locals?.authData?._id,
        };

        if (await Shop.findOne({ seller: data.seller })) {
            return res.status(400).json({
                message: "You already have a shop",
            });
        }

        if (await Shop.findOne({ shopName: data.shopName })) {
            return res.status(400).json({
                message: "Shop name already exists",
            });
        }

        const shop = new Shop(data).save();
        return res.status(200).json({
            success: true,
            message: "Shop Added",
            data: shop,
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
        const data = {
            shopName: req.body?.shopName,
            shopAddress: req.body?.shopAddress,
            shopPhone: req.body?.shopPhone,
            shopEmail: req.body?.shopEmail,
            shopWebsite: req.body?.shopWebsite,
            shopDescription: req.body?.shopDescription,
            shopLogo: req.body?.shopLogo,
            shopBanner: req.body?.shopBanner,
        };
        const shopId = req.params?.shopId;
        const shop = await Shop.findOne({ _id: shopId });

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        if (shop.seller !== res.locals?.authData?._id) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to edit this shop",
            });
        }
        shop.overwrite(data);
        await shop.save();
        return res.status(200).json({
            success: true,
            message: "Shop Data Updated",
            data: shop,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// delete a shop
const deleteShopController = async (req, res) => {
    try {
        const shopId = req.params?.shopId;
        const shop = await Shop.findOne({ _id: shopId });
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        if (!checkPermission(res.locals?.authData, req.type, shop)) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this shop",
            });
        }
        await shop.delete();
        return res.status(200).json({
            success: true,
            message: "Shop Deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
module.exports = {
    addShopController,
    editShopController,
    deleteShopController,
};
