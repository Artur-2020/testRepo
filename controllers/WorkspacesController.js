const {CatchError} = require('../errors/error');
const workSpaceService = require('../services/WorkspacesService');

module.exports = {
    /**
     * create workspacce
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createWorkspace: async (req, res) => {
        console.log('workspaces controller - createWorkspace ----->');
        try {
            const workspace = await workSpaceService.create(req);
            res.status(200).send({success: true, workspaceId: workspace._id});
        } catch (e) {
            CatchError(e, res);
        }

    },
    /**
     * get workspace
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getWorkspace: async (req, res) => {
        console.log('workspaces controller - getWorkspace ----->');
        try {
            const workspace = await workSpaceService.getWorkspace(req);
            return res.status(200).send({success: true, workspace})
        } catch (e) {
            CatchError(e, res);
        }
    },
    deleteWorkspace: async (req, res) => {
        console.log('workspaces controller - deleteWorkspace ----->');
        try {
            await workSpaceService.deleteWorkspace(req);
            return res.status(200).send({success: true});

        } catch (e) {
            CatchError(e, res);
        }
    },
    updateWorkspace: async (req, res) => {
        console.log('workspaces controller - updateWorkspace ----->');
        try {
            const workspace = await workSpaceService.updateWorkspace(req);
            return res.status(200).send({success: true, workspace});

        } catch (e) {
            CatchError(e, res);
        }
    },
    getAllWorkspacesByUser: async (req, res) => {
        console.log('workspaces controller - getAll workspaces by user ----->');
        try {
            const workspaces = await workSpaceService.getAllWorkspacesByUser(req);
            return res.status(200).send({success: true, workspaces});

        } catch (e) {
            CatchError(e, res);
        }
    }

};