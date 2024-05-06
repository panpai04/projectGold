const client = require('../model/dbConn')
async function ourProject(req, res) {
    try {
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM our_project;
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        data1 = data.rows
        res.status(200).json({
            status: 'success',
            message: 'get data success',
            dataProject: data1
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function ourProjectUnique(req, res) {
    try {
        const projectId = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM our_project WHERE id_our_project=${parseInt(projectId)};
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        if (!data.rows[0]) {
            return res.status(404).send("Data Not Found")

        }

        res.status(200).json({
            status: 'success',
            message: 'get data success',
            dataProject: data.rows
        });
        // console.log([data.rows[0]])
    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteOurProject(req, res) {
    try {
        const deleteProject = req.body;
        const id = deleteProject.id_our_project;
        //input data
        await client.query(`DELETE FROM our_project WHERE id_our_project=${id}`)
        //kasih respone
        res.status(200).json({ message: `delete sukses by id: ${id}` });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function inputOurProjectt(req, res) {
    try {
        const newProject = req.body;
        const tempat = newProject.nama_tempat;
        const alamat = newProject.alamat;
        const img = newProject.img_our_project;
        if (!(tempat && alamat && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO our_project (nama_tempat_project,alamat_project,img_our_project)
    VALUES ($1, $2, $3)
    `, [
            tempat,
            alamat,
            img
        ]);
        //kasih respone
        res.status(200).json({
            status: 'success', message: 'input data success',
            dataProject: newProject
        });
        console.log('sukses');
        // console.log(req.body)
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateOurProject(req, res) {

    try {
        const newProject = req.body;
        const id = newProject.id_our_project;
        const tempat = newProject.nama_tempat;
        const alamat = newProject.alamat;
        const img = newProject.img_our_project;
        //cek semua terisi
        if (!(tempat && alamat && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE our_project SET nama_tempat_project = '${tempat}',
    alamat_project = '${alamat}',
    img_our_project = '${img}'
    WHERE id_our_project = ${id}
    `)
        // return;
        //kasih respone
        res.status(200).json({
            data: {
                id: id,
                tempat: tempat,
                alamat: alamat,
                img: img
            },
            message: "update sucses"
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { ourProject, ourProjectUnique, deleteOurProject, inputOurProjectt, updateOurProject };