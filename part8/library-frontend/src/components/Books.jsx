import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useMemo, useState } from "react";


const Books = ({ show }) => {
  const [filter, setFilter] = useState(null);

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: filter ? { genre: filter } : {},
  });

  const genres = useMemo(() => {
    if (data) {
      const genres = data.allBooks.flatMap(b => b.genres)
      return new Set(genres)
    } else {
      return null;
    }
  }, [data]);

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author Name</th>
            <th>Published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {
          [...genres].map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)
        }
        <button onClick={() => setFilter(null)}>All</button>
      </div>
    </div>
  )
}

export default Books
