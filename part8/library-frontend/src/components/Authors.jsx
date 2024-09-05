
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useEffect, useState } from "react";

const Authors = ({ show }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const [ editAuthor, response ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error);
      setName(authors[0].name);
      setBorn('');
    }
  });

  useEffect(() => {
    if (response?.data?.editAuthor === null) {
      console.log('author not found');
    }
  }, [response]);

  const onSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });
    
    setName(authors[0].name);
    setBorn('');
  };  

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Set birth year</h1>
      <select onChange={(event) => setName(event.target.value)} value={name}>
        {authors.map((a) => (
          <option key={a.name} value={a.name}>{a.name}</option>
        ))}
      </select>
      <br/>
      <label htmlFor="born">born</label>
      <input type="number" value={born} placeholder="born" name="born" onChange={(event) => setBorn(event.target.value)}/>
      <br/>
      <button onClick={onSubmit}>update author</button>
    </div>
  )
}

export default Authors
