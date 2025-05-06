import app from './app';
import { envConfig } from './config';
import { MESSAGES } from './constant';

app.listen(envConfig.port, () => {
  console.log(`${MESSAGES.APP_LISTEN} ${envConfig.port}`);
});
