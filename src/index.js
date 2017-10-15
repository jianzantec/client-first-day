import dva from 'dva';
import 'antd/dist/antd.css';
import './index.css';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/member'));
app.model(require('./models/main'));
app.model(require('./models/grade'));
app.model(require('./models/student'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

