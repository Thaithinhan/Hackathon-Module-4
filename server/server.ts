import { app } from "./src/app";

const port = 4000

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})