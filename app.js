var app = angular.module('app', []);

app.controller('Controller', ['$scope', '$rootScope', 
    function (scope, rootScope) {
      
      scope.vez = 1;
      scope.ponto1;
      scope.ponto2;
      scope.listaPontos = [];

      scope.anterior;
      scope.proximo;
      scope.acima;
      scope.abaixo;

      scope.pontuacaoJogador1 = 0;
      scope.pontuacaoJogador2 = 0;

      scope.listaPontosTracados = [];

      for (var i = 0; i < 160; i++) {
        var objeto = {
          'id': i
        }
        scope.listaPontos.push(objeto);
      };

      scope.obterTraco = function(ponto) { 
        var vitoria = false;
        if (scope.ponto1 == null) {
                  scope.ponto1 = ponto;
                  scope.anterior = scope.ponto1.id - 1;
                  scope.proximo = scope.ponto1.id + 1;
                  scope.acima = scope.ponto1.id - 16;
                  scope.abaixo = scope.ponto1.id + 16;

                  if (scope.vez == 1) {
                      var pontoSelecionado = document.getElementById(ponto.id).className = 'pontoSelecionadoJogador1';
                  } else {
                    var pontoSelecionado = document.getElementById(ponto.id).className = 'pontoSelecionadoJogador2';
                  }      
        } else if (ponto.id == scope.ponto1.id) {
                scope.ponto1 = null;
                var pontoSelecionado = document.getElementById(ponto.id).className = 'ponto';
        } else {

              if (ponto.id == scope.anterior || ponto.id == scope.proximo 
                || ponto.id == scope.acima || ponto.id == scope.abaixo) {
                    scope.ponto2 = ponto;  
                    var objeto = {
                      'ponto1':scope.ponto1.id,
                      'ponto2':scope.ponto2.id
                    }
                    scope.listaPontosTracados.push(objeto);

                    if (scope.vez == 1) {
                        var pontoSelecionado = document.getElementById(ponto.id).className = 'pontoSelecionadoJogador1';
                    } else {
                        var pontoSelecionado = document.getElementById(ponto.id).className = 'pontoSelecionadoJogador2';
                    }
                   
                    scope.setTraco(ponto.id, scope.anterior, scope.proximo, scope.acima, scope.abaixo);
                    

                    if((scope.ponto1.id == scope.ponto2.id - 1) || (scope.ponto2.id == scope.ponto1.id - 1)) {
                        if (scope.verificaPontuacaoVerticalAcima(ponto.id, scope.ponto1.id, scope.ponto2.id)) {
                              vitoria = true;
                                 if(scope.vez == 1) {
                                      scope.pontuacaoJogador1++;
                                 } else {
                                      scope.pontuacaoJogador2++;
                                 }
                        } 
                    } else { 
                        if ((scope.verificaPontuacaoHorizontalDireita(ponto.id, scope.ponto1.id, scope.ponto2.id))
                          || (scope.verificaPontuacaoHorizontalEsquerda(ponto.id, scope.ponto1.id, scope.ponto2.id))) {
                              vitoria = true;
                                 if(scope.vez == 1) {
                                      scope.pontuacaoJogador1++;
                                 } else {
                                      scope.pontuacaoJogador2++;
                                 }
                        } 
                    }
                    if(!vitoria){
                      scope.vez = (scope.vez == 1? 2:1);
                    }
                    scope.ponto1 = null;
                    scope.ponto2 = null;
                    vitoria = false;

              } else {
                 alert("Você deve selecionar um ponto ao lado da primeira ponto escolhido");
              }     
        }

      }

      scope.setTraco = function(ponto, anterior, proximo, acima, abaixo) {
          if (ponto == anterior) {
             var traco = document.getElementById('tracoVertical'+anterior).className = 'tracoVerticalVisivel';
          } else if (ponto == proximo) {
             id = ponto - 1;
            var traco = document.getElementById('tracoVertical'+ id).className = 'tracoVerticalVisivel';
          } else if (ponto == acima) {
            var traco = document.getElementById('tracoHorizontal'+acima).className = 'tracoHorizontalVisivel';
          } else if (ponto == abaixo) {
            id = ponto - 16;
            var traco = document.getElementById('tracoHorizontal'+id).className = 'tracoHorizontalVisivel';
          }
      }

      scope.verificaPontuacaoHorizontalDireita = function(ponto, ponto1, ponto2){

            var anterior = ponto - 1;
            var acima = ponto - 16;
            var anteriorAcima = acima -1; 

            var abaixo = ponto + 16;
            var anteriorAbaixo = abaixo -1; 
            var aux = 0;

            var acimaOuAbaixo;
            var anterioracimaOuAbaixo;

        if (ponto1 < ponto2){
            acimaOuAbaixo = acima;
            anterioracimaOuAbaixo = anteriorAcima;
        } else {
            acimaOuAbaixo = abaixo;
            anterioracimaOuAbaixo = anteriorAbaixo;
        }
        
        angular.forEach(scope.listaPontosTracados, function(traco){    

               if (scope.verificaTracoIgual(traco, ponto, anterior)) {
                 aux++;
               } 
               if(scope.verificaTracoIgual(traco, anterior, anterioracimaOuAbaixo)){
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, ponto, acimaOuAbaixo)) {
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, acimaOuAbaixo, anterioracimaOuAbaixo)) {
                 aux++;
               }
           });  

          if(aux == 4){
            return true;
          }
            return false;

      }

      scope.verificaPontuacaoHorizontalEsquerda = function(ponto, ponto1, ponto2){

            var proximo = ponto + 1;
            var acima = ponto - 16;
            var proximoAcima = acima +1; 

            var abaixo = ponto + 16;
            var proximoAbaixo = abaixo +1; 
            var aux = 0;

            var acimaOuAbaixo;
            var proximoAcimaOuAbaixo;

        if (ponto1 < ponto2){
            acimaOuAbaixo = acima;
            proximoAcimaOuAbaixo = proximoAcima;
        } else {
            acimaOuAbaixo = abaixo;
            proximoAcimaOuAbaixo = proximoAbaixo;
        }
        
        angular.forEach(scope.listaPontosTracados, function(traco){    

               if (scope.verificaTracoIgual(traco, ponto, proximo)) {
                 aux++;
               } 
               if(scope.verificaTracoIgual(traco, proximo, proximoAcimaOuAbaixo)){
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, ponto, acimaOuAbaixo)) {
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, acimaOuAbaixo, proximoAcimaOuAbaixo)) {
                 aux++;
               }
           });  

          if(aux == 4){
            return true;
          }
            return false;

      }
      scope.verificaPontuacaoVerticalAcima = function(ponto, ponto1, ponto2){

            var anterior = ponto - 1;
            var acima = ponto - 16;
            var anteriorAcima = acima -1; 

            var abaixo = ponto + 16;
            var anteriorAbaixo = abaixo -1; 
            var aux = 0;
        
        angular.forEach(scope.listaPontosTracados, function(traco){    

               if (scope.verificaTracoIgual(traco, ponto, abaixo)) {
                 aux++;
               } 
               if(scope.verificaTracoIgual(traco, abaixo, anteriorAbaixo)){
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, anteriorAbaixo, anteriorAcima)) {
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, anteriorAcima, ponto)) {
                 aux++;
               }
           });  

          if(aux == 4){
            return true;
          }
            return false;

      }


      scope.verificaTracoIgual = function(traco, ponto1, ponto2) {
          if ((traco.ponto1 == ponto1 && traco.ponto2 == ponto2) || (traco.ponto1 == ponto2 && traco.ponto2 == ponto1)) {
              return true;
          } 
          return false;
      }

}]);
