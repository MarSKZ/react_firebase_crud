import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Read() {
  const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };
  return (
    <div>
      <h1>READ</h1>
      <button onClick={fetchData}>Mostrar Datos</button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition}
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
      </div>{" "}
    </div>
  );
}

export default Read;
