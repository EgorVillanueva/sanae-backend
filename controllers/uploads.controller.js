const { response } = require("express");
const { uploadFile } = require("../helpers");

const uploadFiles = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({
            msg: 'No hay archivos que subir'
        });
        return;
    }

    try {

        // Archivos a subir
        const name = await uploadFile(req.files, undefined, 'imgs');
        // const name = await uploadFile(req.files, ['txt', 'md'], 'documents');
        res.json({ name });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

module.exports = {
    uploadFiles
}