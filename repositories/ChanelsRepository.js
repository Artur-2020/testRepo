const Channel = require('../models/chanels');


module.exports = {
    /**
     * find channel; by query
     * @param query
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    findChannelByQuery: (query) => {
        console.log("Channel Repo ==> findChannelByQuery");
        return Channel.findOne(query).populate('userId').populate('workspaceId');

    },
    /**
     * createChannel
     * @param data
     * @returns {Promise<void>}
     */
    createChannel: (data) => {
        console.log("Channel Repo ==> create channe;");
        return Channel.create(data);


    },
    deleteChannelByQuery: async (query) => {
        console.log("Channel Repo ==> delete channe;");
        return Channel.deleteOne(query);
    },
    /**
     * updateChannel
     * @param filter
     * @param updater
     * @returns {Promise<Query<UpdateResult, any, {}, any>>}
     */
    updateChannel: async (filter, updater) => {
        return Channel.findOneAndUpdate(
            filter,
            updater,
        );

    },
    /**
     * getting all Channels
     * @returns {Promise<void>}
     */
    getAllChannelsByWorkspace: (id) => {
        return Channel.find({workspaceId: id}).populate('workspaceId').populate("userId");
    }
};