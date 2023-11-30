export const crearTabla = (data)=>
{
    if(!Array.isArray(data)) return null;

    const tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.classList.add("table-danger");
    tabla.classList.add("table-sm");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}
const crearCabecera = (elemento) => 
{
    const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
    headRow.classList.add("table-dark");

    for (const key in elemento) {
        if(key === "id") continue;
        const th = document.createElement("th");
        th.textContent = key.toUpperCase();
        headRow.appendChild(th);
    }
    tHead.appendChild(headRow);

    return tHead;
}
const crearCuerpo = (data)=>
{
    if(!Array.isArray(data)) return null;
    
    const tBody = document.createElement("tbody");

    data.forEach((element,index) => {
        const tr = document.createElement("tr");
        if(index % 2 == 0)
        {
            tr.classList.add("table-active");
        }
        for (const key in element) {
            if(key === "id")
            {
                tr.dataset.id = element[key];
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    });

    return tBody;
}