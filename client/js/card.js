const crearCard = (data)=>
{
    if(!Array.isArray(data)) return null;
    const fragmento = document.createDocumentFragment();
    data.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("card")
        for (const key in element) {
            if(key === "id")
            {
                div.dataset.id = element[key];
            }
            else if(key === "alias")
            {
                const h3 = document.createElement("h3");
                h3.style.order=-1;
                h3.textContent = `${key}: ${element[key]}`;
                div.appendChild(h3);
            }
            else
            {
                const p = document.createElement("p");
                p.textContent = `${key}: ${element[key]}`;
                div.appendChild(p);
            }
        }
        fragmento.appendChild(div);
    });
    return fragmento;
}

const crearCardBoostrap = (data)=>
{
    console.log("1");
    if(!Array.isArray(data)) return null;
    const fragmento = document.createDocumentFragment();
    data.forEach((element) => {
        const div1 = document.createElement("div");
        div1.classList.add("col-12");
        div1.classList.add("col-md-6");
        div1.classList.add("col-lg-4");
        const div2 = document.createElement("div");
        div2.classList.add("card");
        const div3 = document.createElement("div");
        div3.classList.add("card-body");
        const imgCard = document.createElement("img");
        imgCard.classList.add("card-img-top");
        imgCard.classList.add("imagenesCards");

        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(imgCard);
        
        for (const key in element) {
            if(key === "id")
            {
                div2.dataset.id = element[key];
            }
            else if(key === "alias")
            {
                const h3 = document.createElement("h3");
                h3.style.order=-1;
                h3.textContent = `${key}: ${element[key]}`;
                h3.classList.add("card-title");
                div3.insertBefore(h3, div3.firstChild);
            }
            else
            {
                const p = document.createElement("p");
                p.textContent = `${key}: ${element[key]}`;
                p.classList.add("card-text");
                div3.appendChild(p);
            }
            if(key==="tipo")
            {
                switch(element[key])
                {
                    case "Esqueleto":
                        imgCard.src = "../assets/esqueleto.png";
                        break;
                    case "Zombie":
                        imgCard.src = "../assets/zombie.png";
                        break;
                    case "Vampiro":
                        imgCard.src = "../assets/vampiro.png";
                        break;
                    case "Fantasma":
                        imgCard.src = "../assets/fantasma.png";
                        break;
                    case "Bruja":
                        imgCard.src = "../assets/bruja.png";
                        break;
                    case "Hombre lobo":
                        imgCard.src = "../assets/hombrelobo.png";
                        break;
                    default:
                        imgCard.src = "#";
                        break;
                }
            }
        }
        fragmento.appendChild(div1);
    });
    
    return fragmento;
}

export const actualizarCard =  (divContainer, data) =>
{
    while(divContainer.hasChildNodes()){
        divContainer.removeChild(divContainer.firstElementChild);
    }
    divContainer.appendChild(crearCardBoostrap(data));
}