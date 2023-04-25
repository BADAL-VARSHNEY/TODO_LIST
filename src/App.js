import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(() => {
  const savedData = localStorage.getItem("data")
    return savedData ? JSON.parse(savedData) : [];
  });
  const [isindex, setIsindex] = useState();
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data])

  const mySubmitbtn = (e) => {
    e.preventDefault()

    if (isEditMode) {
      const updatedata = data.map((item, index) => {
        return isindex === index ? input : item
      })
      setData(updatedata)
      setInput('')
      setIsEditMode(false)

    } else {
      setData((item) => {
        const items = [...item, input].reverse()
        setInput('')
        return items
      })
    }
  }

  const removebtn = (index) => {
    const update = data.filter((v, i) => {
      return index !== i
    })
    setData(update)
  }

  const editoptionbtn = (value, index) => {
    setIsEditMode(true);
    setInput(value);
    setIsindex(index)
  }

  return (
    <>
      <div className='container'>
        <div className='input-fiald'>
          <h1>TODO</h1>

          <form action="" onSubmit={mySubmitbtn} >
            <input type="text" placeholder='Todo' value={input} onChange={(e) => setInput(e.target.value)} />
            <input disabled={!input} type="submit" value={isEditMode ? 'Update' : 'Click'} />
          </form>
          <ul className='content'>
            {data.map((value, index) => {
              return (
                <>
                  <div key={index} className='list-style'>
                    <span>
                      <h4>{index + 1}.</h4>
                      <li>{value}</li>
                    </span>
                    <span>
                      <button onClick={() => editoptionbtn(value, index)}>Edit</button> &nbsp; &nbsp;
                      <button type='button' onClick={() => removebtn(index)}>❌</button>
                    </span>
                  </div>
                </>
              )
            })}
          </ul>
          <button disabled={data.length === 0} className='allbtn' onClick={() => setData([])}>Clear all</button>
        </div>
      </div>
    </>
  );

}

export default App;