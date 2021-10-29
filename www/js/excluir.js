var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnExcluir").addEventListener("click",app.excluir);
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

    excluir: function(){ 
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("bd_clientes").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("bd_clientes").doc(doc.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                    window.location.href = cordova.file.applicationDirectory + "www/consultarClientes.html";
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

};

app.initialize();