const client = require('../model/dbConn')
async function workHours(req, res) {
    try {
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM work_hours;
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
async function workHoursUnique(req, res) {
    try {
        const id = req.params.id;
        //ambil data dari db
        const data = await client.query(`
    SELECT * FROM work_hours WHERE id_work=${parseInt(id)};
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
async function deleteWorkHours(req, res) {
    try {
        const data = req.body;
        const id = data.id_work;
        //input data
        await client.query(`DELETE FROM work_hours WHERE id_work=${id}`)
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
async function inputWorkHours(req, res) {
    try {
        const newData = req.body;
        const work_hours = newData.work_hours;
        const days = newData.days;
        // console.log(newData)
        if (!(days && work_hours)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`INSERT INTO work_hours (work_hours,days)
    VALUES ($1, $2)
    `, [
            work_hours,
            days

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
async function updateWorkHours(req, res) {
    
    try {
        const newData = req.body;
        const work_hours = newData.work_hours;
        const days = newData.days;
        const id = newData.id_work;
        if (!(work_hours && days)) {
            res.status(400).send('some fields missing!!!')
            return;
        }
        //input data
        await client.query(`UPDATE work_hours SET work_hours = '${work_hours}',
    days = '${days}'
    WHERE id_work = ${id}
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
module.exports = { workHours, workHoursUnique, deleteWorkHours, inputWorkHours, updateWorkHours };