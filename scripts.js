//https://respostas.guj.com.br/31984-como-criar-um-header-e-um-footer-fixos-para-todas-as-paginas


$(document).ready(function(){

    var baseUrl    = 'https://8000-a4494a87-5e96-4212-9efb-04d304f99a58.ws-us02.gitpod.io/';
    var deleteBtn  = $('.delete-btn');
    var searchBtn  = $('#search-btn');
    var searchForm = $('#search-form');
    var filtery    = $('#filtery');
    


    $(deleteBtn).on('click', function(e){
        e.preventDefault();

        var delLink = $(this).attr('href');
        var result = confirm('Quer realmente deletar esta tarefa?');

        if(result){
            window.location.href = delLink;
        }
    });  

    $(searchBtn).on('click', function(){
        searchForm.submit();
    })

    $(filtery).change(function() {
        var filtery = $(this).val();
        window.location.href = baseUrl + '?filtery=' + filtery;
        console.log(filtery);

    });
});




/* 
let projetos = document.createElement('select')

    let nomes = [
        'Projeto Casa 01',
        'Projeto Casa 02'
        ];
        for (i=0;i<nomes.length;i++){
            projetos.appendChild('<option>' + nomes[i] + '</option>')
        }
    
    projetos.classList.add('select form-control')
 
    document.getElementById('id_r_project').appendChild(projetos)
 */

/* 
function funcao_alerta(){
    alert("Sorry, Research in Construction !!!");
}


    var sel = document.createElement("select");
    var opt1 = document.createElement("option");
    var opt2 = document.createElement("option");

   

    opt1.value = "1";
    opt1.text = "Option: Value 1";

    opt2.value = "2";
    opt2.text = "Option: Value 2";

    sel.add(opt1, null);
    sel.add(opt2, null);

    

    document.getElementById('select3').appendChild(sel) */


/* 
function optionCKT(){
 
    let projetos = document.createElement('SELECT')

    let nomes = [
        'Projeto Casa 01',
        'Projeto Casa 02'
        ];
        for (i=0;i<nomes.length;i++){
            projetos.appendChild('<option>' + nomes[i] + '</option>')
        }
    
    projetos.classList.add('select form-control')
 
    document.getElementById('select3').appendChild(projetos)
}
 */

/* 
var projetos = [
    'Projeto Casa 01',
    'Projeto Casa 02'
    ];
    
    projetos.map(item => {
    $('#select1').append('<option>' + item + '</option>')
    });  
  */