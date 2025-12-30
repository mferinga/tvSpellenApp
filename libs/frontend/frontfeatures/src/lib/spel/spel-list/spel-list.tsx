import { useGetAllSpellen } from './spelListHook';

export function SpelList() {
    const { spellen, loading, error } = useGetAllSpellen();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {spellen.map((spel) => (
                <li key={spel.id}>{spel.naam}</li>
            ))}
        </ul>
    );
}


export default SpelList;
