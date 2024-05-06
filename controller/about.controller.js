const client = require('../model/dbConn')
async function about(req, res) {
    try {
        //ambil data dari db
        const { rows } = await client.query(`
    SELECT * FROM about;
    `);
    //ambil data dari db
    const data = await client.query(`
    SELECT * FROM visi_misi;
    `);
    dataVisiMisi = data.rows
        dataAbout = rows

        res.status(200).render('about', {
            status: 'success',
            message: 'get data success',
            dataAbout: dataAbout,
            layout: 'layouts/main-layouts',
            title: 'ABOUT',
            dataVisiMisi:dataVisiMisi,
            akun:null
        });
        // console.log('data :', data1)


        // res.status(200).json({
        //     status: 'success',
        //     message: 'get data success',
        //     dataAbout: data1
        // });
        // for (i = 0; i < data1.length; i++) {
        //     console.log({ "nama": data1[i].id_about })
        // }
        // console.log(data1[1].id_about)

    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function aboutUnique(req, res) {
    try {
        const aboutId = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM about WHERE id_about=${parseInt(aboutId)};
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
            data: data.rows
        });
        // console.log([data.rows[0]])
    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteAbout(req, res) {
    const deleteAbout = req.body;
    const id = deleteAbout.id_about;
    //input data
    await client.query(`DELETE FROM about WHERE id_about=${id}`)
    //kasih respone
    res.status(200).json({ message: `delete sukses by id: ${id}` });
    console.log('sukses');
};
async function inputAbout(req, res) {
    try {
        const newAbout = req.body;
        const judul = newAbout.judul_about;
        const content = newAbout.content_about;
        const img = newAbout.img_about;
        if (!(judul && content && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO about (judul_about,isi_about,img_about)
    VALUES ($1, $2, $3)
    `, [
            judul,
            content,
            img
        ]);
        //kasih respone
        res.status(200).json({
            status: 'success', message: 'input data success',
            data: newAbout
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateAbout(req, res) {
    const newAbout = req.body;
    try {
        const id = newAbout.id_about;
        const judul = newAbout.judul_about;
        const content = newAbout.content_about;
        const img = newAbout.img_about;
        //cek semua terisi
        if (!(judul && content && img)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE about SET judul_about = '${judul}',
    isi_about = '${content}',
    img_about = '${img}'
    WHERE id_about = ${id}
    `)
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
module.exports = { about, aboutUnique, deleteAbout, inputAbout, updateAbout };