export function getMonstruos(url,loader)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        axios.get(url)
        .then(({data})=>{
            resolve(data);
        })
        .catch(({message})=>{
            reject(message);
        })
        .finally(()=>{
            loader.classList.add("oculto");
        });
    });
}
export function getMonstruo(url,loader,id)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        axios.get(url + "/" + id)
        .then(({data})=>{
            resolve(data);
        })
        .catch(({message})=>{
            reject(message);
        })
        .finally(()=>{
            loader.classList.add("oculto");
        });
    });
}
export function postMonstruo(url,loader,newMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        axios.post(url, newMonstruo)
        .then(({data})=>{
            resolve(data);
        })
        .catch(({message})=>{
            reject(message);
        })
        .finally(()=>{
            loader.classList.add("oculto");
        });
    });
}
export function deleteMonstruo(url,loader,id)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        axios.delete(url + "/" + id)
        .then(({data})=>{
            resolve(data);
        })
        .catch(({message})=>{
            reject(message);
        })
        .finally(()=>{
            loader.classList.add("oculto");
        });
    });
}
export function updateMonstruo(url,loader,editMonstruo)
{
    return new  Promise(async (resolve, reject)=>{
        loader.classList.remove("oculto");
        axios.put(url + "/" + editMonstruo.id, editMonstruo)
        .then(({data})=>{
            resolve(data);
        })
        .catch(({message})=>{
            reject(message);
        })
        .finally(()=>{
            loader.classList.add("oculto");
        });
    });
}