export function getMonstruos(url,loader)
{
    return new  Promise(async (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        loader.classList.remove("oculto");
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);  
                    resolve(data); 
                } 
                else
                {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                } 
                loader.classList.add("oculto");
            }
        };
        xhr.open("GET", url, true);
        try
        {
            xhr.send();
        }
        catch(err)
        {
            reject(err);
        }
    });
}
export function getMonstruo(url,loader,id)
{
    return new  Promise(async (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        loader.classList.remove("oculto");
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);  
                    resolve(data); 
                } 
                else
                {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                } 
                loader.classList.add("oculto");//oculto devuelta el tiempo de carga(el fantasmita)  
            }
        };
        xhr.open("GET", url + `/${id}`, true);
        try
        {
            xhr.send();
        }
        catch(err)
        {
            reject(err);
        }
    });
}
export function postMonstruo(url,loader,newMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        loader.classList.remove("oculto");
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);  
                    resolve(data); 
                } 
                else
                {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                } 
                loader.classList.add("oculto"); 
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        try
        {
            xhr.send(JSON.stringify(newMonstruo));
        }
        catch(err)
        {
            reject(err);
        }
    });
}
export function deleteMonstruo(url,loader,id)
{
    return new  Promise(async (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        loader.classList.remove("oculto");
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);  
                    resolve(data); 
                } 
                else
                {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                } 
                loader.classList.add("oculto");
            }
        };
        xhr.open("DELETE", url + `/${id}`, true);
        try
        {
            xhr.send();
        }
        catch(err)
        {
            reject(err);
        }
    });
}
export function updateMonstruo(url,loader,editMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        loader.classList.remove("oculto");
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const data = JSON.parse(xhr.responseText);  
                    resolve(data); 
                } 
                else
                {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                } 
                loader.classList.add("oculto");
            }
        };
        xhr.open("PUT", url + "/"+ editMonstruo.id, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        try
        {
            xhr.send(JSON.stringify(editMonstruo));
        }
        catch(err)
        {
            reject(err);
        }
    });
}