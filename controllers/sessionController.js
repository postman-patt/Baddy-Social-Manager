import User from '../models/User.js'
import Session from '../models/Session.js'

//@desc Get all sessions
//@route GET /api/sessions
//@access private

export const getSessions = async (req, res, next) => {
  try {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const count = await Session.countDocuments({ ...keyword })
    const sessions = await Session.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ date: 'desc' })
      .populate('host')
      .populate({
        path: 'players',
        populate: { path: 'player', model: 'User' },
      })

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: { sessions, page, pages: Math.ceil(count / pageSize) },
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

//@desc Get user sessions
//@route GET /api/sessions
//@access private

export const getUserSessions = async (req, res, next) => {
  try {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const count = await Session.countDocuments({
      $or: [{ host: req.user._id }, { 'players.player': req.user._id }],
    })
    const sessions = await Session.find({
      $or: [{ host: req.user._id }, { 'players.player': req.user._id }],
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ date: 'desc' })
      .populate('host')
      .populate({
        path: 'players',
        populate: { path: 'player', model: 'User' },
      })

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: { sessions, page, pages: Math.ceil(count / pageSize) },
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Something went wrongg',
    })
  }
}

//@desc Add sessions
//@route POST /api/sessions
//@access private

export const addSessions = async (req, res, next) => {
  try {
    const session = await Session.create(req.body)

    return res.status(201).json({
      success: true,
      data: session,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message)
      return res.status(400).json({
        success: false,
        error: message,
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      })
    }
  }
}

//@desc Edit sessions
//@route PUT /api/sessions/edit/:id
//@access public

export const editSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)

    session.location = req.body.location
    session.date = req.body.date
    session.time = req.body.time
    session.notes = req.body.notes
    session.totalCosts = req.body.totalCosts
    await session.save()

    return res.status(201).json({
      success: true,
      data: session,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message)
      return res.status(400).json({
        success: false,
        error: message,
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      })
    }
  }
}

//@desc Delete all sessions
//@route DELETE /api/sessions/:id
//@access private

export const deleteSessions = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'No sessions found',
      })
    } else {
      await session.remove()
      return res.status(200).json({
        success: true,
        data: {},
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Something went wrong',
    })
  }
}

//@desc Add Player
//@route POST /api/sessions/:id
//@access private

export const addPlayer = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'No sessions found',
      })
    } else {
      await session.players.push(req.body)
      await session.save()
      const newSession = await Session.findById(req.params.id)
        .populate('host')
        .populate({
          path: 'players',
          populate: { path: 'player', model: 'User' },
        })
      return res.status(200).json({
        success: true,
        data: newSession,
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    })
  }
}

//@desc Remove Player
//@route Delete /api/sessions/:id
//@access private

export const removePlayer = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'No sessions found',
      })
    } else {
      await session.players.remove({ _id: req.body.playerid })
      await session.save()
      const newSession = await Session.findById(req.params.id)
        .populate('host')
        .populate({
          path: 'players',
          populate: { path: 'player', model: 'User' },
        })
      return res.status(200).json({
        success: true,
        data: newSession,
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    })
  }
}

//@desc Edit paid status
//@route PUT /api/sessions/edit/paid/:id
//@access public

export const editPaid = async (req, res, next) => {
  try {
    const session = await Session.findOne({ _id: req.params.id })

    const player = session.players.filter(
      (item) => item._id == req.body.playerSessionId
    )

    if (!player[0].paid) {
      const newSession = await Session.findOneAndUpdate(
        { _id: req.params.id, 'players._id': req.body.playerSessionId },
        { $set: { 'players.$.paid': true } },
        { returnOriginal: false }
      )
        .populate('host')
        .populate({
          path: 'players',
          populate: { path: 'player', model: 'User' },
        })
      return res.status(201).json({
        success: true,
        data: newSession,
      })
    } else {
      const newSession = await Session.findOneAndUpdate(
        { _id: req.params.id, 'players._id': req.body.playerSessionId },
        { $set: { 'players.$.paid': false } },
        { returnOriginal: false }
      )
        .populate('host')
        .populate({
          path: 'players',
          populate: { path: 'player', model: 'User' },
        })
      return res.status(201).json({
        success: true,
        data: newSession,
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message)
      return res.status(400).json({
        success: false,
        error: message,
      })
    } else {
      return res.status(500).json({
        success: false,
        error: err,
      })
    }
  }
}
