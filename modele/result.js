//permets de simuler une base de données
const results = [
    {id: 1, idTest:1 ,value:10, note: "limite limite", idPupil:1},
    {id: 2, idTest:2 ,value:6, note: "vraiment pas top", idPupil:1},
    {id: 3, idTest:3 ,value:8, note: "pas top", idPupil:1}
]

module.exports.getResult = (id) => {
    const resultats = results.filter(p => p.id === id);
    if(resultats.length > 0){
        return resultats[0];
    } else {
        throw new Error("Aucun produit trouvé");
    }
}

module.exports.postResult = (id, idTest, value,note,idPupil) => {
    produits.push({
        id,
        idTest,
        value,
        note,
        idPupil
    });
    return true;
}

module.exports.updateResult = (id, idTest,value,note,idPupil) => {
    for(let i = 0; i < results.length; i++){
        if(results[i].id === id){
            results[i].idTest = idTest;
            results[i].value = value;
            results[i].note = note;
            results[i].idPupil = idPupil;
            return true;
        }
    }
    return false;
}

module.exports.deleteResult = (id) => {
    for (let i = 0; i < results.length; i++){
        if(results[i].id === id){
            results.splice(i, 1);
            return true;
        }
    }
    return true;
}