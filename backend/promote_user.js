const mongoose = require("mongoose");
const User = require("./models/User");

const promoteUser = async () => {
  const email = process.argv[2];
  if (!email) {
    console.log("Please provide an email: node promote_user.js user@example.com");
    process.exit(1);
  }

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/budget_app");
    const user = await User.findOneAndUpdate(
      { email: email },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`SUCCESS: ${user.name} (${user.email}) is now an Admin.`);
    } else {
      console.log(`ERROR: User with email ${email} not found.`);
    }
    await mongoose.connection.close();
  } catch (error) {
    console.error("ERROR:", error.message);
  }
};

promoteUser();
