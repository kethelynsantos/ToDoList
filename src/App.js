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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(title);

    setTitle(""); // para limpar o formulario

    console.log("Enviou!");
  };

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
            {/* esse ou vazio vai fazer com que o valor do input não seja alterado quando a pagina estiver carregando, então estamos dizendo que pode começar com o valor vazio e quando estiver com o valor do title ele troca */}
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
      </div>
    </div>
  );
}

export default App;
