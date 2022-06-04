const {ValidationError, SendError} = require("../errors/error");
const {validationResult} = require("express-validator");
const channelRepository = require('../repositories/ChanelsRepository');
const workspaceRepository = require('../repositories/WorkspacesRepository');
const {NotFound, notOwner} = require('../constants').services;
const {changeString} = require("../helpers/helper");

module.exports = {
    /**
     * create channel process
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    create: async (req) => {
        console.log('channelService ---> createChannel');
        const newData = {};
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors['errors'][0].msg);
        }

        newData.name = body.name;
        newData.workspaceId = body.workspaceId
        newData.userId = req.user._id;
        const workspace = await workspaceRepository.findWorkSpaceByQuery({_id: body.workspaceId});
        if (!workspace) throw new SendError(changeString(NotFound, {item: 'workforce'}));
        console.log(workspace);
        if (!workspace.userId || workspace.userId._id.toString() !== req.user._id.toString()) throw new SendError(changeString(notOwner, {item: 'workspace'}));
        return channelRepository.createChannel(newData);
    },
    /**
     * get channel
     * @param req
     */
    getChannel: async (req) => {
        console.log('channelService ---> getChannel');
        const {id, workspaceId} = req.params;
        const channel = await channelRepository.findChannelByQuery({
            _id: id,
            userId: req.user._id,
            workspaceId: workspaceId
        });
        if (!channel) throw new SendError(changeString(NotFound, {item: 'channel'}));
        return channel

    },
    /**
     * delete channel
     * @param req
     * @returns {Promise<void>}
     */

    deleteChannel: async (req) => {
        console.log('channelService ---> deleteChannel');
        const channel = await channelRepository.findChannelByQuery({_id: req.params.id, userId: req.user._id});
        if (!channel) throw new SendError(changeString(NotFound, {item: 'channel'}));

        const result = await channelRepository.deleteChannelByQuery({_id: req.params.id, userId: req.user._id});
        console.log(result);

    },
    /**
     * update channel
     * @param req
     * @returns {Promise<Query<*, *, {}, *>>}
     */
    updateChannel: async (req) => {
        console.log('channelService ---> updateChannel');
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors['errors'][0].msg);
        }
        const channel = await channelRepository.findChannelByQuery({_id: body.id});

        console.log(channel.userId.toString())
        if (channel.userId._id.toString() !== req.user._id.toString()) throw new SendError(changeString(notOwner, {item: 'channel'}));
        channel.name = body.name;
        await channel.save();
        return channel;
    },
    /**
     * get channels by workspace
     * @param req
     * @returns {Promise<void>}
     */
    getChannelsByWorkspace: async (req) => {
        console.log('channelService ---> getChannelsByWorkspace');
        const channels = await channelRepository.getAllChannelsByWorkspace(req.params.workspaceId);
        console.log(channels)
        return channels;

    }
}