import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useMemo, useState } from "react";


const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null);

  const genres = useMemo(() => {
    if (data) {
      const genres = data.allBooks.flatMap(b => b.genres)
      return new Set(genres)
    } else {
      return null;
    }
  }, [data]);

  const booksFiltered = useMemo(() => {
    if (filter) {
      return data?.allBooks.filter(b => b.genres.includes(filter))
    } else {
      return data?.allBooks
    }
  }, [filter, data]);

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
          {booksFiltered.map((a) => (
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
