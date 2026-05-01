import express from "express"
import { getDomainUsers, approveAdmin, demoteAdmin } from "../controllers/userController.js"

const router = express.Router()


// GET DOMAIN REQUEST USERS
router.get("/domain-users", getDomainUsers)


// PROMOTE USER TO ADMIN
router.put("/approve-admin/:id", approveAdmin)


// DEMOTE ADMIN
router.put("/demote-admin/:id", demoteAdmin)


export default router