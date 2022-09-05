import app from '../source/app';
import 'dotenv/config';
//teste
app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});