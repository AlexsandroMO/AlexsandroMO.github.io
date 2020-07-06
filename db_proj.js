
//var db = openDatabase('myDB', '2.0', 'Mybase', 1024);

//===================================================

function createDbProj(){    

    console.log('entrou na tabela cria_proj')

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS cria_proj (id INTEGER PRIMARY KEY, name_proj TEXT, coment TEXT)");
    });
 
} 

function addProj(){

    let form = document.querySelector("#form-adiciona-proj");
    let proj = obtemProjFormulario(form);

    createDbProj();
    addDataProj(proj);

    form.reset();

    setTimeout(function() {
        window.location.href = "home-ckt.html";
    }, 1000);
}

function obtemProjFormulario(form) {

    let proj = {
        projeto: form.id_r_create_project.value, //nome do projeto
        coment: form.id_r_coment.value, //Comentários
    }

    return proj;
}

function addDataProj(proj){

    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO cria_proj (name_proj, coment) VALUES (?, ?)', [proj.projeto, proj.coment]);
    });
}

//----------------------------------
//==================================
function readProjDB(){

    var tabela = document.createElement('table')
    //var titulo = document.getElementById('alinha-h3')
    var cabecalho = document.createElement('thead')
  
    var dados = '<th scope="col">Entrar no Projeto</th>\
                <th scope="col">Nome do Projeto</th>\
                <th scope="col">Editar Projeto</th>\
                <th scope="col">Excluir Projeto</th>'

    cabecalho.innerHTML = dados
    cabecalho.classList.add('thead-dark')
    tabela.classList.add('table')
  
    tabela.appendChild(cabecalho)
    tabela.appendChild(montaBodyProj())
  
    document.getElementById('ajusta-tabela-proj').appendChild(tabela)
  
  }

  function montaBodyProj(){
    
    var corpo = document.createElement('tbody')
  
    db.transaction(function (tx){
      tx.executeSql('SELECT * FROM cria_proj', [], function (tx, resultado){
        var rows = resultado.rows
        var tr = ''

        console.log(rows)

        for (let i=0;i<rows.length;i++){
            tr += '<tr>';
            tr += '<td onclick="chamaProjectId('+ rows[i].id  +')"><i class="fas fa-angle-double-right"></td>';
            tr += '<td>' + rows[i].name_proj + ' </td>';
            tr += '<td onclick="chamaEditProj('+ rows[i].id  +')"><i class="fas fa-edit"></td>';
            tr += '<td onclick="deletaId('+ rows[i].id  +')"><i class="fas fa-trash"></td>';
            tr += '</tr>'; 
        }
        corpo.innerHTML = tr

    }, null);
  
    });
    
    return corpo;
  
  }

function chamaEditProj(id_proj){

    db.transaction(function (tx){
        tx.executeSql('SELECT * FROM cria_proj', [], function (tx, resultado){
        let rows = resultado.rows

        console.log(':::::',rows)

        let id_projeto;
        let id_coment;

        for (let i=0;i<rows.length;i++){
            console.log('funcioanndo: ', rows[i].id)

            id_projeto = rows[i].name_proj
            id_coment = rows[i].coment
            id_id = rows[i].id

            console.log('>>>>>',id_projeto)

            setTimeout(function() {
                window.location.href = `edit-project.html?${id_projeto}?${id_coment}?${id_id}`
            }, 1000);

        }

        }, null);
    });

}

documento.getElementById('bt-click').addEventListener("click", updateProjId);

function updateProjId(){
    console.log('>>> eita')
    id_proj = 2

    //console.log('>>: ', id_proj)
    let form = document.querySelector("#form-edita-proj");
    let proj = obtemProjFormulario(form);

    console.log('>>>', proj)
    alert('')

    db.transaction(function(tx) {

        tx.executeSql('UPDATE cria_proj SET name_proj=?, coment=? WHERE id=?', [proj.projeto,proj.coment, id_proj],null);

    });

    /* form.reset();

    setTimeout(function() {
        window.location.href = "home-ckt.html";
    }, 1000); */

}

