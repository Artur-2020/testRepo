const WorkSpace = require('../models/workspaces');


module.exports = {
    /**
     * find workspace by query
     * @param query
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    findWorkSpaceByQuery: (query) => {
        console.log("Workspace Repo ==> findWorkspaceByQuery");
        return WorkSpace.findOne(query).populate('userId');

    },
    /**
     * createWorkspace
     * @param data
     * @returns {Promise<void>}
     */
    createWorkspace: (data) => {
        console.log("Workspace Repo ==> create workspace");
        return WorkSpace.create(data);


    },
    deleteWorkspaceByQuery: async (query) => {
        console.log("Workspace Repo ==> delete workspace");
        return WorkSpace.deleteOne(query);
    },
    /**
     * updateWorkspace
     * @param filter
     * @param updater
     * @returns {Promise<Query<UpdateResult, any, {}, any>>}
     */
    updateWorkspace: async (filter, updater) => {
        return WorkSpace.findOneAndUpdate(
            filter,
            updater,
        );

    },
    /**
     * getting all workspacesBy user
     * @returns {Promise<void>}
     */
    getAllWorkspaces: (userId) => {
        return WorkSpace.find({userId}).populate('userId');
    }
};