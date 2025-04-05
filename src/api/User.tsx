import { createContext } from "react";

interface userInterface {
    idUser : string,
    username: string
}

const User : userInterface = {
    idUser : "",
    username : ""
}

export {User}; 

// export const userContext = createContext<userInterface>({
//     idUser : "",
//     username : ""
// }); 