
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
// import { ProductService } from './service/ProductService';

export default function BasicDemo() {
  const API_URL = "https://webman.co.in/goolok/api/state";

  const [state, setState] = useState([])
  const loggingInConsole = async () => {
    const res = await axios.get(API_URL)
    setState(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    loggingInConsole()
  }, [1])

  return (
    <>
      {/* <button onClick={loggingInConsole}> Click here </button> */}

      <div className="card" >
        {state.map((value, index) => (
          <DataTable value={state} key={index} tableStyle={{ minWidth: '50rem' }}>
            <Column field="code" header="Code">{value.id}</Column>
            <Column field="name" header="state name">{value.state_name}</Column>
            <Column field="status" header="status">{value.status}</Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>

        ))}
      </div>


      {/* <div className="cardd">
        <DataTable value={rows} tableStyle={{ minWidth: "50rem" }}>
          {rows.length > 0 &&
            Object.keys(rows[0]).map((key) => (
              <Column key={key} field={key} header={key} />
            ))}

          <Column header="Actions" body={editTemplate} />
        </DataTable>
      </div> */}
    </>



  );
}
