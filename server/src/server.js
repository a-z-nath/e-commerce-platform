import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

await connectDB()
  .then(
    app.listen(port, () => {
      console.log(
        `Server is listening at port: ${port}. \nServer is running at http://localhost:${port}`
      );
    })
  )
  .catch((err) => {
    console.log(`Server is failed to connect MongoDB!!! ~ ${err}`);
  });
