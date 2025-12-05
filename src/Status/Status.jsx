import { useEffect, useState } from "react";
import axios from 'axios'
// import PopUp from "./PopUp";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
function Status() {
  const API_URL = "https://webman.co.in/goolok/api/state";

  const [state, setState] = useState([])
  const [visible, setVisible] = useState(false);

  const loggingInConsole = async () => {
    const res = await axios.get(API_URL)
    setState(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    loggingInConsole()
  }, [])

  const [form, setForm] = useState([])
  const edit = (index) => {
    setForm(state[index]);
    // <PopUp edit={form} />
    setVisible(true)
  }
  console.log(form);

  const deleting = (index) => {
    const d = state.filter((value, i) => i !== index)
    setState(d)
  }
  const [formValidated, setFormValidated] = useState([])
  const formValidate = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // const updateData = async () => {
  //   try {
  //     setStatus("Updating...");
  //     const res = await axios.put(`${API_URL}/update/${data.vendorId}`, data);
  //     console.log("Updated:", res.data);
  //     setStatus("Successfully updated!");
  //   } catch (e) {
  //     setStatus("Update Failed: " + e.message);
  //   }
  // };

  const updating = () => {

    setFormValidated(form);
    console.log(formValidated)
  }

  const update = () => {

    return console.log(formValidated);
    // try {
    //   const res = await axios.put(`${API_URL}/update/${state.id}`,
    //     formValidated
    //   )
    // }
    // catch (e) {
    //   console.log("The reason Update failed was of " + e.message);

    // }
  }

  return (
    <>
      <p>hi from Status</p>
      {state.map((value, index) => (
        <div key={index} style={{ display: "flex" }}>
          <p>id :  {value.id}</p>
          <p>State name :  {value.state_name}</p>
          <p>status :  {value.status}</p>
          <button onClick={() => edit(index)}> Edit </button>
          {/* <button onClick={() => deleting(index)}> Delete </button> */}
        </div>
      ))}

      <div className="card flex justify-content-center">
        {/* <Button label="Show" icon="pi pi-external-link" /> */}
        <Dialog header="Header" visible={visible} style={{ width: '50vw' }}
          onHide={() => { if (!visible) return; setVisible(false); }}>
          <input value={form.id} name="id" onChange={formValidate} />
          <input value={form.state_name} name="state_name" onChange={formValidate} />
          <input value={form.status} name="status" onChange={formValidate} />
          {/* <p className="m-0"> id : {form.id}</p>
          <p className="m-0"> id : {form.state_name}</p>
          <p className="m-0"> id : {form.status}</p> */}
          <button onClick={updating}> Update </button>
        </Dialog>
      </div>


      {/* <button onClick={loggingInConsole}> Click </button> */}
    </>
  )
}
export default Status;