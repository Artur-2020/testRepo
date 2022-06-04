const {CatchError} = require('../errors/error');
const channelsService = require('../services/ChannelsService');

module.exports = {
    /**
     * create channel
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createChannel: async (req, res) => {
        console.log('channels controller - createChannel ----->');
        try {
            const channel = await channelsService.create(req);
            res.status(200).send({success: true, channelId: channel._id});
        } catch (e) {
            CatchError(e, res);
        }

    },
    /**
     * get channel
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getChannel: async (req, res) => {
        console.log('channels controller - getChannel ----->');
        try {
            const channel = await channelsService.getChannel(req);
            return res.status(200).send({success: true, channel})
        } catch (e) {
            CatchError(e, res);
        }
    },
    /**
     * delete channel
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    deleteChannel: async (req, res) => {
        console.log('channels controller - deleteChannel ----->');
        try {
            await channelsService.deleteChannel(req);
            return res.status(200).send({success: true});

        } catch (e) {
            CatchError(e, res);
        }
    },
    /**
     * update channel
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    updateChannel: async (req, res) => {
        console.log('channels controller - updateChannel ----->');
        try {
            const channel = await channelsService.updateChannel(req);
            return res.status(200).send({success: true, channel});

        } catch (e) {
            CatchError(e, res);
        }
    },
    /**
     * getting all channels by workspace
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getChannels: async (req, res) => {
        try {
            const channels = await channelsService.getChannelsByWorkspace(req);
            res.status(200).send({success: true, channels});

        } catch (e) {
            CatchError(e, res);
        }
    }

};