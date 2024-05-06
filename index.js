const express = require('express');
const app = express();
const user = require('./router/user.router');
const PORT = process.env.PORT || 2323
const expressLayouts = require('express-ejs-layouts')
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(expressLayouts)
app.use(express.static('public'))
// ROUTING
app.use('/', user);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});