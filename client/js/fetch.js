export const getMonstruos = (url,loader)=>{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        try
        {
            const res = await fetch(url);
            if(!res.ok)
            {
                throw res;
            }
            const data = await res.json();
            resolve(data) ;
        }
        catch(res)
        {
            reject(`Error ${res.status}: ${res.statusText}`);
        }
        finally
        {
            loader.classList.add("oculto");
        }
    })
}
export function getMonstruo(url,loader,id)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        try
        {
            const res = await fetch(url + "/" + id);
            if(!res.ok)
            {
                throw res;
            }
            const data = await res.json();
            resolve(data);
        }
        catch(res)
        {
            reject(`Error ${res.status}: ${res.statusText}`);
        }
        finally
        {
            loader.classList.add("oculto");
        }
    });
}
export function postMonstruo(url,loader,newMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(newMonstruo),
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => resolve(data))
        .catch((res) => reject(`Error ${res.status}: ${res.statusText}`))
        .finally(()=> loader.classList.add("oculto"));
    });  
}
export function deleteMonstruo(url,loader,id)
{
    return new Promise(async(resolve, reject)=>{

        loader.classList.remove("oculto");
        try
        {
            const res = await fetch(url + "/" + id, { method:"DELETE" })
            if(!res.ok)
            {
                throw res;
            }
            resolve(res);
        }
        catch(res)
        {
            reject(`Error ${res.status}: ${res.statusText}`)
        }
        finally
        {
            loader.classList.add("oculto")
        }
    });
}
export function updateMonstruo(url,loader,updateMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
    
        fetch(url + "/" + updateMonstruo.id, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(updateMonstruo),
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => resolve(data))
        .catch((res) => reject(`Error ${res.status}: ${res.statusText}`))
        .finally(()=> loader.classList.add("oculto"));
    });

}

