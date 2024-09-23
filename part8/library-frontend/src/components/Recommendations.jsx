import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show }) => {
    const { loading, data } = useQuery(ME);
    const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS, {
        variables: { genre: data?.me?.favoriteGenre },
        skip: !data,
    });

    if (!show) {
        return null;
    }

    if (loading) {
        return <div>Getting user data ...</div>;
    }

    if (data.me === null) {
        return <div>Log in to see recommendations</div>;
    }

    if (loadingBooks) {
        return <div>Getting your favorite books data ...</div>;
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre: {data.me.favoriteGenre}</p>

            {
                dataBooks.allBooks.length === 0
                ? <div>No books in your favorite genre</div>
                :<table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Author Name</th>
                            <th>Published</th>
                        </tr>
                        {dataBooks.allBooks.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Recommendations;