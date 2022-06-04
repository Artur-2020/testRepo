const express = require('express');
const router = express.Router();
const authController = require('./controllers/AuthController');
const workspaceController = require('./controllers/WorkspacesController');
const channelsController = require('./controllers/ChannelsController');
const userValidator = require('./validators/userValidator');
const workSpaceValidator = require('./validators/workspaceValidator');
const channelValidator = require('./validators/channelValidator');
const checkAuth = require('./middlewares/checkAuth');


// auth routes

router.post('/user', userValidator, authController.signUp);
router.post('/login', authController.login);


// workspaces routes

router.post('/workspace', checkAuth, workSpaceValidator.createValidator, workspaceController.createWorkspace);
router.get('/workspace/:id', checkAuth, workspaceController.getWorkspace);
router.delete('/workspace/:id', checkAuth, workspaceController.deleteWorkspace);
router.put('/workspace', checkAuth, workSpaceValidator.updateValidator, workspaceController.updateWorkspace);
router.get('/user/:userId/workspaces', checkAuth, workspaceController.getAllWorkspacesByUser);
// channels routes

router.post('/channel', checkAuth, channelValidator.createValidator, channelsController.createChannel);
router.get('/workspace/:workspaceId/channels', checkAuth, channelsController.getChannels);
router.get('/workspace/:workspaceId/channel/:id', checkAuth, channelsController.getChannel);
router.delete('/channel/:id', checkAuth, channelsController.deleteChannel);
router.put('/channel', checkAuth, channelValidator.updateValidator, channelsController.updateChannel);


module.exports = router;
