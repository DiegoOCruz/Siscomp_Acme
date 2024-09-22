export default async function BuscaEndereco({cep}) {
    let retorno = {};
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try{
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            retorno = data;
        });
    }
    catch(e){
        console.log(e);
    }
    return retorno;
}