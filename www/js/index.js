var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);  
    },

    inserir: function(){
        var db = firebase.firestore();

        let varnome = document.getElementById("txtNome").value;
        let vartelefone = document.getElementById("txtTelefone").value;
        let varorigem = document.getElementById("txtOrigem").value;
        let vardatacontato = document.getElementById("txtDataContato").value;
        let varobs = document.getElementById("txtObservacao").value;

        db.collection("bd_clientes").add({
            nome: varnome,
            telefone: vartelefone,
            origem: varorigem,
            datacontato: vardatacontato,
            obs: varobs
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            window.location.href = cordova.file.applicationDirectory + "www/index.html";
        })
        .catch((error) => {
            print(error);
            console.error("Error adding document: ", error);
        });

    }  
};

app.initialize();