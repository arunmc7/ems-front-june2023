import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hometable from "../components/Hometable";
import LoadingSpinner from "../components/LoadingSpinner";
import { registerContext } from "../components/Contextshare";
import Alert from 'react-bootstrap/Alert';
import { deleteUser, getUsers } from "../services/allapi";




function Home() {

  const [alluserData,setalluserData]=useState([])




  const{registerData,setregisterData}=useContext(registerContext)

  const[showspin,setshowspin]=useState(true)

  //for searching name

  const[search,setSearch]=useState("")
  console.log(search);


  useEffect(() => {

    getAllEmployees()

    //settimeout is a predefined fn

    setTimeout(() => {

      setshowspin(false)
      
    }, 2000);

  }, [search])

  //api call to get all employees

  const getAllEmployees=async()=>{

    const response=await getUsers(search)

    console.log(response);

    if(response.status==200){
      setalluserData(response.data)
    }
    else{
      alert('can not fetch data')
    }

  }
  console.log(alluserData);


  //delete employee

  const removeUser=async(id)=>{
    const response= await deleteUser(id)

    if(response.status===200){
      getAllEmployees()
    }
    else{
      alert("FAILED.....TRY AFTER SOME TIME!!!")
    }
  }
  



  return (
    <>

    {
      registerData&& <Alert variant="success" onClose={()=>setregisterData("")} dismissible >

        {registerData.fname.toUpperCase()} registered successfully...........


      
    </Alert>
    }





    
    { 

    showspin?

    <LoadingSpinner/>:

    
    
    <div>

      <div className="container">
          <div className="search d-flex align-items-center mt-3">
            <span>Search:</span>
            <input
            onChange={e=>setSearch(e.target.value)}
              type="text"
              placeholder="Search By Employee Name "
              className="form-control ms-2"
              style={{ width: "400px" }}
            />
  
            <Link to={'/add'} className="btn btn-primary ms-auto mt-4">
              <i
                style={{ color: "green" }}
                class="fa-solid fa-user-plus fa-beat-fade"
              ></i>
            </Link>
          </div>
  
          <div className="table mt-5">
  
            <h1 className="fw-bolder">List Of All Employees</h1>
  
            <Hometable displayData={alluserData} removeUser={removeUser}/>
  
  
          </div>
  
        </div>

    </div>
      
      }
    </>
  );
}

export default Home;
