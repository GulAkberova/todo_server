import axios from "axios";
import React, { useEffect, useState } from "react";
import { agent, BASE_URL } from "../api/agent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Todo() {
  const [value, setValue] = useState("");
  const [all, setAll] = useState([]);
  const [update, setUpdate] = useState({
    _id: undefined,
    text: "",
  });
  const handleAdd = () => {
    const data = {
      text: value,
    };
    agent.getByPost(BASE_URL, data).then((res) => {
      agent.getAll(BASE_URL).then((res) => {
        setAll(res);
      });
    });
  };
  const handleDelete = (id) => {
    agent.getByDelete(BASE_URL, id).then((res) => {
     
      agent.getAll(BASE_URL).then((res) => {
        setAll(res);
      });
    });
  };

  useEffect(() => {
    agent.getAll(BASE_URL).then((res) => {
      setAll(res);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handUpdate = (item) => {
       setUpdate({
      id: item._id,
      text: item.text,
    });
    handleOpen()
    console.log(update,item._id)
   
  };

  const handlePut=()=>{
    console.log('update',update.id);
    let id=update.id
    agent.getByPut(BASE_URL,id,update).then(res=>{
      agent.getAll(BASE_URL).then((res) => {
        setAll(res);
      });
      handleClose()
      
    })

  }
  return (
    <>
      <div className="todo_bigdiv">
        <div className="todo_minidiv">
          <h2>Todo-App-Full</h2>
          <div className="todo_add_div">
            <input
              type={"text"}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Text add"
            />
            <button onClick={handleAdd}>Add</button>
          </div>
          <div className="todo_get_div">
            {all &&
              all.map((index, key) => (
                <div className="todo_div" key={key}>
                  {index.text}
                  <div className="todo_div_btns">
                    <button onClick={() => handleDelete(index._id)}>
                      Delete
                    </button>
                    <button onClick={() => handUpdate(index)}>Update</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {update && <input type={"text"}  value={update.text} onChange={(e)=>setUpdate((prevState)=>{
              return{
                ...prevState,
                text:e.target.value
              }
            })}/>}
            <button onClick={()=>handlePut()}>Updatde</button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Todo;
