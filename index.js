const app = require('./app');

const files = require('./routes/files');
const login = require('./routes/login');
const signup = require('./routes/signup');
const upload = require('./routes/upload');
const getImage = require('./routes/getImage');
// const filesRouter = require('./routes/index')
const port = 4000

app.use('/files', files);
app.use('/login', login);
app.use('/signup', signup);
app.use('/upload', upload);
app.use('/image', getImage);

app.listen(port, () => {
    console.log('listening on port ' + port);
})
