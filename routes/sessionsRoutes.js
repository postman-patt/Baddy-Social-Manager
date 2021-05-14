import express from 'express'
import {
  getSessions,
  addSessions,
  deleteSessions,
  addPlayer,
  removePlayer,
} from '../controllers/sessionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getSessions).post(protect, addSessions)

router
  .route('/:id')
  .delete(protect, deleteSessions)
  .post(protect, addPlayer)
  .put(protect, removePlayer)

export default router
