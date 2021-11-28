var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
    },

    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("bd_clientes").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("txtNome").value = doc.data().nome;
                document.getElementById("txtTelefone").value = doc.data().telefone;
                document.getElementById("txtOrigem").value = doc.data().origem;
                document.getElementById("txtDataContato").value = doc.data().datacontato;
                document.getElementById("txtObservacao").value = doc.data().obs;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let varnome = document.getElementById("txtNome").value;
        let vartelefone = document.getElementById("txtTelefone").value;
        let varorigem = document.getElementById("txtOrigem").value;
        let vardata_contato = document.getElementById("txtDataContato").value;
        let varobservacao = document.getElementById("txtObservacao").value;

        var db = firebase.firestore();
        var ag = db.collection("bd_clientes").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("bd_clientes").doc(doc.id);

                return dados.update({
                    nome: varnome,
                    telefone: vartelefone,
                    origem: varorigem,
                    data_contato: vardata_contato,
                    observacao: varobservacao
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();
