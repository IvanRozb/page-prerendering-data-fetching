import fs from "fs";
import path from "path";
import Link from "next/link";

export default function Home(props) {
    const { products } = props;

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <Link href={"/products/" + product.id}>
                        {product.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    console.log("Re-(Generating ...");
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    if (!data) {
        return {
            redirect: {
                destination: "no-data",
            },
        };
    }

    if (data.products.length === 0) return { notFound: true };

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}
