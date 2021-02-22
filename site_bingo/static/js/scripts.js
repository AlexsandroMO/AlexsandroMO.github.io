//delay
//https://pt.stackoverflow.com/questions/254206/delay-javascript
//Drop
//https://stackoverflow.com/questions/7820189/web-sql-drop-delete-table-not-working



let db = openDatabase('myDB', '2.0', 'Mybase', 1024);



function clear_all(){

    console.log('Entrou no Clear_All')

    //dele_table()

    db.transaction(function (t) {
        t.executeSql("DROP TABLE bingo",[], 
            function(t,results){
                console.error("Table Dropped")
            },
            function(t,error){
                console.error("Error: " + error.message)
            }
        )
    })


    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS bingo (id INTEGER PRIMARY KEY, canto INTEGER)");
    });

    let var_canto = 0;

/*     db.transaction(function(tx) {
        tx.executeSql('INSERT INTO bingo VALUES (?)', [var_canto]);
    }); */

    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO bingo VALUES (?)', []);
    });

    setTimeout(function() {
        window.location.href = "file:///F:/Visual_Studio/Bingo_JavaScript_Version/templates/home.html";
    }, 5000);
    
}



function index(){
    console.log('Entrou Index')
    //Math.random() * 10
    //Math.floor(Math.random() * 100)

    let var_canto = document.getElementById('p-ajust')
    let falta = document.getElementById('p-ajust3')
    let cantado = Math.floor(99 * Math.random() + 1)

    let qt_total = 0

    db.transaction(function (tx){
        tx.executeSql('SELECT * FROM bingo order by canto', [], function (tx, resultado){
          let rows = resultado.rows
          qt_total = rows.length
          console.log('---', qt_total)
  
      }, null);
  
    });
    
    if (qt_total <= 99){
        console.log('foi')

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO bingo (canto) VALUES (?)', [cantado]);
        });

        var_canto.innerHTML = cantado
        singed()
    }

    else{
        falta.innerHTML = `Final da Contagem das Bolas`
    }
        

    
   
    //console.log('}}}}}}}}}}}', singed())
    

}



function singed(){
    console.log('Entrou Singed')

    //let lista = document.querySelector("#p-ajust2")
    let lista = document.getElementById('p-ajust2')
    let falta = document.getElementById('p-ajust3')
    let qt = 0
  
    db.transaction(function (tx){
      tx.executeSql('SELECT * FROM bingo order by canto', [], function (tx, resultado){
        let rows = resultado.rows
        qt = rows.length

        console.log(rows)
        console.log('*****', qt)

        for (let i=0;i<rows.length;i++){
            lista.innerHTML += rows[i].canto + ' | '
        }

        falta.innerHTML = `Itens Sorteados: ${qt}`
        
    }, null);

    });

}











    //let numeros = [1, 2, 3, 4];

/*     const maxNumbers = 99;
    let list = [];

    for (let i = 0; i < maxNumbers; i++) {
        list[i] = i + 1;
    }
    console.log('>>>----- >>: ', list); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 
    //--------------------------------

    // setTimeout(function() {
    //     window.location.href = "file:///F:/Visual_Studio/Bingo_JavaScript_Version/templates/index.html";
    // }, 5000);
    */