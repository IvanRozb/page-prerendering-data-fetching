import { Fragment } from 'react';
import fs from 'fs';
import path from 'path';

export default function ProductPage(props) {
    const { loadedProduct } = props;

    if (!loadedProduct) return <p>Loading ...</p>;

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.pid;

    const data = getData();

    const product = data.products.find((product) => product.id === productId);

    if (!product)
        return {
            notFound: true,
        };

    return {
        props: {
            loadedProduct: product,
        },
    };
}

export async function getStaticPaths() {
    const data = getData();
    const ids = data.products.map((product) => product.id);

    const pathsWithParams = ids.map((id) => ({
        params: {
            pid: id,
        },
    }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
}
