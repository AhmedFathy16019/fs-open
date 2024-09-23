import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";
import { updateCache } from "../App";

const PersonForm = ({ setError }) => {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const [ createPerson ] = useMutation(CREATE_PERSON, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n');
            setError(messages);
        },
        update: (store, response) => {
            updateCache(store, { query: ALL_PERSONS }, response.data.addPerson)
        }
    });

    const submit = async (event) => {
        event.preventDefault();

        createPerson({ variables: {
                name,
                street,
                city,
                phone: phone.length > 0 ? phone : null,
            }
        })

        setName('');
        setStreet('');
        setCity('');
        setPhone('');
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value) }
                    />
                </div>
                <div>
                    phone
                    <input 
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    street
                    <input
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    city
                    <input
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <button type="submit">add!</button>
            </form>
        </div>
    )
};

export default PersonForm;