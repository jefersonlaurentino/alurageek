import { servicesProducts } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

const productContainer = document.querySelector("[data-product]");

function createElement(name, price , image, id) {
    const card = document.querySelector('.card').cloneNode(true);
    card.classList.remove('hidden');
    card.querySelector('img').src = image;
    card.querySelector('h3').innerHTML = name;
    card.querySelector('.preco').innerHTML = price;
    card.querySelector('.clear').setAttribute("data-id",id);
    productContainer.appendChild(card);
    deleteproduct()
    return card;
}

const render = async () =>{
    try {
        const listProduct = await servicesProducts.productList();
        listProduct.forEach((product) => {
            productContainer.appendChild(
                createElement(product.name, product.price, product.image, product.id)
            )
        });
    } catch (error) {
        console.log(error);
        alertMsg()
    }
}

const alertMsg = () =>{
    const div = document.createElement("div")
    div.setAttribute("id","alert")
    div.setAttribute("class","bg-white w-full my-8 flex rounded-lg justify-center items-center text-3xl text-red-600 font-bold")
    const title = document.createElement("h5")
    title.innerHTML = 'ERRO! API desativada ative o terminal na pasta index do projeto e escreva no terminal > <span style="color:black;">npm start</span>'

    div.appendChild(title)
    productContainer.appendChild(div)
}

form.addEventListener("submit", (even) =>{
    even.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price , image).then(res => console.log(res)).catch((error) => console.log(error))
})

const deleteproduct = () => {
    const deletePro = document.querySelectorAll(".clear");
    deletePro.forEach((e) => e.addEventListener("click",(e)=>{
        servicesProducts.deleteProducts(e.target.parentNode.dataset.id)
    }))
} 



render();