import React from 'react'
import { Button, Form, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Select from 'react-select';
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

import { useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerContext } from "../components/Contextshare";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, editUser, getUsers } from "../services/allapi";
import { BASE_URL } from '../services/baseurl';






function Edit() {

  const[showspin,setshowspin]=useState(true)

  useEffect(() => {

    //settimeout is a predefined fn

    setTimeout(() => {

      setshowspin(false)
      
    }, 2000);

  }, [])


  const{registerData,setregisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    
  ];




  //to hold normal inputs
  const[normalInputs,setnormalInputs]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  //to hold status

  const[status,setStatus]=useState("")

  //to hold file uploading content

  const[profile,setProfile]=useState("")

  //to get preview images

  const[preview,setpreview]=useState("")

  useEffect(() => {

    if(profile){
      setexistingImg("")
      //to covert to url
      URL.createObjectURL(profile)
      setpreview(URL.createObjectURL(profile))
    }
    
  }, [profile])

  //to get single item for edit

  
  const{id}=useParams()
  const [existingImg,setexistingImg]=useState("")

  console.log(id);


 useEffect(() => {
    getUser()
 
    }, [])
 
  

  const getUser=async()=>{

   const {data}= await getUsers("")

   console.log(data);

   let existingUser=data.find(item=>item._id === id);

   setnormalInputs(existingUser)
   setStatus(existingUser.status)
   setexistingImg(existingUser.profile)

  

  }
  





  //to get normal inputs
  const getandsetInput=(e)=>{
    const{name,value}=e.target

    //restoperator
    setnormalInputs({...normalInputs,[name]:value})
  }

  console.log(normalInputs);

 //to get status ----use the statename.value

 console.log(status);


 //to get profile

 const getandsetprofile=(e)=>{
  console.log(e.target.files[0]);
  setProfile(e.target.files[0])
 }

 console.log(profile);

 //submit

 const handleSubmit=async(e)=>{
  //to avoid unnecessary refreshing
  e.preventDefault()

  //destructure data
  const{fname, lname, email, mobile, gender, location}=normalInputs

  if(!fname || !lname || !email || !mobile || !gender || !location || !status || !profile){
    toast.warning("please fill the form completely")

  }
  else{
    //toast.success("form filled")

    //to change to form data

    const data=new FormData()

    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    profile? data.append("profile",profile):data.append("profile",existingImg)
    data.append("location",location)

    //multipath data

    if(profile){

      var headers={
        "content-type":"multipart/form-data"
      }
    }
    else{
      var headers=""
    }

   

    //make api call

    const result= await editUser(id,data,headers)

    console.log(result);

    if(result.status===200){

      navigate('/')

    }
    else{
      toast.error("Request failed")
    }


  }


 }




  return (
   <>

{ 

showspin?

<LoadingSpinner/>:
     
      <div className="container mt-3">
        <h1 className="text-center fw-bolder">Update Employee Details</h1>

        <div className="shadow border rounded p-2 mt-3">
          <div className="text-center">
            <img
              style={{ width: "80px", height: "80px" }}
              src={preview?preview:`${BASE_URL}/uploads/${existingImg}`}
              alt="no image"
            />
          </div>

          <Form className="mt-3">
            <Row>
              {/* First name */}

              <FloatingLabel
                className="mb-3 col-lg-6"
                controlId="floatingInputfname"
                label="firstname"
                
              >
                <Form.Control type="text" placeholder="firstname" name="fname" value={normalInputs.fname} onChange={e=>getandsetInput(e)} />
              </FloatingLabel>

              {/* last name */}

              <FloatingLabel
                className="mb-3 col-lg-6"
                controlId="floatingInputlname"
                label="lastname"
              >
                <Form.Control type="text" placeholder="lastname" name="lname"  value={normalInputs.lname} onChange={e=>getandsetInput(e)} />
              </FloatingLabel>

              {/* email */}

              <FloatingLabel
                className="mb-3 col-lg-6"
                controlId="floatingInputemail"
                label="email"
              >
                <Form.Control type="email" placeholder="email" name="email"  value={normalInputs.email} onChange={e=>getandsetInput(e)}/>
              </FloatingLabel>

              {/* mob number */}

              <FloatingLabel
                className="mb-3 col-lg-6"
                controlId="floatingInputmobile"
                label="mobile"
              >
                <Form.Control type="text" placeholder="mobile" name="mobile"   value={normalInputs.mobile} onChange={e=>getandsetInput(e)}/>
              </FloatingLabel>

              {/* gender */}

              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Select Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  value="Male"
                  label="Male"
                  name="gender"
                  onChange={e=>getandsetInput(e)}
                  checked={normalInputs.gender==="Male"?true:false}
                />
                <Form.Check
                  type={"radio"}
                  value="Female"
                  label="Female"
                  name="gender"
                  onChange={e=>getandsetInput(e)}
                  checked={normalInputs.gender==="Female"?true:false}
                />
              </Form.Group>

              {/* status----to use dropdown we need to use a library react select .....and import select from react-select-----*/}

              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Select Employee Status</Form.Label>

                <Select placeholder={status} options={options} onChange={e=>setStatus(e.value)} />
              </Form.Group>

              {/* profile pic */}

              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>CHOOSE A PROFILE PICTURE</Form.Label>
                <Form.Control type="file" name="user_profile" onChange={e=>getandsetprofile(e)}/>
               
              </Form.Group>

                {/* location */}
                <FloatingLabel
                className="mb-3 col-lg-6 mt-5"
                controlId="floatingInputlocation"
                label="location"
              >
                <Form.Control type="text" placeholder="location"  name="location"  value={normalInputs.location} onChange={e=>getandsetInput(e)} />
              </FloatingLabel>

              <Button style={{backgroundColor:'green' , color:'white',letterSpacing:'3px'}} onClick={e=>handleSubmit(e)} type="submit" >SUBMIT</Button>


            </Row>
          </Form>
        </div>
      </div>
      
      }

    <ToastContainer />







    
   </>
  )
}

export default Edit