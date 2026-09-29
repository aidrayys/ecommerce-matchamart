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

// KONFIGURASI CUSTOMIZATION BERDASARKAN KATEGORI

const CUSTOMIZATION_CONFIG = {

    Drink:{
        groups:[
            {
                name:"sugar",
                label:"Sugar Level",
                options:["Normal Sugar","Less Sugar","No Sugar"],
                default:"Normal Sugar"
            },
            {
                name:"ice",
                label:"Ice Level",
                options:["Normal Ice","Less Ice","No Ice"],
                default:"Normal Ice"
            }
        ]
    },

    Dessert:{
        groups:[
            {
                name:"topping",
                label:"Topping",
                options:["No Topping","Ice Cream","Almond"],
                default:"No Topping"
            }
        ]
    },

    Merch:{
        groups:[
            {
                name:"color",
                label:"Color",
                options:["Green","Pink"],
                default:"Green"
            }
        ]
    }

};

// CART

let cart=[];

// MODAL STATE

let modalProduct=null;
let modalQuantity=1;

// FORMAT RUPIAH

function rupiah(number){

    return "Rp " + number.toLocaleString("id-ID");

}

// STATUS STOCK

function getStockStatus(stock){

    if(stock===0){
        return { status:"Out of Stock", color:"out" };
    }
    if(stock<=5){
        return { status:"Limited Stock", color:"limited" };
    }
    return { status:"Available", color:"available" };

}

// MENAMPILKAN PRODUK

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

        const { status, color }=getStockStatus(item.stock);
        const btnText=item.stock===0 ? "Sold Out" : "Add to Cart";

        container.innerHTML +=`

        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <div class="content">

                <span class="category">${item.category}</span>

                <h3>${item.name}</h3>

                <p class="desc">${item.description}</p>

                <div class="price">${rupiah(item.price)}</div>

                <div class="stock ${color}">
                    Stock : ${item.stock} • ${status}
                </div>

                <button
                    class="add-to-cart-btn"
                    data-id="${item.id}"
                    ${item.stock===0 ? "disabled" : ""}
                >
                    ${btnText}
                </button>

            </div>

        </div>

        `;

    });

}

// EVENT DELEGATION UNTUK TOMBOL ADD TO CART DI PRODUCT LIST

document.getElementById("product-list").addEventListener("click",function(e){

    const btn=e.target.closest(".add-to-cart-btn");

    if(!btn || btn.disabled) return;

    openCustomizationModal(parseInt(btn.dataset.id));

});

// FILTER SEDERHANA

const searchInput=document.getElementById("search");
const categorySelect=document.getElementById("category");

searchInput.addEventListener("keyup",applyFilter);
categorySelect.addEventListener("change",applyFilter);

function applyFilter(){

    const keyword=searchInput.value.toLowerCase();
    const selected=categorySelect.value;

    const result=products.filter(item=>{

        const cocokNama=item.name.toLowerCase().includes(keyword);
        const cocokKategori=selected==="all" || item.category===selected;

        return cocokNama && cocokKategori;

    });

    tampilProduk(result);

}

// ELEMENT MODAL CUSTOMIZATION

const modalOverlay=document.getElementById("customization-modal");
const modalImage=document.getElementById("modal-image");
const modalName=document.getElementById("modal-name");
const modalPrice=document.getElementById("modal-price");
const modalCategory=document.getElementById("modal-category");
const modalOptions=document.getElementById("modal-options");
const modalQtyInput=document.getElementById("modal-qty");
const modalQtyMinus=document.getElementById("modal-qty-minus");
const modalQtyPlus=document.getElementById("modal-qty-plus");
const modalStockInfo=document.getElementById("modal-stock-info");
const modalAdd=document.getElementById("modal-add");
const modalCancel=document.getElementById("modal-cancel");
const modalClose=document.getElementById("modal-close");

// BUKA MODAL CUSTOMIZATION

function openCustomizationModal(productId){

    const product=products.find(item=>item.id===productId);

    if(!product || product.stock===0) return;

    modalProduct=product;
    modalQuantity=1;

    modalImage.src=product.image;
    modalImage.alt=product.name;
    modalName.textContent=product.name;
    modalPrice.textContent=rupiah(product.price);
    modalCategory.textContent=product.category;

    renderCustomizationOptions(product);
    updateModalQuantityDisplay();

    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden","false");

}

// TUTUP MODAL CUSTOMIZATION

function closeCustomizationModal(){

    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden","true");

    modalProduct=null;
    modalQuantity=1;

}

// RENDER OPSI CUSTOMIZATION BERDASARKAN KATEGORI

function renderCustomizationOptions(product){

    modalOptions.innerHTML="";

    const config=CUSTOMIZATION_CONFIG[product.category];

    if(!config || !config.groups) return;

    config.groups.forEach(group=>{

        const groupDiv=document.createElement("div");
        groupDiv.className="option-group";

        const label=document.createElement("div");
        label.className="option-label";
        label.textContent=group.label;
        groupDiv.appendChild(label);

        const list=document.createElement("div");
        list.className="option-list";

        group.options.forEach((opt,index)=>{

            const inputId=`opt-${group.name}-${index}`;
            const checked=opt===group.default ? "checked" : "";

            list.innerHTML +=`
                <input type="radio" name="${group.name}" id="${inputId}" value="${opt}" ${checked}>
                <label for="${inputId}">${opt}</label>
            `;

        });

        groupDiv.appendChild(list);
        modalOptions.appendChild(groupDiv);

    });

    // Additional Notes
    const notesDiv=document.createElement("div");
    notesDiv.className="option-group";
    notesDiv.innerHTML=`
        <div class="option-label">Additional Notes</div>
        <textarea id="modal-notes" class="modal-notes" placeholder="e.g. Less sweet, straw separate"></textarea>
    `;

    modalOptions.appendChild(notesDiv);

}

// UPDATE TAMPILAN QUANTITY DI MODAL

function updateModalQuantityDisplay(){

    modalQtyInput.value=modalQuantity;
    modalQtyMinus.disabled=modalQuantity<=1;
    modalQtyPlus.disabled=modalQuantity>=modalProduct.stock;
    modalStockInfo.textContent=`Available stock: ${modalProduct.stock}`;

}

// QUANTITY HANDLER DI MODAL

modalQtyMinus.addEventListener("click",function(){

    if(modalQuantity>1){
        modalQuantity--;
        updateModalQuantityDisplay();
    }

});

modalQtyPlus.addEventListener("click",function(){

    if(modalQuantity<modalProduct.stock){
        modalQuantity++;
        updateModalQuantityDisplay();
    }

});

// TUTUP MODAL MELALUI TOMBOL DAN OVERLAY

modalClose.addEventListener("click",closeCustomizationModal);
modalCancel.addEventListener("click",closeCustomizationModal);

modalOverlay.addEventListener("click",function(e){

    if(e.target===modalOverlay){
        closeCustomizationModal();
    }

});

document.addEventListener("keydown",function(e){

    if(e.key==="Escape" && modalOverlay.classList.contains("open")){
        closeCustomizationModal();
    }

});

// AMBIL DATA CUSTOMIZATION DARI MODAL

function getCustomizationData(){

    const data={
        sugar:null,
        ice:null,
        topping:null,
        color:null,
        notes:""
    };

    if(!modalProduct) return data;

    const config=CUSTOMIZATION_CONFIG[modalProduct.category];

    if(config && config.groups){

        config.groups.forEach(group=>{

            const selected=document.querySelector(`input[name="${group.name}"]:checked`);
            data[group.name]=selected ? selected.value : group.default;

        });

    }

    const notesEl=document.getElementById("modal-notes");
    data.notes=notesEl ? notesEl.value.trim() : "";

    return data;

}

// GENERATE KEY UNTUK IDENTITAS CART ITEM

function generateCartItemKey(productId,customization){

    return `${productId}|sugar:${customization.sugar}|ice:${customization.ice}|topping:${customization.topping}|color:${customization.color}|notes:${customization.notes}`;

}

// TAMBAH PRODUK CUSTOMIZED KE CART

function addCustomizedProductToCart(){

    if(!modalProduct) return;

    if(modalQuantity<1 || modalQuantity>modalProduct.stock){
        alert("Invalid quantity.");
        return;
    }

    const customization=getCustomizationData();
    const key=generateCartItemKey(modalProduct.id,customization);

    const existing=cart.find(item=>item.key===key);

    if(existing){
        existing.quantity += modalQuantity;
    }
    else{

        cart.push({
            id:modalProduct.id,
            name:modalProduct.name,
            price:modalProduct.price,
            image:modalProduct.image,
            quantity:modalQuantity,
            customization:customization,
            key:key
        });

    }

    modalProduct.stock -= modalQuantity;

    updateCartCounter();
    applyFilter();
    renderCart();
    closeCustomizationModal();

}

modalAdd.addEventListener("click",addCustomizedProductToCart);

// ELEMENT CART PANEL

const cartTrigger=document.getElementById("cart-trigger");
const cartOverlay=document.getElementById("cart-overlay");
const cartClose=document.getElementById("cart-close");
const cartBody=document.getElementById("cart-body");
const cartTotal=document.getElementById("cart-total");
const checkoutBtn=document.getElementById("checkout-btn");

// UPDATE CART COUNTER

function updateCartCounter(){

    const totalQty=cart.reduce((sum,item)=>sum+item.quantity,0);
    document.getElementById("cart-count").textContent=totalQty;

}

// BUKA CART PANEL

function openCartPanel(){

    renderCart();
    cartOverlay.classList.add("open");
    cartOverlay.setAttribute("aria-hidden","false");

}

// TUTUP CART PANEL

function closeCartPanel(){

    cartOverlay.classList.remove("open");
    cartOverlay.setAttribute("aria-hidden","true");

}

cartTrigger.addEventListener("click",openCartPanel);
cartTrigger.addEventListener("keydown",function(e){
    if(e.key==="Enter" || e.key===" "){
        e.preventDefault();
        openCartPanel();
    }
});
cartClose.addEventListener("click",closeCartPanel);

cartOverlay.addEventListener("click",function(e){

    if(e.target===cartOverlay){
        closeCartPanel();
    }

});

document.addEventListener("keydown",function(e){

    if(e.key==="Escape" && cartOverlay.classList.contains("open")){
        closeCartPanel();
    }

});

// FORMAT BARIS CUSTOMIZATION

function formatCustomizationLine(item){

    const c=item.customization;
    const parts=[];

    if(c.sugar) parts.push(c.sugar);
    if(c.ice) parts.push(c.ice);
    if(c.topping) parts.push(c.topping);
    if(c.color) parts.push(c.color);

    return parts.join(" • ");

}

// ESCAPE HTML UNTUK CATATAN

function escapeHtml(text){

    const div=document.createElement("div");
    div.textContent=text;
    return div.innerHTML;

}

// RENDER CART PANEL

function renderCart(){

    cartBody.innerHTML="";

    if(cart.length===0){

        cartBody.innerHTML=`<div class="cart-empty"><p>Your cart is empty.</p></div>`;
        cartTotal.textContent=rupiah(0);
        return;

    }

    cart.forEach(item=>{

        const optionsLine=formatCustomizationLine(item);
        const notesLine=item.customization.notes ? `Notes: ${escapeHtml(item.customization.notes)}` : "";
        const subtotal=calculateSubtotal(item);

        cartBody.innerHTML +=`

        <div class="cart-item" data-key="${item.key}">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-details">

                <div class="cart-item-name">${item.name}</div>

                <div class="cart-item-options">${optionsLine}</div>

                ${notesLine ? `<div class="cart-item-notes">${notesLine}</div>` : ""}

                <div class="cart-item-actions">

                    <div class="quantity-selector">
                        <button type="button" class="qty-btn cart-qty-minus" data-key="${item.key}" aria-label="Decrease quantity">−</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button type="button" class="qty-btn cart-qty-plus" data-key="${item.key}" aria-label="Increase quantity">+</button>
                    </div>

                    <button type="button" class="remove-btn" data-key="${item.key}">Remove</button>

                </div>

                <div class="cart-item-row" style="margin-top:8px;">
                    <div class="cart-item-price">${rupiah(subtotal)}</div>
                </div>

            </div>

        </div>

        `;

    });

    cartTotal.textContent=rupiah(calculateCartTotal());

}

// HITUNG SUBTOTAL DAN TOTAL

function calculateSubtotal(item){

    return item.price * item.quantity;

}

function calculateCartTotal(){

    return cart.reduce((sum,item)=>sum+calculateSubtotal(item),0);

}

// EVENT DELEGATION UNTUK TOMBOL QUANTITY DAN REMOVE DI CART

cartBody.addEventListener("click",function(e){

    const minusBtn=e.target.closest(".cart-qty-minus");
    const plusBtn=e.target.closest(".cart-qty-plus");
    const removeBtn=e.target.closest(".remove-btn");

    if(minusBtn){
        updateCartQuantity(minusBtn.dataset.key,-1);
    }
    else if(plusBtn){
        updateCartQuantity(plusBtn.dataset.key,1);
    }
    else if(removeBtn){
        removeFromCart(removeBtn.dataset.key);
    }

});

// UPDATE QUANTITY CART ITEM

function updateCartQuantity(key,delta){

    const item=cart.find(i=>i.key===key);
    if(!item) return;

    const product=products.find(p=>p.id===item.id);
    if(!product) return;

    if(delta>0){

        if(product.stock<=0) return;

        item.quantity++;
        product.stock--;

    }
    else{

        if(item.quantity<=1){
            removeFromCart(key);
            return;
        }

        item.quantity--;
        product.stock++;

    }

    updateCartCounter();
    applyFilter();
    renderCart();

}

// HAPUS ITEM DARI CART

function removeFromCart(key){

    const index=cart.findIndex(i=>i.key===key);
    if(index===-1) return;

    const item=cart[index];
    const product=products.find(p=>p.id===item.id);

    if(product){
        product.stock += item.quantity;
    }

    cart.splice(index,1);

    updateCartCounter();
    applyFilter();
    renderCart();

}

// CHECKOUT

checkoutBtn.addEventListener("click",function(){

    alert("Checkout feature coming soon.");

});

// LOAD AWAL

tampilProduk(products);
