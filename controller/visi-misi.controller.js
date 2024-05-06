const client = require('../model/dbConn')
async function visiMisi(req, res) {
    try {
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM visi_misi;
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        data1 = data.rows
        res.status(200).json({
            status: 'success', message: 'get data success',
            data: data1
        }
        );
        // for (i = 0; i < data1.length; i++) {
        //     console.log({ "nama": data1[i].alamat_contact })
        // }
        // console.log(data1[1].id_about)

    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function visiMisiUnique(req, res) {
    try {
        const id = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM visi_misi WHERE id_visi_misi=${parseInt(id)};
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        if (!data.rows[0]) {
            return res.status(404).send("Data Not Found")

        }

        res.status(200).json({
            status: 'success', message: 'get data success',
            data: data.rows
        });
        // console.log([data.rows[0]])
    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteVisiMisi(req, res) {
    try {
        const data = req.body;
        const id = data.id_visi_misi;
        //input data
        await client.query(`DELETE FROM visi_misi WHERE id_visi_misi=${id}`)
        //kasih respone
        res.status(200).json({
            status: 'success',
            message: 'delete data success'
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function inputVisiMisi(req, res) {
    try {
        const newData = req.body;
        const visi = newData.visi;
        const misi = newData.misi;
        // console.log(newData)
        if (!(visi && misi)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO visi_misi(visi,misi)
    VALUES ($1, $2)
    `, [
            visi,
            misi

        ]);
        //kasih respone
        res.status(200).json({
            status: 'success', message: 'input data success',
            data: newData
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateVisiMisi(req, res) {

    try {
        const newData = req.body;
        const visi = newData.visi;
        const misi = newData.misi;
        const id = newData.id_visi_misi;
        if (!(misi && visi)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE visi_misi SET visi = '${visi}',
    misi = '${misi}'
    WHERE id_visi_misi = ${id}
    `)
        //kasih respone
        res.status(200).json({
            data: newData,
            // {
            //     id: id,
            //     telephone: telephone,
            //     alamat_contact: alamat_contact,
            //     email_contact: email_contact
            // },
            message: "update sucses",
            status: 'succsess'
        });
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = { visiMisi, visiMisiUnique, deleteVisiMisi, inputVisiMisi, updateVisiMisi };