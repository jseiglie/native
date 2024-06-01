const mainController = {};

mainController.test = async (req, res) => {
  console.log(
    "----------------------------------------------------TESTING-------------------------------------------"
  );
  try {
    res.send({ msg: "ok" });
  } catch (error) {
    return "!OK";
  }
};

module.exports = mainController;
