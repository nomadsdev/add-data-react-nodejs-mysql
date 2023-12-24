// App.jsx
import React, { useState } from 'react';

function Content() {
  const [data, setData] = useState({ column1: '', column2: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postData = async () => {
    try {
      const response = await fetch('http://localhost:3001/mytable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('เพิ่มข้อมูลเรียบร้อย', result);
      setData({ column1: '', column2: '' });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล', error);
    }
  };

  return (
    <div>
      <h2 className='h2'>Add Data</h2>
        <div className='addd'>
          <label>Column 1:</label>
          <input
            type="text"
            name="column1"
            value={data.column1}
            onChange={handleChange}
          />
        </div>
        <div className='addd'>
          <label>Column 2:</label>
          <input
            type="text"
            name="column2"
            value={data.column2}
            onChange={handleChange}
          />
        </div>
        <button onClick={postData}>Add Data</button>
    </div>
  );
}

function App() {
  return (
    <div className='home'>
      <div>
      <div className='textheader'>
      <h1>Add Data Nodejs React Mysql</h1>
      </div>
      <div className='contact'>
      <Content />
      </div>
      </div>
    </div>
  );
}

export default App;
