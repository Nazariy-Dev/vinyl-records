const bcrypt = require('bcrypt');
import AdminModel from "../models/adminModel"

const user =
{
    email: 'admin@gmail.com',
    password: '123456',
}


 async function addAdmin() {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await AdminModel.create({ ...user, password: hashedPassword })
}

export default addAdmin
