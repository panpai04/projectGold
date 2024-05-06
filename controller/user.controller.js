const client = require('../model/dbConn')
//controller for user
async function home(req, res) {
    try {
        //ambil data dari db
        const dataAbout = await client.query(`
    SELECT * FROM about;
    `);
        const dataProject = await client.query(`
    SELECT * FROM project;
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        Project = dataProject.rows
        About = dataAbout.rows
        res.status(200).render('home', {
            status: 'success',
            message: 'get data success',
            // dataAbout: data1,
            layout: 'layouts/main-layouts',
            title: 'HOME',
            dataProject: Project,
            dataAbout: About,
            akun: null

        })

    } catch (error) {
        res.status(400).send(error.message);
    }
}
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
            dataVisiMisi: dataVisiMisi,
            akun: null
        });


    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function contact(req, res) {
    try {
        //ambil data dari db
        const dataContact = await client.query(`
    SELECT * FROM contact;
    `);
        const dataWork = await client.query(`
    SELECT * FROM work_hours;
    `);
        // kasih response

        res.status(200).render('contact', {
            status: 'success', message: 'get data success',
            dataContact: dataContact.rows,
            layout: 'layouts/main-layouts',
            title: 'CONTACT',
            dataWork: dataWork.rows,
            akun: null
        }
        );


    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function project(req, res) {
    try {
        //ambil data dari db
        const dataProject = await client.query(`
    SELECT * FROM project;
    `);
        const dataOurProject = await client.query(`
    SELECT * FROM our_project;
    `);
        // kasih response

        res.status(200).render('project', {
            status: 'success',
            message: 'get data success',
            dataProject: dataProject.rows,
            layout: 'layouts/main-layouts',
            title: 'PROJECT',
            dataOurProject: dataOurProject.rows,
            akun: null
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}
//controller for user admin
async function homeAdmin(req, res) {
    //ambil data db
    try {
        // ambil data dari db
        const dataAbout = await client.query(`
    SELECT * FROM about;
    `);
        const dataVisiMisi = await client.query(`
    SELECT * FROM visi_misi;
    `);
        const dataContact = await client.query(`
    SELECT * FROM contact;
    `);
        const dataWorkHours = await client.query(`
    SELECT * FROM work_hours;
    `);
        const dataProject = await client.query(`
    SELECT * FROM project;
    `);
        const dataOurProject = await client.query(`
    SELECT * FROM our_project;
    `);
        // kasih response
        res.status(200).render('./admin/home-admin', {
            status: 'success',
            message: 'get data success',
            layout: 'layouts/main-layouts',
            title: 'HOME ADMIN',
            dataAbout: dataAbout.rows,
            dataVisiMisi: dataVisiMisi.rows,
            dataContact: dataContact.rows,
            dataWorkHours: dataWorkHours.rows,
            dataProject: dataProject.rows,
            dataOurProject: dataOurProject.rows,
            akun: 'ada'

        })

    } catch (error) {
        res.status(400).send(error.message);
    }
}
async function deleteAbout(req, res) {
    const aboutId = parseInt(req.params.id);
    //input data
    await client.query(`DELETE FROM about WHERE id_about=${aboutId}`)
    //kasih respone
    res.redirect('/about-admin')
};
async function aboutAdmin(req, res) {
    try {
        // ambil data dari db
        const dataAbout = await client.query(`
    SELECT * FROM about;
    `);
        const dataVisiMisi = await client.query(`
    SELECT * FROM visi_misi;
    `);
        //kasih respone
        res.status(200).render('./admin/about-admin', {
            status: 'success',
            message: 'delete data success',
            layout: 'layouts/main-layouts',
            title: 'ABOUT ADMIN',
            dataAbout: dataAbout.rows,
            dataVisiMisi: dataVisiMisi.rows,
            akun: 'ada'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
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
        res.redirect('/about-admin')
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function aboutUnique(req, res) {
    try {
        //ambil data dari db
        const aboutId = parseInt(req.params.id);
        const dataAboutUniq = await client.query(`
    SELECT * FROM about WHERE id_about=${parseInt(aboutId)};
    `);
        // kasih response
        if (!dataAboutUniq.rows[0]) {
            return res.status(404).send("Data Not Found")
        }
        res.status(200).render('./admin/aboutUnique', {
            status: 'success',
            message: 'get data success',
            layout: 'layouts/main-layouts',
            title: 'UPDATE ABOUT',
            dataAbout: dataAboutUniq.rows,
            akun: 'ada'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateAbout(req, res) {
    const newAbout = req.body;
    try {
        const id = parseInt(req.params.id);
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
        res.redirect('/about-admin')
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
        res.redirect('/about-admin')

    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function deleteVisiMisi(req, res) {
    try {
        const VisiMisiId = parseInt(req.params.id);
        //delete data
        await client.query(`DELETE FROM visi_misi WHERE id_visi_misi=${VisiMisiId}`)
        //kasih respone
        res.redirect('/about-admin')
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function visiMisiUnique(req, res) {
    try {
        const id = req.params.id;
        //ambil data dari db
        const visiMisi = await client.query(`
    SELECT * FROM visi_misi WHERE id_visi_misi=${parseInt(id)};
    `);
        if (!visiMisi.rows[0]) {
            return res.status(404).send("Data Not Found")

        }

        res.status(200).render('./admin/visiMisiUnique', {
            status: 'success',
            message: 'get data success',
            layout: 'layouts/main-layouts',
            title: 'UPDATE VISI MISI',
            dataVisiMisi: visiMisi.rows,
            akun: 'ada'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateVisiMisi(req, res) {

    try {
        const newData = req.body;
        const visi = newData.visi;
        const misi = newData.misi;
        const id = parseInt(req.params.id);
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
        res.redirect('/about-admin')
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function contactUnique(req, res) {
    try {
        const idContact = req.params.id;
        //ambil data dari db
        const dataContact = await client.query(`
    SELECT * FROM contact WHERE id_contact=${parseInt(idContact)};
    `);
        // console.log(data.rows);
        // console.log(data);
        // kasih response
        if (!dataContact.rows[0]) {
            return res.status(404).send("Data Not Found")

        }

        res.status(200).render('./admin/contactUnique', {
            status: 'success',
            message: 'get data success',
            layout: 'layouts/main-layouts',
            title: 'UPDATE CONTACT',
            dataContact: dataContact.rows,
            akun: 'ada'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function updateContact(req, res) {
    const newData = req.body;
    try {
        const id = parseInt(req.params.id);
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
        res.redirect('/contact-admin');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function deleteContact(req, res) {
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        //input data
        await client.query(`DELETE FROM contact WHERE id_contact=${id}`)
        //kasih respone
        res.redirect('/contact-admin');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function contactAdmin(req, res) {
    try {
        //ambil data dari db
        const dataContact = await client.query(`
    SELECT * FROM contact;
    `);
        const dataWork = await client.query(`
    SELECT * FROM work_hours;
    `);
        // kasih response

        res.status(200).render('./admin/contact-admin', {
            status: 'success', message: 'get data success',
            dataContact: dataContact.rows,
            layout: 'layouts/main-layouts',
            title: 'CONTACT ADMIN',
            dataWork: dataWork.rows,
            akun: 'ada'
        }
        );


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
        res.redirect('/contact-admin');
        console.log('sukses');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
async function projectAdmin(req, res) {
    try {
        //ambil data dari db
        const dataProject = await client.query(`
    SELECT * FROM project;
    `);
    const dataOurProject = await client.query(`
    SELECT * FROM our_project;
    `);
        // kasih response
    
        res.status(200).render('./admin/project-admin',{
            status: 'success',
            message: 'get data success',
            dataProject: dataProject.rows,
            layout: 'layouts/main-layouts',
            title: 'PROJECT ADMIN',
            dataOurProject:dataOurProject.rows,
            akun:'ada'
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    home,
    about,
    contact,
    project,
    homeAdmin,
    deleteAbout,
    aboutAdmin,
    inputAbout,
    aboutUnique,
    updateAbout,
    inputVisiMisi,
    deleteVisiMisi,
    visiMisiUnique,
    updateVisiMisi,
    contactUnique,
    updateContact,
    deleteContact,
    contactAdmin,
    inputContact,
    projectAdmin
    
};