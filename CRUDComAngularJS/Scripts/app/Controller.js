app.controller("crudCtrl", function ($scope, crudService) {

    $scope.divCelular = false;

    obterCelulares();

    function obterCelulares() {
        //debugger;
        var celularesData = crudService.ObterCelulares();
        celularesData.then(function (celular) {

            $scope.celulares = celular.data;

        }, function () {
            toastr["error"]("Erro ao obter os celulares", "Titulo");
        }
       )
    }

    $scope.excluirCelular = function (celular) {
        var celularData = crudService.ExcluirCelular(celular.Id);

        celularData.then(function (data) {
            if (data.status == 200)
                toastr["success"]("Excluido com sucesso!", "Titulo");

            obterCelulares();
        }, function () {
            toastr["error"]("Erro ao tentar excluir", "Titulo");
        });
    }

    $scope.obterPorId = function (celular) {
        var celularData = crudService.ObterCelularPorId(celular.Id);

        celularData.then(function (_celular) {
            $scope.celular = _celular.data;
            $scope.celularId = _celular.data.Id;
            $scope.Marca = _celular.data.Marca;
            $scope.Modelo = _celular.data.Modelo;
            $scope.Cor = _celular.data.Cor;
            $scope.TipoChip = _celular.data.TipoChip;
            $scope.MemoriaInterna = _celular.data.MemoriaInterna;
            $scope.Action = "Atualizar";
            $scope.divCelular = true;
        }, function () {
            toastr["erroe"]("Erro ao obter celular por id", "Titulo");
        });
    }

    $scope.AdiconarAtualozarCelular = function () {
        var celular = {
            Marca: $scope.Marca,
            Modelo: $scope.Modelo,
            Cor: $scope.Cor,
            TipoChip: $scope.TipoChip,
            MemoriaInterna: $scope.MemoriaInterna
        };
        var valorAcao = $scope.Action;

        if (valorAcao == "Atualizar") {
            celular.Id = $scope.celularId;
            var celularData = crudService.AtualizarCelular(celular);
            celularData.then(function (data) {
                obterCelulares();
                //$scope.divCelulares();
                $scope.divCelular = false;
                if (data.status == 200) {
                    toastr["success"]("Celular alterado com sucesso", "Titulo");
                }
            }, function () {
                toastr["error"]("Erro ao atualizar!", "Titulo");
            });
        } else {
            var celularData = crudService.AdionarCelular(celular);
            celularData.then(function (data) {
                obterCelulares();
                if (data.status == 200) {
                    $scope.incluirCelularDiv();
                    $scope.Cancelar();
                    toastr["success"]("Adicionado com sucesso", "Titulo");
                }
            }, function () {
                toastr["error"]("Erro ao tentar excluir", "Titulo");
            });
        }
        
    }

    $scope.Cancelar = function () {
        $scope.divCelular = false;
    }

    $scope.incluirCelularDiv = function () {
        limparCampos();
        $scope.Action = "Adicionar";
        $scope.divCelular = true;
    }

    function limparCampos() {
        $scope.Marca = "",
        $scope.Modelo = "",
        $scope.Cor = "",
        $scope.TipoChip = "",
        $scope.MemoriaInterna = ""
    }

});