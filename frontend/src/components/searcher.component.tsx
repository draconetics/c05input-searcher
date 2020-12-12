import React, { ChangeEvent, useState } from 'react';

const URL = "http://localhost:3005/api/search";

function Searcher() {

  const [list,setList] = useState<any>([]);
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      console.log(e.target.value);
      const urlSearch = URL + "?q=" + e.target.value
      fetch(urlSearch) // Call the fetch function passing the url of the API as a parameter
      .then(function(resp) {
          // Your code for handling the data you get from the API
          //setList(resp.json())
          return resp.json();
      })
      .then((resp)=>{
          setList(resp.data)
      })
      .catch(function(e) {
          // This is where you run code if the server returns any errors
          console.log("error on fetching!!")
          console.log(e);
      });
  }

  return (
    <div className="Searcher">
      <p>Searcher</p>
      <input type="text" onChange={(e)=>handleChange(e)}/>
      <ul>
        {list && list.map((item:any,key:number)=>{
          return <li key={key}>{item._source.name}</li>
        })}
      </ul>
    </div>
  );
}

export default Searcher;