    // Redireciona o usuário para a página da DevMedia após cinco segundos
   /*  setTimeout(function() {
        window.location.href = "http://www.devmedia.com.br";
    }, 5000); */
    //window.location.href = "home.html";

//});

var db = openDatabase('myDB', '2.0', 'Mybase', 1024);

//=======================================================


function createDbCircuit(){    

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS circuit (id INTEGER PRIMARY KEY, projeto TEXT, local TEXT, tipo_ckt TEXT, tens_va INTEGER, qt_ckt INTEGER, power_va INTEGER, carga_total INTEGER, corr_total INTEGER, comp_ckt INTEGER, secao_condutor INTEGER, qd_tens_perm INTEGER, n_polos INTEGER, arrang_cable TEXT, corr_nom INTEGER, dj TEXT)");
    });
 
} 

function addCircuit(){

    let form = document.querySelector("#form-adiciona");
    //Ler formulário
    let ckt = obtemCKTFormulario(form);

    //searchCable(ckt)
    
    let calc = calculos(ckt);

    createDbCircuit();
    addData(ckt, calc);

    form.reset();

    setTimeout(function() {
        window.location.href = "home-ckt.html";
    }, 1000); 

}

function obtemCKTFormulario(form) {

    var ckt = {
        projeto: form.id_r_project.value, //PROJETO
        local: form.id_r_local.value, //LOCAL
        tipoCKT: form.id_r_type_circuit.value, //TIPO
        tensVa: form.id_r_tension.value, //TENSAO_VA
        qtCKT: form.r_numbers_points.value, //QUANT
        powerVA: form.id_r_power_va.value, //POTENCIA_TOTAL
        compCKT: form.id_r_circuit_length.value, //COMP_CKT
        //qdTensPerm: form.id_r_volt_drop_allow.value, //QUEDA_TENSAO
        nPolos: form.id_r_numero_polos.value, //N_DE_POLOS
        arrangCable: form.id_r_arrang_cable.value, //N_DE_POLOS
    }
    console.log('==========',ckt)
    return ckt;
}

function addData(ckt, calc){

    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO circuit (projeto, local, tipo_ckt, tens_va, qt_ckt, power_va, carga_total, corr_total, comp_ckt, secao_condutor, qd_tens_perm, n_polos, arrang_cable, corr_nom, dj) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ckt.projeto, ckt.local, ckt.tipoCKT, ckt.tensVa, ckt.qtCKT, Math.round(ckt.powerVA), Math.round(calc.cargaTotal), Math.round(calc.corrTotal), ckt.compCKT, calc.secaoCondutor, calc.qdTensPerm, ckt.nPolos, ckt.arrangCable, Math.round(calc.corrNom), calc.dj]);
    });
}

//==================================
function chamaThead(){

    var cabecalho = document.createElement('thead');
    
    var dados = '<th scope="col"><a href="create-ckt.html"><i class="fas fa-plus"></i></a></th>\
                <th scope="col">LOCAL</th>\
                <th scope="col">TIPO</th>\
                <th scope="col">TENSÃO (VA)</th>\
                <th scope="col">QUANT.</th>\
                <th scope="col">POTÊNCIA (VA)</th>\
                <th scope="col">TOTAL (VA)</th>\
                <th scope="col">CORRENTE (VA)</th>\
                <th scope="col">COMP. CKT</th>\
                <th scope="col">SEÇÃO CONDUTOR</th>\
                <th scope="col">QUEDA TENSÃO PERMITIDA(%)</th>\
                <th scope="col">Nº DE POLOS</th>\
                <th scope="col">ORGANIZAÇÃO DE CABOS</th>\
                <th scope="col">CORRENTE NOMINAL</th>\
                <th scope="col">DJ USUAL</th>\
                <th scope="col"></th>'
  
    cabecalho.innerHTML = dados;
    cabecalho.classList.add('thead-dark');
    return cabecalho
}

function readDB(){

    let url = window.location.href
    let _id = url.split("?")[1];

    let id_proj;

    db.transaction(function (tx){
        tx.executeSql('SELECT name_proj FROM cria_proj where id=?', [_id], function (tx, resultado){
        let rows = resultado.rows

        for (i=0;i<rows.length;i++){
            id_proj = rows[i].name_proj
            console.log('<<id_proj: ', id_proj)
        }

        //----------------------------------
        
        let table_circuit = document.querySelector('h3')
        let tabela = document.createElement('table')
 
        cabecalho = chamaThead();

        //-----------------
        var cabecalho = document.createElement('thead');
            
            var dados = `<th scope="col"><a href="create-ckt.html?${id_proj}"><i class="fas fa-plus"></i></a></th>\
                        <th scope="col">LOCAL</th>\
                        <th scope="col">TIPO</th>\
                        <th scope="col">TENSÃO (VA)</th>\
                        <th scope="col">QUANT.</th>\
                        <th scope="col">POTÊNCIA (VA)</th>\
                        <th scope="col">TOTAL (VA)</th>\
                        <th scope="col">CORRENTE (VA)</th>\
                        <th scope="col">COMP. CKT</th>\
                        <th scope="col">SEÇÃO CONDUTOR</th>\
                        <th scope="col">QUEDA TENSÃO PERMITIDA(%)</th>\
                        <th scope="col">Nº DE POLOS</th>\
                        <th scope="col">ORGANIZAÇÃO DE CABOS</th>\
                        <th scope="col">CORRENTE NOMINAL</th>\
                        <th scope="col">DJ USUAL</th>\
                        <th scope="col"></th>`
        
        cabecalho.innerHTML = dados;
        cabecalho.classList.add('thead-dark');
        //----------------

        tabela.classList.add('table')

        //--------
        let corpo = document.createElement('tbody');
    
        db.transaction(function (tx){
            tx.executeSql('SELECT * FROM circuit where projeto = ?', [id_proj], function (tx, resultado){
            let rows = resultado.rows

            let tr = ''

            for (let i=0;i<rows.length;i++){

            tr += '<tr>';
                tr += `<td onclick="chamaEditCKT('${rows[i].id}')"><i class="fas fa-edit"></td>`;
                tr += '<td>' + rows[i].local + ' </td>';
                tr += '<td>' + rows[i].tipo_ckt + ' </td>';
                tr += '<td>' + rows[i].tens_va + ' </td>';
                tr += '<td>' + rows[i].qt_ckt + ' </td>';
                tr += '<td>' + rows[i].power_va + ' </td>';
                tr += '<td>' + rows[i].carga_total + ' </td>';
                tr += '<td>' + rows[i].corr_total + ' </td>';
                tr += '<td>' + rows[i].comp_ckt + ' </td>';
                tr += '<td>' + rows[i].secao_condutor + ' </td>';
                tr += '<td>' + rows[i].qd_tens_perm, + ' </td>';
                tr += '<td>' + rows[i].n_polos, + ' </td>';
                tr += '<td>' + rows[i].arrang_cable, + ' </td>';
                tr += '<td>' + rows[i].corr_nom, + ' </td>';
                tr += '<td>' + rows[i].dj, + ' </td>';
                tr += '<td onclick="deletaId('+ rows[i].id  +')"><i class="fas fa-trash"></td>';
                tr += '</tr>'; 
                }
                corpo.innerHTML = tr
                table_circuit.innerHTML = `Tabela de Circuitos - ${id_proj}`

            }, null);
    
        });
  
        //--------
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        document.getElementById('ajusta-tabela').appendChild(tabela);
        
        //----------------------------------
        
    }, null);

    });

}


function chamaEditCKT(id_proj){
    console.log('>>: ', id_proj)

    db.transaction(function (tx){
        tx.executeSql('SELECT * FROM circuit WHERE id = ?', [id_proj], function (tx, resultado){
            let rows = resultado.rows
            let id_projeto;
            let id_local;
            let id_tipo;
            let id_tens;
            let id_qt;
            let id_power;
            let id_carga;
            let id_corr_total;
            let id_comp;
            let id_secao;
            let id_perm;
            let id_polos;
            let id_arrang_calbe;
            let id_corr_nom;
            let id_dj;
    
                for (let i=0;i<rows.length;i++){
                    console.log('funcioanndo: ', rows[i].local)

                    id_projeto = rows[i].projeto
                    id_local = rows[i].local
                    id_tipo = rows[i].tipo_ckt
                    id_tens = rows[i].tens_va
                    id_qt = rows[i].qt_ckt
                    id_power = rows[i].power_va
                    id_carga = rows[i].carga_total
                    id_corr_total = rows[i].corr_total
                    id_comp = rows[i].comp_ckt
                    id_secao = rows[i].secao_condutor
                    id_perm = rows[i].qd_tens_perm
                    id_polos = rows[i].n_polos
                    id_arrang_calbe = rows[i].arrang_cable
                    id_corr_nom = rows[i].corr_nom
                    id_dj = rows[i].dj
                    id_id = rows[i].id
                }

                setTimeout(function() {
                    window.location.href = `edit-ckt.html?${id_projeto}?${id_local}?${id_tipo}?${id_tens}?${id_qt}?${id_power}?${id_comp}?${id_polos}?${id_arrang_calbe}?${id_id}`
                }, 1000);

                // setTimeout(function() {
                //     window.location.href = `edit-ckt.html?${id_projeto}?${id_local}?${id_tipo}?${id_tens}?${id_qt}?${id_power}?${id_comp}?${id_perm}?${id_polos}?${id_arrang_calbe}?${id_id}`
                // }, 1000);
                

                /* setTimeout(function() {
                    window.location.href = `edit-ckt.html?${id_projeto}?${id_local}?${id_tipo}?${id_tens}?${id_qt}?${id_power}?${id_carga}?${id_corr_total}?${id_comp}?${id_secao}?${id_perm}?${id_polos}?${id_arrang_calbe}?${id_corr_nom}?${id_dj}?${id_id}`
                }, 1000); */
            }, null);
        });
}

function obtemCKTFormEdit(form) {
    
    var ckt = {
        projeto: form.id_r_project.value, //PROJETO
        local: form.id_r_local.value, //LOCAL
        tipoCKT: form.id_r_type_circuit.value, //TIPO
        tensVa: form.id_r_tension.value, //TENSAO_VA
        qtCKT: form.id_r_numbers_points.value, //QUANT
        powerVA: form.id_r_power_va.value, //POTENCIA
        //totalVA: form.id_r_total_va.value, //POTENCIA_TOTAL
        //correnteVA: form.id_r_corrente_va.value, //POTENCIA_TOTAL
        compCKT: form.id_r_circuit_length.value, //COMP_CKT
        //secao: form.id_r_secao_cond.value, //SECAO
        //qdTensPerm: form.id_r_volt_drop_allow.value, //QUEDA_TENSAO
        nPolos: form.id_r_numero_polos.value, //N_DE_POLOS
        arrangCable: form.id_r_arrang_cable.value, //ARRANJO DE CABOS
        //corrNominal: form.id_r_corr_nom.value, //CORENTE NOMINAL
        //dj: form.id_r_dj.value, //DJ
        
    }
    
    return ckt;
}

function updateCircuit(){
    
    let url = window.location.href
    let _id = url.split("?"); // id=10&name=gustavo

    let form = document.querySelector("#form-edita");
    let ckt = obtemCKTFormEdit(form);
    let calc = calculos(ckt);

    console.log('>>>11: ', _id[11])

    db.transaction(function(tx) {

        tx.executeSql('UPDATE circuit SET projeto=?, local=?, tipo_ckt=?, tens_va=?, qt_ckt=?, power_va=?, carga_total=?, corr_total=?, comp_ckt=?, secao_condutor=?, qd_tens_perm=?, n_polos=?, arrang_cable=?,corr_nom=?, dj=?WHERE id=?', [ckt.projeto,ckt.local,ckt.tipoCKT,parseInt(ckt.tensVa),parseInt(ckt.qtCKT),parseInt(ckt.powerVA),Math.round(calc.cargaTotal), Math.round(calc.corrTotal),parseInt(ckt.compCKT),calc.secaoCondutor,parseInt(calc.qdTensPerm),parseInt(ckt.nPolos),ckt.arrangCable,Math.round(calc.corrNom),calc.dj,parseInt(_id[10])],null);

       /*  [ckt.projeto,ckt.local,ckt.tipoCKT,parseInt(ckt.tensVa),parseInt(ckt.qtCKT),parseInt(ckt.powerVA),parseInt(ckt.totalVA),parseInt(ckt.correnteVA),parseInt(ckt.compCKT),parseInt(ckt.secao),parseInt(ckt.qdTensPerm),parseInt(ckt.nPolos),ckt.arrangCable,parseInt(ckt.corrNominal),ckt.dj,parseInt(_id[16])],null); */

    });

    form.reset();

    setTimeout(function() {
        window.location.href = "home-ckt.html";
    }, 1000);
}

function deletaId(id){
    console.log('eita foi!!!: ', id)
}


/* function deletar(){
    
    var id = document.getElementById('field-id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
}
 */


















//Como apturar url parâmetros
//https://www.blogson.com.br/como-ler-parametros-da-url-com-javascript/




/* let data_ckt = {
    id_project : id_proj,
    id_local : rows[i].local,
    id_tipo : rows[i].tipo_ckt,
    id_tens : rows[i].tens_va,
    id_power : rows[i].power_va,
    id_carga : rows[i].carga_total,
    id_corr : rows[i].corr_total,
    id_secao : rows[i].secao_condutor,
    id_perm : rows[i].qd_tens_perm,
    id_polos : rows[i].n_polos,
    id_arrang_calbe : rows[i].arrang_cable,
    id_corr_nom : rows[i].corr_nom,
    id_dj : rows[i].dj
}

let data_ckt2 = [
    id_proj,rows[i].local,rows[i].tipo_ckt,rows[i].tens_va,rows[i].power_va,rows[i].carga_total,rows[i].corr_total,rows[i].secao_condutor,rows[i].qd_tens_perm,rows[i].n_polos,rows[i].arrang_cable,rows[i].corr_nom,rows[i].dj
]  */
