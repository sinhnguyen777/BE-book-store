const PermissionService = require('../services/permissions.service');
const RoleService = require('../services/role.service')

module.exports.GetAll = async (req, res, next) => {
    try {
        const Permission = await PermissionService.getAll();

        return res.status(200).json({ code: "200", message: "sucsses", data: Permission });

        // res.status(404).json({code:"404",message:"fail"});
    } catch (err) {
        console.log(err);
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const permissions = await PermissionService.getById(id);
        if (!permissions) {
            return res.status(404).json({ code: "404", message: "permissions not found" });
        }
        return res.status(200).json({ code: "200", message: "sucsses", data: permissions });
        // res.status(404).json({code:"404",message:"fail"});

    } catch (err) {
        console.log(err);
    }
}


module.exports.create = async (req, res, next) => {
    try {
        let value = req.body;
        const add = await PermissionService.createNew(value);
        const newValue = {
            idPermissions: add._id,
            name: add.name
        }

        if (add) {
            const listRole = await RoleService.getAll();
            await listRole.map(async (item) => {
                if (item._id == "616e9df24610dc3e93caa27f") {
                    const valueAdmin = {
                        idPermissions: newValue.idPermissions,
                        name: newValue.name,
                        status: true
                    }
                    const newDataAdmin = [...item.listPermissions, valueAdmin];
                    await RoleService.addPermission(item._id, newDataAdmin)

                } else {
                    const newData = [...item.listPermissions, newValue];
                    await RoleService.addPermission(item._id, newData)
                }
            });
            return res.status(200).json({ code: "200", message: "sucsses" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const DelPermission = await PermissionService.delete(id);
        if (DelPermission) {
            const listRole = await RoleService.getAll();
            listRole.map(async item => {
                const listNewPermissions = item.listPermissions;
                const newData = listNewPermissions.filter(item => item.idPermissions != id);
                await RoleService.addPermission(item._id, newData)
            })
            return res.status(200).json({ code: "200", message: "sucsses" });
        }
        return res.json({ code: "404", message: "Permission not foud" })
        // return res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    } catch (err) {
        console.log(err);
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.body;
        const value = req.body;
        const listRole = await RoleService.getAll();
        const UpdatePermission = await PermissionService.update(id, value);
        if (!UpdatePermission) {
            res.json({ code: "404", message: "Prmission not found" })
        } else {
            listRole.map(async (item) => {
                const NewData = item.listPermissions;
                const DetailData = NewData.filter(item => item.idPermissions == id);
                DetailData[0].name = value.name;
                await RoleService.addPermission(item._id, NewData)
            });
            res.json({ code: "200", message: "sucsses" })
        }
    } catch (err) {
        console.log(err);
    }
}