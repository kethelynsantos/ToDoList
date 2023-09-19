import './App.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

// vem geralmente nos arquivos de configuração, que é a forma como vamos acessar a api
const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]); // array de objetos para percorrer e imprimir as tarefas
  const [loading, setLoading] = useState(false); // uma forma de carregar os dados e exibir para o usuario uma mensagem de que os dados estão sendo carregados

  // Load todos on page load
  useEffect(() => {
    // essa função vai usar o fetch api e trazer o dado que eu quero
    const loadData = async () => {

      setLoading(true)
      // eu inicio o load e começo a carregar dados de forma assincrona da api

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      // nesse primeiro then vamos esperar uma res e transforma-la em json, no segundo ele retorna os dados no arry dos objetos

      setLoading(false);

      setTodos(res);
    };

    loadData();
  }, []); // quando o array esta vazio ele é executado quando a pag carrega

  const handleSubmit = async (e) => {
    // deixamos o handlesubmit com uma uma função assincrona pq temos que esperar um aresposta do fetch
    e.preventDefault();

    const todo = {
      // criando um id artificialmente que não é o ideal, mas aqui sera util pois ira criar um id aleatorio para o item
      id: Math.random(),
      title,
      time,
      done: false, // aqui a tarefa já entra como não concluida
    }

    // enviando os dados para a api
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todo]); // é o estado anterior do item que estou trabalhando, assim eu consigo adicionar um item ao estado anterior e gerar um novo estado

    setTitle(""); // para limpar o formulario
    setTime("");
  };

  const handleDelete = (id) => {
    
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
      
    });
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React Todo</h1>
      </div>
      <div className='form-todo'>
        {/* como enviar o formulario pegar esse evento e enviar para o servidor esses dados depois */}
        <h2>Insira a sua próxima tarefa:</h2>
        {/* seria criaando um evento chamad o onSubmit
        on sempre um evento e handle seria geralmente uma função que correnponde ao evento */}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer?</label>
            {/* aqui eu vou ter que captar a mudança desse state usando o onchange
            o e é o evento o target é o input e eu estou colocando no title o valor desse input */}
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Título da tarefa'
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
            {/* colocando um valor igual ao state do input eu crio um control input com isso eu consigo setar o valor dele por meio do settitle de algum lugar modificando o texto, isso me permite limpar o input por ex
            
            esse ou vazio vai fazer com que o valor do input não seja alterado quando a pagina estiver carregando, então estamos dizendo que pode começar com o valor vazio e quando estiver com o valor do title ele troca */}
          </div>
          <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
            <input
              type='text'
              id='time'
              name='time'
              placeholder='Tempo estimado (em horas)'
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type='submit' value='Criar tarefa' />
        </form>
      </div>
      <div className='list-todo'>
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {/* exibindo as tarefas */}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
              {/* arrow function pois tem a possiblidade de executar uma func com argumento. se colocar dessa maneira ele espera o clique para executar e não sai executando */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
