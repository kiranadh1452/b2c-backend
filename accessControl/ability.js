const { defineAbility } = require("@casl/ability");

// Defines the abilities of user
const checkPermission = (user) =>
    defineAbility((can, cannot) => {
        can("GET", "Shop");
        can("GET", "Product");
        if (user.userType === "admin") {
            can("manage", "all");
            cannot("delete", "User");
        } else if (user.userType === "customer") {
            can("GET", "Cart", { user: user._id });
        } else if (user.userType === "seller") {
            can("POST", "Product");
            can("PATCH", "Product", { seller: user._id });
            can("DELETE", "Product", { seller: user._id });

            can("POST", "Shop");
            can("PATCH", "Shop", { seller: user._id });
            can("DELETE", "Shop", { seller: user._id });
        }
    });

// let user1 = {
//     userType: "admin",
//     _id: "1",
//     name: "Admin",
// };
// let user2 = {
//     userType: "customer",
//     _id: "2",
//     name: "Customer",
// };
// let user3 = {
//     userType: "seller",
//     _id: "3",
//     name: "Seller",
// };
// let arr = [user1, user2, user3];
// arr.forEach((user) => {
//     let userAbility = checkPermission(user);
//     console.log(userAbility);
//     console.log(userAbility.can("GET", "Shop"));
//     console.log(userAbility.can("GET", "Product"));
//     console.log(userAbility.can("GET", "Cart"));
//     console.log(userAbility.can("POST", "Product"));
//     console.log(userAbility.can("PATCH", "Product"));
//     console.log(userAbility.can("DELETE", "Product"));
//     console.log(userAbility.can("POST", "Shop"));
//     console.log(userAbility.can("PATCH", "Shop"));
//     console.log(userAbility.can("DELETE", "Shop"));
// });

module.exports = checkPermission;
