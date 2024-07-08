import { app } from "./app";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`API running in port: ${PORT}`);
});
