const {ValidationError, SendError} = require("../errors/error");
const {v4: uuidv4} = require('uuid');
const {validationResult} = require("express-validator");
const workspaceRepository = require('../repositories/WorkspacesRepository');
const {NotFound, notOwner} = require('../constants').services;
const {changeString} = require("../helpers/helper");

module.exports = {
    /**
     * create workspace process
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    create: async (req) => {
        console.log('workspaceService ---> createWorkspace');
        const newData = {};
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors['errors'][0].msg);
        }

        newData.name = body.name;
        newData.uniqueSlag = uuidv4();
        newData.userId = req.user._id;
        return workspaceRepository.createWorkspace(newData);
    },
    /**
     * get workspace
     * @param req
     */
    getWorkspace: async (req) => {
        console.log('workspaceService ---> getWorkspace');
        const workspace = await workspaceRepository.findWorkSpaceByQuery({_id: req.params.id, userId: req.user._id});
        if (!workspace) throw new SendError(changeString(NotFound, {item: 'workspace'}));
        return workspace;

    },
    /**
     * delete workspace
     * @param req
     * @returns {Promise<void>}
     */
    deleteWorkspace: async (req) => {
        console.log('workspaceService ---> deleteWorkspace');
        const workspace = await workspaceRepository.findWorkSpaceByQuery({_id: req.params.id, userId: req.user._id});
        if (!workspace) throw new SendError(changeString(NotFound, {item: 'workspace'}));

        const result = await workspaceRepository.deleteWorkspaceByQuery({_id: req.params.id, userId: req.user._id});
        console.log(result);

    },
    /**
     * update workspace
     * @param req
     * @returns {Promise<Query<*, *, {}, *>>}
     */
    updateWorkspace: async (req) => {
        console.log('workspaceService ---> updateWorkspace');
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors['errors'][0].msg);
        }
        const workspace = await workspaceRepository.findWorkSpaceByQuery({_id: body.id});
        if (!workspace.userId || workspace.userId._id.toString() !== req.user._id.toString()) throw new SendError(changeString(notOwner, {item: 'workspace'}));
        workspace.name = body.name;
        await workspace.save();
        return workspace;
    },
    /**
     * getting all channels by workspace
     * @param req
     * @returns {Promise<void>}
     */
    getAllWorkspacesByUser: async (req) => {
        console.log('workspaceService ---> updateWorkspace');
        const workspaces = await workspaceRepository.getAllWorkspaces(req.user._id);
        return workspaces;

    }


}