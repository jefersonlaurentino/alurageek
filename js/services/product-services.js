const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .catch((erro) => console.log(erro));
};

const createProducts = ( name , price, image ) =>{
    return fetch("http://localhost:3000/products" , {
        method: "POST",
        headers: {
            "content-type": "application/josn",
        },
        body: JSON.stringify({
            name,
            image,
            price
        })
    })
    .then((res) =>res.json())
    .catch((erro)=> console.log(erro));
}

const deleteProducts = (id) =>{
    fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE",
    })
}

export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts
}