import bcrypt from "bcrypt";

export const generarPassword = async(lenght) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefgh1jklmnopqrstuvwxyz1234567890!@#$%^&*()_+=|<>';
    var password = '';

    for(var i = 0;i < lenght; i++) {
        console.log(i);
        var rn = Math.round(Math.random() * (characters.length - 1));
        // console.log(rn);
        password += characters[rn];
        // console.log(password);
    }

    return await password;
};