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

    console.log('Até Calc foi', calc)
   
    createDbCircuit();
    addData(ckt, calc);

    form.reset();

    setTimeout(function() {
        window.location.href = "index.html";
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
        qdTensPerm: form.id_r_volt_drop_allow.value, //QUEDA_TENSAO
        nPolos: form.id_r_numero_polos.value, //N_DE_POLOS
        arrangCable: form.id_r_arrang_cable.value, //N_DE_POLOS
    }
    console.log(ckt)
    return ckt;
}

function addData(ckt, calc){

    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO circuit (projeto, local, tipo_ckt, tens_va, qt_ckt, power_va, carga_total, corr_total, comp_ckt, secao_condutor, qd_tens_perm, n_polos, arrang_cable, corr_nom, dj) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ckt.projeto, ckt.local, ckt.tipoCKT, ckt.tensVa, ckt.qtCKT, ckt.powerVA, calc.cargaTotal, calc.corrTotal, ckt.compCKT, calc.secaoCondutor, ckt.qdTensPerm, ckt.nPolos, ckt.arrangCable, calc.corrNom, calc.dj]);

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
    let _id = url.split("?")[1]; // id=10&name=gustavo

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
                tr += '<td onclick="chamaId('+ rows[i].id  +')"><i class="fas fa-edit"></td>';
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




//tx.executeSql("DROP TABLE myTable" );
//tx.executeSql('DROP DATABASE myDB');

function deletaId(id){
    console.log('eita foi!!!: ', id)
}


//Como apturar url parâmetros
//https://www.blogson.com.br/como-ler-parametros-da-url-com-javascript/
