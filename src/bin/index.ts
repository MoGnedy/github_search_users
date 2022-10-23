const { PORT } = process.env;

import { app } from "../app";

app.listen(3000, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
