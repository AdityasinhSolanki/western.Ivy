import User from "../models/user.js"


// GET DOMAIN USERS (pending approval)
export const getDomainUsers = async (req, res) => {

  try {

    const users = await User.find({
      domainUser: true,
      isAdmin: false
    }).select("-password")

    res.json(users)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}



// APPROVE ADMIN
export const approveAdmin = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.isAdmin = true

    await user.save()

    res.json({ message: "User promoted to admin" })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}



// DEMOTE ADMIN
export const demoteAdmin = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.isAdmin = false

    await user.save()

    res.json({ message: "Admin removed successfully" })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}