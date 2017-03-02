app.service("crudService", function($http){

    this.ObterCelulares = function () {
        return $http.get("/api/v1/public/celulares");
    }

    this.ObterCelularPorId = function (id) {
        return $http.get("/api/v1/public/celular/" + JSON.stringify(id));
    }

    this.AtualizarCelular = function(celular){
        var response = $http({
            method: "put",
            url: "/api/v1/public/putcelular",
            data: JSON.stringify(celular),
            dataType:"json"
        });

        return response;
    }

    this.AdionarCelular = function(celular){
        var response = $http({
            method: "post",
            url: "/api/v1/public/postcelular",
            data: JSON.stringify(celular),
            dataType:"json"
        });

        return response;
    }

    this.ExcluirCelular = function(id){
        var response = $http({
            method:"delete",
            url:"/api/v1/public/deletecelular/" + JSON.stringify(id)
        });

        return response;
    }
});