/*const aventuriersLocal = [
    {
        "id": "1",
        "nom": "Oral Schmeler IV",
        "couleur": "#6c6b67",
        "avatar" : "https://picsum.photos/id/76/200"
    },
    {
        "id": "2",
        "nom": "Tad McLaughlin",
        "couleur": "#5d5c62",
        "avatar" : "https://picsum.photos/id/65/200"
    },
    {
        "id": "3",
        "nom": "Matteo Wunsch",
        "couleur": "#454f41",
        "avatar" : "https://picsum.photos/id/64/200"
    },
    {
        "id": "4",
        "nom": "Jack Beahan MD",
        "couleur": "#386b1f",
        "avatar" : "https://picsum.photos/id/22/200"
    }
];*/

/*
Fonction qui à partir
 */

function creerCarte(personne){
    $("#aventuriers").append(`
     <li class="card col-3 m-2">
     <div class="card-body">
        <h2 class="card-title h5">${personne.name}</h2>
        <div class="card-text">
           <p>Age : ${personne.age}</p>
           <p> ID : ${personne.id}</p>        
           <input type="button" onclick="afficherDetails(${personne.id}) " class="btn btn-primary" value="Voir détails">
           <input type="button" onclick="supprimre(${personne.id}) " class="btn btn-primary" value="Supprimer"> 
        </div>
     </div>
    </li>`);
}

function creerFormulaire(personne){
    $("#aventuriers").append(`
     <li class="card col-3 m-2">
     <div class="card-body">
        <h2 class="card-title h5">${personne.id}</h2>
        <div class="card-text">
            <form onsubmit="modifier(${personne.id})" action="#" method="post">
                <div class="mb-3">
                    <label for="nom-mod" class="form-label">Nom </label>
                    <input type="text" class="form-control" id="nom-mod" value="${personne.name}" required>
                </div>
                <div class="mb-3">
                    <label for="age-nom" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age-mod" value="${personne.age}" required min="0">
                </div>
                <button type="submit" class="btn btn-primary">Modifier</button>
            </form>     
           <input type="button" onclick="afficherDetails(${personne.id}) " class="btn btn-primary" value="Voir détails">
           <input type="button" onclick="supprimre(${personne.id}) " class="btn btn-primary" value="Supprimer"> 
        </div>
     </div>
    </li>`);
}

function afficherDetails(id) {
    $("#aventuriers").text("")
    $.getJSON('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne/'+ id)
        .done(function (personne) {
            creerFormulaire(personne)
        })
        .fail(function (error) {
            $('.alert').text(error.status).removeClass('d-none');
        });
}

function modifier(id){
    event.preventDefault()
    const personne = new Personne($('#nom-mod').val(), $('#age-mod').val())

    fetch('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne/'+ id, {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify(personne)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
        throw new Error ("Erreur "+reponse.status);
    }).then(personne => {
        // Do something with deleted task
        afficherTout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })}

function afficherTout() {
    $("#aventuriers").text("")
    $.getJSON('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne/')
        .done(function (personne) {
            personne.forEach(function (personne)
            {
               creerCarte(personne);
            });
        })
        .fail(function (error) {
            $('.alert').text(error.status).removeClass('d-none');
        });
}

afficherTout();

function supprimre(id){
fetch('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne/'+ id, {
    method: 'DELETE',
}).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
    throw new Error ("Erreur "+reponse.status);
}).then(personne => {
    // Do something with deleted task
    afficherTout()
}).catch(error => {
    $('.alert').text(error.message).removeClass('d-none');
})}

function Personne(p_nom = "", p_age = 0){
    this.name = p_nom
    this.age = p_age
}


function ajouter(){
   event.preventDefault();
   const personne = new Personne($('#nom').val(), $('#age').val())
    fetch('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne/', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(personne)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
        throw new Error ("Erreur "+reponse.status);
    }).then(task => {
        // do something with the new task
        afficherTout()
        $('#nom').val("")
        $('#age').val(0)
    }).catch(error => {
        // handle error
        $('.alert').text(error.message).removeClass('d-none');
    })
}

/* localement
aventuriersLocal.forEach(function (aventurier){
    creerCarte(aventurier)
})*/

/*facon JavaScript (sans biblioteque)*/
// fetch('')
//     .then(function (reponse){
//         //Un problème s'est produit
//         if(!reponse.ok){
//             //lancer une expedition (pas de distinction de syntaxe entre exception et erreur)
//             throw new Error ("Erreur "+reponse.status);
//         }
//         return reponse.json();
//     })
//     .then(function (aventuriers) {
//         aventuriers.forEach(function (aventurier) {
//             creerCarte(aventurier);
//         });
//     })
//     //attraper et gérer
//     .catch(function (erreur) {
//         $('.alert').text(erreur.message).removeClass('d-none');
//     });


 //facon JQuery
//
// $.getJSON('https://656dcec6bcc5618d3c2401e0.mockapi.io/Personne')
//     .done(function(aventurier){
//         aventurier.forEach(function (aventurier) {
//             creerCarte(aventurier)
//         });
//     })
//     .fail(function (error){
//         $('.alert').text(error.status).removeClass('d-none')
//     });



