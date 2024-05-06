const client = require('../model/dbConn')
async function project(req, res) {
    try {
        //ambil data dari db
        const dataProject = await client.query(`
    SELECT * FROM project;
    `);
    const dataOurProject = await client.query(`
    SELECT * FROM our_project;
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
    
        res.status(200).render('project',{
            status: 'success',
            message: 'get data success',
            dataProject: dataProject.rows,
            layout: 'layouts/main-layouts',
            title: 'PROJECT',
            dataOurProject:dataOurProject.rows,
            akun:null
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function projectUnique(req, res) {
    try {
        const projectId = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM project WHERE id_project=${parseInt(projectId)};
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
async function deleteProject(req, res) {
    const deleteProject = req.body;
    const id = deleteProject.id_project;
    //input data
    await client.query(`DELETE FROM project WHERE id_project=${id}`)
    //kasih respone
    res.status(200).json({ message: `delete sukses by id: ${id}` });
    console.log('sukses');
};
async function inputProject(req, res) {
    try {
        const newProject = req.body;
        const judul = newProject.judul_project;
        const content = newProject.content_project;
        const img = newProject.img_project;
        if (!(judul && content && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO project (judul_project,content_project,img_project)
    VALUES ($1, $2, $3)
    `, [
            judul,
            content,
            img
        ]);
        //kasih respone
        res.status(200).json({
            status: 'success', message: 'input data success',
            dataProject: newProject
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateProject(req, res) {
    const newProject = req.body;
    try {
        const id = newProject.id_project;
        const judul = newProject.judul_project;
        const content = newProject.content_project;
        const img = newProject.img_project;
        //cek semua terisi
        if (!(judul && content && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE project SET judul_project = '${judul}',
    content_project = '${content}',
    img_project = '${img}'
    WHERE id_project = ${id}
    `)
    // return;
        //kasih respone
        res.status(200).json({
            data: {
                id: id,
                judul: judul,
                content: content,
                img: img
            },
            message: "update sucses"
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { project, projectUnique, deleteProject, inputProject, updateProject };