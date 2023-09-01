
// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// export default app

import app from "./app"

const PORT : number = 3000;

app.listen(PORT, ()=> console.log('running'))