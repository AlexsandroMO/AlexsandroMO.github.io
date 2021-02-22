

function xxxx(){//{ readDB()

    let url = window.location.href
    let _id = url.split("?")[1]; // id=10&name=gustavo

    let tabela = document.createElement('table')

    let id_proj = nameProj(_id)

    console.log('vem do nameProj(_id): ', id_proj)

    cabecalho = chamaThead();

    tabela.classList.add('table')
  
    tabela.appendChild(cabecalho);
    tabela.appendChild(montaBodyCKT(id_proj));
  
    document.getElementById('ajusta-tabela').appendChild(tabela);
  
  }

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
  
function montaBodyCKT(id_proj){

    //console.log('dentro do bodyckt: ',id_proj)

    let corpo = document.createElement('tbody');
  
    db.transaction(function (tx){
      tx.executeSql('SELECT * FROM circuit where projeto = ?', [id_proj], function (tx, resultado){
        let rows = resultado.rows

        console.log(rows)

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
  
    }, null);
  
    });
  
    return corpo;
  
  }
