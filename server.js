const { createApp } = require('./app');

const app = createApp();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));