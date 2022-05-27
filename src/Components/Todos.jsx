import React,{useState,useEffect} from 'react'
import styles from './Todos.module.css'
const Todos = () => {
  const [newtodo, setNewtodo] = useState("")
  const [todos, setTodos] = useState([])
   const [page,setPage]=useState(1);
   const[total,setTotal]=useState(0);
   const[limit,setLimit]=useState(0)
    useEffect(() => {
      fetch(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
        .then((res) => res.json())
        .then((res) => {
          setTodos(res)
          setTotal(res.length)
        })
    },[page,limit])
     const saveinfo=()=>{
      fetch("http://localhost:8080/todos",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          value:newtodo,
          isCompleted:false
        })
      })
      .then((res) => res.json())
        .then((res) => {
          setTodos([...todos,res])
          setNewtodo("")
        })
     }
     let onDelete=(id)=>{
       let deletetodo=todos.filter(todo=>todo.id !== id);
       setTodos(deletetodo)
     }
       
  return (
    <div className={styles.con} >
      <h1>TODOS</h1>
      <div>
        <div className={styles.cont1}>
        <input placeholder="write here"className={styles.input}value={newtodo} onChange={({target})=>setNewtodo(target.value)}/>
        <button className={styles.btn}onClick={saveinfo}>+</button>
        </div>
        <button
          disabled={page <= 1}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Prev
        </button>
        <select onChange={(e) => {setLimit(Number(e.target.value))}}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button disabled={total< page*{limit}} onClick={() => setPage(page + 1)}>Next</button>
        {todos.map(todo=>(
          <div className={styles.del} key={todo.id}>{todo.value}
          <button onClick={()=>onDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;