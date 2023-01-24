import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage() {
    const [sales, setSales] = useState([]);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(
        "https://nextjs-course-86a6c-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformedSales);
        }
    }, [data]);

    if (error) return <p>Error!</p>;
    if (!data || !sales) return <p>Loading...</p>;

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - %{sale.volume}
                </li>
            ))}
        </ul>
    );
}
