import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function PopUp({ edit }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="card flex justify-content-center">
        <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
        <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
          <p className="m-0"> id : {edit.id}</p>
          <p className="m-0"> id : {edit.state_name}</p>
          <p className="m-0"> id : {edit.status}</p>
        </Dialog>
      </div>


    </>


  )
}
