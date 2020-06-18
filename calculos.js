
function calculos(ckt){

    let bitola = searchCable(ckt);
    let corr_nom; 
    let DJ = []

    for (i=0;i<corrente_nominal.length;i++){
        if (corrente_nominal[i].secao == bitola){
            corr_nom = corrente_nominal[i].capacidade_cond //encontrar corrente nominal
        }else{
            corr_nom = 10
        }
    }

    //evitar não entrar na tabela por ser menor que 9A
    if(corr_nom < 10){
        corr_nom = 10
    }
    //---------------

    for (i=0;i<lista_DJ.length;i++){
        if (lista_DJ[i] > corr_nom){
            DJ.push(lista_DJ[i]) //encontrar DJ
        }
    }

    //evitar não entrar na tabela por ser menor que 9A
    let ct = ((ckt.qtCKT * ckt.powerVA) / ckt.tensVa)
    if (ct < 10){
        ct = 10
    }
    //---------------

    let list_calc = {
        cargaTotal: (ckt.qtCKT * ckt.powerVA),
        corrTotal: ct,
        secaoCondutor: bitola,
        corrNom : Math.round(corr_nom),
        dj : DJ[0]
    }

    return list_calc;
}

function searchCable(ckt){ //Encontrar seção do cabo

    let corr_total = ((ckt.qtCKT * ckt.powerVA) / ckt.tensVa)
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

    if (cable <= 1.5 && tipo == 'Iluminação'){
        cable = 1.5
        //console.log('result:', cable)
    }
    else if (cable <= 1.5 && tipo != "Iluminação"){
        cable = 2.5
        //console.log('result:', cable)
    }

    return cable

}
