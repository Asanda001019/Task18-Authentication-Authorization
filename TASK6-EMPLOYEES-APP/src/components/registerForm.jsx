import React, {useRef, useState } from 'react'
import "./register.css"

function Register(){

const employeeList =[
  {
    id:1,
    name:"KIANA",
    surname:"LEDE",
    age:25,
    salary:"R4000",
    department:"TRANSPORT",
  },{
    id:2,
    name:"TAYLOR",
    surname:"BROWN",
    age:30,
    salary:"R4500",
    department:"HEALTH",
  },{
    id:3,
    name:"KHAYA",
    surname:"ZONDO",
    age:35,
    salary:"R5000",
    department:"EDUCATION",
  },
]

const [employeeLisT, setEmployeeLIst] = useState(employeeList)

const [updateEmployeeData, setUpdateEmployeeData] = useState(-1)

  return (
  
<div className='reg'>
  <div>
<AddList setEmployeeLIst={setEmployeeLIst}/>

<form onSubmit={handleSubmit}>
      <table>
        {
          employeeLisT.map((current)=>(
            updateEmployeeData === current.id? <EditList current= {current} employeeLisT={employeeLisT} setEmployeeLIst={setEmployeeLIst}/> :

            <tr>

             <td>{current.name}</td>
             <td>{current.surname}</td>
             <td>{current.age}</td>
             <td>{current.salary}</td>
             <td>{current.department}</td>
             <td>
              <button className='edit' onClick={()=>handleEdit(current.id)}>Edit</button>
              <button className='delete'>Delete</button>
             </td>

            </tr>
          ))
        }
      </table>
      </form>
      </div>
</div>

    
  )

function handleEdit(id){
   
  setUpdateEmployeeData(id)

}

function handleSubmit(event){
  event.preventDefault()
  const name =event.target.elements.name.value
  const surname =event.target.elements.surname.value
  const age =event.target.elements.age.value
  const salary =event.target.elements.salary.value
  const department =event.target.elements.department.value

  const newList= employeeLisT.map((li)=>(
    li.id ===updateEmployeeData ? {...li, name:name, surname:surname, age:age, salary:salary, department:department, }:li
  ))

  setEmployeeLIst(newList)

  setUpdateEmployeeData(-1)

}
}

function EditList({current, employeeLisT ,setEmployeeLIst}){

function handleInput(event){
  const name = event.target.name;
  const value = event.target.value;
  const newList= employeeLisT.map((li)=>(
    li.id ===current.id ? {...li, name:value}:li
  ))

  setEmployeeLIst(newList)

}

  return(
    <tr>
    <td><input type="text" onChange={handleInput} name='name'value={current.name}/></td>
    <td><input type="text" name='surname' value={current.surname}/></td>
    <td><input type="text" name='age' value={current.age}/></td>
    <td><input type="text" name='salary' value={current.salary}/></td>
    <td><input type="text" name='department' value={current.department}/></td>
    <td><button type="submit">Update</button></td>
    </tr>
  )
}





function AddList({setEmployeeLIst}){

   const nameRef = useRef()
   const surnameRef = useRef()
   const ageRef = useRef()
   const salaryRef = useRef()
   const departmentRef = useRef()  

function handleSubmit(event){

  event.preventDefault();

  const name = event.target.elements.name.value;
  const surname = event.target.elements.surname.value;
  const age = event.target.elements.age.value;
  const salary = event.target.elements.salary.value;
  const department = event.target.elements.department.value;

  const newList ={
    id:3,
    name,
    surname,
    age,
    salary,
    department
  }

  setEmployeeLIst((prevList)=>{
    return prevList.concat(newList)
  })
  nameRef.current.value="";
  surnameRef.current.value="";
  ageRef.current.value="";
  salaryRef.current.value="";
  departmentRef.current.value="";
}

  return(

    <form className='addForm' onSubmit={handleSubmit}>

      <input type='text'
      name='name'
      placeholder='Enter your name'
      ref={nameRef}
      />

<input type='text'
      name='surname'
      placeholder='Enter your surname'
      ref={surnameRef}
      />

<input type='number'
      name='age'
      placeholder='Enter your age'
      ref={ageRef}
      />

<input type='number'
      name='salary'
      placeholder='Enter your salary'
      ref={salaryRef}
      />

<input type='text'
      name='department'
      placeholder='Enter your department'
      ref={departmentRef}/>

      <button type='submit'>ADD</button>

    </form>
  )
}

export default Register
