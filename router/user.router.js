const express = require ('express');
const router = express();
const {
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
} = require ('../controller/user.controller')
//routing for user
router.get('/', home);
router.get('/about',about);
router.get('/contact',contact);
router.get('/project',project);
//routing for user admin
router.get('/admin',homeAdmin );
router.get('/deleteAbout/:id',deleteAbout);
router.get('/about-admin',aboutAdmin);
router.post('/input-about',inputAbout);
router.get('/about-admin-byId:id',aboutUnique);
router.put('/updateAbout/:id',updateAbout);
router.post('/input-visi-misi',inputVisiMisi);
router.get('/delete-visi-misi/:id',deleteVisiMisi);
router.get('/visi-misi-admi-byId:id',visiMisiUnique);
router.put('/updateVisiMisi/:id',updateVisiMisi);
router.get('/contact-admin-byId:id',contactUnique);
router.put('/updateContact/:id',updateContact);
router.get('/delete-contact/:id',deleteContact);
router.get('/contact-admin',contactAdmin);
router.post('/input-contact',inputContact);
router.get('/project-admin',projectAdmin);





module.exports = router;