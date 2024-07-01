import bcrypt from "bcryptjs";

const encryptPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, result) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const checkPassword = (encryptPassword: string, password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptPassword, (err, result) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export { encryptPassword, checkPassword };
