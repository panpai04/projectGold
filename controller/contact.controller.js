const client = require('../model/dbConn')
async function contact(req, res) {
    try {
        //ambil data dari db
        const dataContact = await client.query(`
    SELECT * FROM contact;
    `);
    const dataWork = await client.query(`
    SELECT * FROM work_hours;
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
       
        res.status(200).render('contact', {
            status: 'success', message: 'get data success',
            dataContact: dataContact.rows,
            layout: 'layouts/main-layouts',
            title: 'CONTACT',
            dataWork:dataWork.rows,
            akun:null
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
async function contactUnique(req, res) {
    try {
        const id = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM contact WHERE id_contact=${parseInt(id)};
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
async function deleteContact(req, res) {
    try {
        const data = req.body;
        const id = data.id_contact;
        //input data
        await client.query(`DELETE FROM contact WHERE id_contact=${id}`)
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
async function inputContact(req, res) {
    try {
        const newData = req.body;
        const telephone = newData.telephone;
        const alamat_contact = newData.alamat_contact;
        const email_contact = newData.email_contact;
        if (!(telephone && alamat_contact && email_contact)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO contact (telephone,alamat_contact,email_contact)
    VALUES ($1, $2, $3)
    `, [
            telephone,
            alamat_contact,
            email_contact
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
async function updateContact(req, res) {
    const newData = req.body;
    try {
        const id = newData.id_contact;
        const telephone = newData.telephone;
        const alamat_contact = newData.alamat_contact;
        const email_contact = newData.email_contact;
        //cek semua terisi
        if (!(telephone && alamat_contact && email_contact)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE contact SET telephone = '${telephone}',
    alamat_contact = '${alamat_contact}',
    email_contact = '${email_contact}'
    WHERE id_contact = ${id}
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
module.exports = { contact, contactUnique, deleteContact, inputContact, updateContact };