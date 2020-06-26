
function calculos(ckt){

    let bitola = searchCable(ckt);
    let corr_nom = []
    let DJ = []

    //Problemas aqui <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    for (i=0;i<corrente_nominal.length;i++){
        console.log('geral : ', corrente_nominal[i].secao, bitola)
        if (corrente_nominal[i].secao >= bitola){
            console.log('entrou na corrente:', corrente_nominal[i].secao, bitola)
            corr_nom.push(corrente_nominal[i].capacidade_cond) //encontrar corrente nominal
        }

    }
   
    //evitar não entrar na tabela por ser menor que 9A
    if(corr_nom[0] <= 20){
        corr_nom.push(10)
    }
    //---------------
    console.log('>>corrente: ', corr_nom[0])

    for (i=0;i<lista_DJ.length;i++){
        console.log('>>>>>>>>> lista DJ', lista_DJ[i], corr_nom[0])
        if (lista_DJ[i] < 12){
            DJ.push(10) //encontrar DJ
            console.log('entrou lista DJ <', lista_DJ[i], corr_nom[0])
        }
        else if (lista_DJ[i] > corr_nom[0]){
            DJ.push(lista_DJ[i]) //encontrar DJ
            console.log('entrou lista DJ >', lista_DJ[i], corr_nom[0])
        }
    }
  
    //evitar não entrar na tabela por ser menor que 9A __
    let ct = ((ckt.qtCKT * ckt.powerVA) / ckt.tensVa)
    if (ct < 10){
        ct = 10
    }
    //---------------

    let list_calc = {
        cargaTotal: (ckt.qtCKT * ckt.powerVA),
        corrTotal: ct,
        secaoCondutor: bitola,
        corrNom : Math.round(corr_nom[0]),
        dj : DJ[0]
    }

    return list_calc;
}

function searchCable(ckt){ //Encontrar seção do cabo

    let corr_total = Math.round(((ckt.qtCKT * ckt.powerVA) / ckt.tensVa))
    if (corr_total < 10){
        corr_total = 10
    }

    tabela36 = `${ckt.arrangCable}_${ckt.nPolos}`

    let table_calbe;

    if (tabela36 == 'B1_2'){
        table_calbe = B1_2 //B1_2 vem da tabela36
    }
    else if(tabela36 == 'B1_3'){

        table_calbe = B1_3
    }
    else if(tabela36 == 'B2_2'){
        table_calbe = B2_2
    }
    else if(tabela36 == 'B2_3'){
        table_calbe = B2_3
    }
    else{
        console.log('Ops')
    }
    
    let new_cable = []

    for (i=0;i<table_calbe.length;i++){
        if (table_calbe[i][tabela36] < Math.round(corr_total)){
            new_cable.push(table_calbe[i].Cabo)
        }    
    }

    let cable = new_cable[new_cable.length - 1]

    let tipo = document.getElementById('id_r_type_circuit').value

    if (cable <= 1.5 && tipo == 'Iluminacao'){
        cable = 1.5
        //console.log('result:', cable)
    }
    else if (cable <= 1.5 && tipo != "Iluminacao"){
        cable = 2.5
        //console.log('result:', cable)
    }
    else if (cable > 2.5 && tipo != "Iluminacao"){
        cable = cable 
        //console.log('result:', cable)
    }

    return cable

}
