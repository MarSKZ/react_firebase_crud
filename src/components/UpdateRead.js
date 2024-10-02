import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UpdateRead() {
  const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map((myFireId) => {
        return {
          ...myData[myFireId],
          fruitId: myFireId,
        };
      });

      setFruitArray(temporaryArray);
    } else {
      alert("error");
    }
  };

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits/"+fruitIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1>UPDATE READ</h1>
      <button onClick={fetchData}>Mostrar Datos</button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition} : {item.fruitId}
            <button className="button2" onClick={ () => navigate(`/updatewrite/${item.fruitId}`)}>Modificar</button>
            <button className="button3" onClick={ () => deleteFruit(item.fruitId)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="navbar">
        <button className="button1" onClick={() => navigate("/")}>
          INICIO
        </button>
        <br />
        <button className="button1" onClick={() => navigate("/write")}>
          WRITE
        </button>
        <br />
        <button className="button1" onClick={() => navigate("/read")}>
          READ
        </button>
        <br />
        <button className="button1" onClick={() => navigate("/updateread")}>
          UPDATE
        </button>
      </div>
    </div>
  );
}

export default UpdateRead;
