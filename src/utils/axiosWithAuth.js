import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem("token")
    // console.log(token);

    return axios.create({
        headers:{
            Authorization: `Bearer ${token}`,
        },
        baseURL: "https://build29-fitness-be.herokuapp.com/api/"
    })
}

export default axiosWithAuth;
