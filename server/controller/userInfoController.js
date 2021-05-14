exports.userInfo = async (req, res) => {
  try {
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    console.error(new Error(err))
  }
}
