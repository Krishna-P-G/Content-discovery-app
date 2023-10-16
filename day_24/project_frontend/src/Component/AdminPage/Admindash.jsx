import React, { useState } from "react";
import "./Admindash.css"
import Obito_Profile from "../../assets/logo.jpg";
import { motion } from "framer-motion";
import { categories_admin } from "./categories_admin";
import Category from "../Category/Category";
// import { VideoData } from "../Homepage/data";
import axios from "axios";
import { useEffect } from "react";
import { TdeleteUser } from "../../service/api";

const Admindash = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      loadUsers();
    }, []);


    const deleteUser = async(id)=>{
      await TdeleteUser(id)
      loadUsers();  
    }


    const loadUsers = async () => {
      const result = await axios.get("http://localhost:8080/api/admin/getdata");
      console.log(result);
      setUsers(result.data);
    };
    return (
      <>
        <div className="container-admin">
          <div className="categories-container-admin">
            {categories_admin.map((data) => (
              <Category key={data.id} data={data} />
            ))}
          </div>
          <div className="content-container-admin">
            <div className="Page-page-admin">
            <span className="MainPage_Video_Title">All Users</span>
              <motion.div className="PageVideo-page-admin">
                {users.map((user, index) => (
                  <motion.div className="Page-Video-div-admin">
                    key={index}
                    <img
                      src={Obito_Profile}
                      alt="profile_photo"
                      className="profile_photo_admin"
                    />
                    <div className="Page-Video-useremail-admin">{user.email}</div>
                    <div className="Page-Video-username-admin">
                      {user.username}
                    </div>
                    <div className="Page-Video-Delete-View">
                      <button className="delete_button_admin"  onClick={()=>deleteUser(user.id)} >Delete User</button>
                      <button className="view_button_admin">View Post</button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Admindash