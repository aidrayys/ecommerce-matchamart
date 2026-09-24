// ARRAY DATA PRODUK

const products = [

{
    id:1,
    name:"Matcha Latte",
    category:"Drink",
    price:28000,
    stock:18,
    description:"Creamy ceremonial matcha with fresh milk.",
    image:"img/matcha.jpg"
},

{
    id:2,
    name:"Strawberry Matcha",
    category:"Drink",
    price:32000,
    stock:10,
    description:"Sweet strawberry blended with premium matcha.",
    image:"img/strawberry.jpg"
},

{
    id:3,
    name:"Iced Americano",
    category:"Drink",
    price:22000,
    stock:15,
    description:"Bold arabica coffee served over ice.",
    image:"img/americano.jpg"
},

{
    id:4,
    name:"Basque Cheesecake",
    category:"Dessert",
    price:35000,
    stock:4,
    description:"Creamy baked cheesecake with caramelized top.",
    image:"img/cheesecake.jpg"
},

{
    id:5,
    name:"Matcha Cookies",
    category:"Dessert",
    price:26000,
    stock:0,
    description:"Crunchy butter cookies infused with matcha.",
    image:"img/cookie.jpg"
},

{
    id:6,
    name:"Matcha Tumbler",
    category:"Merch",
    price:89000,
    stock:7,
    description:"Minimal reusable tumbler for everyday drinks.",
    image:"img/tumbler.jpg"
}

];

// CART

let cart=[];

// FORMAT RUPIAH

function rupiah(number){

    return "Rp " + number.toLocaleString("id-ID");

}

// MENAMPILKAN PRODUK (LOOPING)

function tampilProduk(data){

    const container=document.getElementById("product-list");

    container.innerHTML="";

    if(data.length===0){

        container.innerHTML=`
        <div class="empty">
            <h2>Product Not Found</h2>
            <p>Try another keyword.</p>
        </div>
        `;

        return;

    }

    data.forEach(item=>{

        let status="";
        let warna="";

        if(item.stock===0){

            status="Out of Stock";
            warna="out";

        }
        else if(item.stock<=5){

            status="Limited Stock";
            warna="limited";

        }
        else{

            status="Available";
            warna="available";

        }

        container.innerHTML +=`

        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <div class="content">

                <span class="category">${item.category}</span>

                <h3>${item.name}</h3>

                <p class="desc">${item.description}</p>

                <div class="price">${rupiah(item.price)}</div>

                <div class="stock ${warna}">
                    Stock : ${item.stock} • ${status}
                </div>

                <button
                    onclick="addToCart(${item.id})"
                    ${item.stock===0 ? "disabled" : ""}
                >
                    ${item.stock===0 ? "Sold Out" : "Add to Cart"}
                </button>

            </div>

        </div>

        `;

    });

}

// TAMBAH KERANJANG

function addToCart(id){

    const product=products.find(item=>item.id===id);

    if(product.stock===0) return;

    cart.push(product);

    product.stock--;

    document.getElementById("cart-count").innerText=cart.length;

    applyFilter();

}

// FILTER SEDERHANA

const search=document.getElementById("search");
const category=document.getElementById("category");

search.addEventListener("keyup",applyFilter);
category.addEventListener("change",applyFilter);

function applyFilter(){

    const keyword=search.value.toLowerCase();
    const selected=category.value;

    const result=products.filter(item=>{

        const cocokNama=
        item.name.toLowerCase().includes(keyword);

        const cocokKategori=
        selected==="all" || item.category===selected;

        return cocokNama && cocokKategori;

    });

    tampilProduk(result);

}

// LOAD AWAL

tampilProduk(products);