import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from "axios";

import './StateTable.css'

export default function StateTable() {
  const API_URL = "https://webman.co.in/goolok/api/state";

  const [state, setState] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleForAdding, setVisibleForAdding] = useState(false);

  const loggingInConsole = async () => {
    const res = await axios.get(API_URL)
    setState(res.data);
    // console.log(res.data);
  }
  useEffect(() => {
    loggingInConsole()
  }, [])


  const [form, setForm] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const edit = (index) => {
    setIsEditing(!isEditing)
    setForm(state[index]);
    setVisible(true)
  }

  const del = async (id) => {
    console.log(id);

    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      console.log("deleted:", res.data);
      loggingInConsole()
      // setStatus("Successfully updated!");
    } catch (e) {
      console.log("Delete Failed: " + e.message);
    }
  }

  const [formValidated, setFormValidated] = useState([])
  const formValidate = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // useEffect(() => {
  //   setFormValidated(form)
  //   console.log(formValidated);

  // },[formValidated])

  const updating = async (id) => {
    console.log(id);

    setFormValidated(form)
    console.log(formValidated);
    try {
      const res = await axios.put(`${API_URL}/${id}`, formValidated);
      console.log("Updated:", res.data);
      loggingInConsole();
      // setForm([])
      setVisible(false)

      // setStatus("Successfully updated!");
    } catch (e) {
      console.log("Update Failed: " + e.message);
    }
  };
  const [formForAdding, setFormForAdding] = useState({
    id: '',
    state_name: '',
    status: '',
  })
  const [addingToApi, setAddingToApi] = useState([])
  const formValidateForAdd = (e) => {
    const { name, value } = e.target;
    setFormForAdding(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const adding = () => {
    setVisibleForAdding(true)
  }
  const add = () => {
    console.log("hi");
    setAddingToApi(formForAdding);
    try {
      const res = axios.post(API_URL, [addingToApi])
      console.log(res.data);
      loggingInConsole();
      // setFormForAdding([])
      setVisibleForAdding(false);
    }
    catch (e) {
      console.error("couldn't send the data, because of " + e);
    }
  }
  // console.log(addingToApi);


  const forUpdate = (rowData, options) => {
    return (
      <button className="editing-btn" onClick={() => edit(options.rowIndex)}>
        Edit
      </button>
    );
  };

  const forDelete = (rowData, options) => {
    return (
      <button className="delete-btn" onClick={() => del(options.rowIndex)}>
        Delete
      </button>
    );
  };


  return (

    <>

      <button className="adding-btn" onClick={adding}> Add </button>
      <div className="card">
        <DataTable value={state} tableStyle={{ minWidth: '50rem' }}>

          <Column field="id" header="ID" />
          <Column field="state_name" header="State Name" />
          <Column field="status" header="Status" />

          <Column header="Actions" body={forUpdate} />
          <Column header="Actions" body={forDelete} />

        </DataTable>
      </div>


      <div className="cardForPop  justify-content-center" >
        {/* <Button label="Show" icon="pi pi-external-link" /> */}
        <Dialog header={"Edit Form"} visible={visible} style={{ width: '50vw' }}
          onHide={() => { if (!visible) return; setVisible(false); }}>
          <input className="input1" value={form.id} name="id"
            onChange={formValidate} />
          <input className="input2" value={form.state_name} name="state_name" onChange={formValidate} />
          <input className="input3" value={form.status} name="status" onChange={formValidate} />
          {/* <p className="m-0"> id : {form.id}</p>
              <p className="m-0"> id : {form.state_name}</p>
              <p className="m-0"> id : {form.status}</p> */}
          <button className="pop-update-btn" onClick={() => { updating(form.id) }}>Update</button>
        </Dialog>
      </div>


      {/* for the adding sec */}

      <div className="cardForPop justify-content-center" >
        {/* <Button label="Show" icon="pi pi-external-link" /> */}
        <Dialog header={"Add Data"} visible={visibleForAdding} style={{ width: '50vw' }}
          onHide={() => { if (!visibleForAdding) return; setVisibleForAdding(false); }}>
          <input className="input1" value={formForAdding.id} name="id" onChange={formValidateForAdd} />
          <input className="input2" value={formForAdding.state_name} name="state_name" onChange={formValidateForAdd} />
          <input className="input3" value={formForAdding.status} name="status" onChange={formValidateForAdd} />
          {/* <p className="m-0"> id : {form.id}</p>
              <p className="m-0"> id : {form.state_name}</p>
              <p className="m-0"> id : {form.status}</p> */}
          <button className="pop-update-btn" onClick={() => add()}> Add </button>
        </Dialog>
      </div>
    </>
  );
}
