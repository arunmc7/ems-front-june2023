import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/allapi';
import { BASE_URL } from '../services/baseurl';




function Hometable({displayData,removeUser}) {

  console.log(displayData);
  

 
  



  return (
   <>

<Table bordered hover className='mt-3 shadow'>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       
       {

        displayData.length>0?
        displayData.map((item,index)=>(

          <tr>
          <td>{index+1}</td>
          <td>{item.fname} {item.lname}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td><button className={item.status==="Active"?"btn btn-success":"btn btn-danger"}>{item.status}</button></td>
          <td><img height={'100px'} src={`${BASE_URL}/uploads/${item.profile}`} alt="" /></td>

          <td>

            <Link to={`/view/${item._id}`}><i class="fa-solid fa-eye fs-3 me-2"></i></Link>
            <Link to={`/edit/${item._id}`}><i class="fa-solid fa-pen fs-3 me-2"></i></Link>

            <span onClick={()=>removeUser(item._id)}><i style={{color:'red'}}  class="fa-solid fa-trash fs-3 "></i></span>



          </td>
          
        </tr>
        




        )):<tr className='fw-bolder mt-5 text-danger w-100'>
          NOTHING TO DISPLAY !!!!
        </tr>


       
        }
      </tbody>
    </Table>
   
   
   </>
  
  )
}

export default Hometable