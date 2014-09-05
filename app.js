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
      scope.listaQuatrados = [];

      for (var i = 0; i < 160; i++) {
        var objeto = {
          'id': i
        }
        scope.listaPontos.push(objeto);
      };

      scope.obterTraco = function(ponto) { 
        var vitoria = false;

        if (scope.verficaGanhador(scope.listaQuatrados, scope.pontuacaoJogador1, scope.pontuacaoJogador2)){
          return;
        };

        if (scope.ponto1 == null) {
              scope.ponto1 = ponto;
              scope.anterior = scope.ponto1.id - 1;
              scope.proximo = scope.ponto1.id + 1;
              scope.acima = scope.ponto1.id - 16;
              scope.abaixo = scope.ponto1.id + 16;

              scope.setSelecaoPonto(scope.vez, ponto.id); 

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

                    scope.setSelecaoPonto(scope.vez, ponto.id);
                   
                    scope.setTraco(ponto.id, scope.anterior, scope.proximo, scope.acima, scope.abaixo);
                    

                    if((scope.ponto1.id == scope.ponto2.id - 1) || (scope.ponto2.id == scope.ponto1.id - 1)) {                     
                        if (scope.verificaPontuacaoVerticalAcima(ponto.id, scope.ponto1.id, scope.ponto2.id)){
                                 vitoria = true;
                                 scope.addPontuacao(scope.vez);
                          if (scope.verificaPontuacaoVerticalAbaixo(ponto.id, scope.ponto1.id, scope.ponto2.id)) {
                                 scope.addPontuacao(scope.vez);
                          }
                        } else if (scope.verificaPontuacaoVerticalAbaixo(ponto.id, scope.ponto1.id, scope.ponto2.id))  {
                              vitoria = true;
                              scope.addPontuacao(scope.vez);
                          if (scope.verificaPontuacaoVerticalAcima(ponto.id, scope.ponto1.id, scope.ponto2.id)){
                              scope.addPontuacao(scope.vez);
                          }  
                        } 
                    } else { 
                        if (scope.verificaPontuacaoHorizontalDireita(ponto.id, scope.ponto1.id, scope.ponto2.id)){
                            vitoria = true;
                            scope.addPontuacao(scope.vez);
                            if (scope.verificaPontuacaoHorizontalEsquerda(ponto.id, scope.ponto1.id, scope.ponto2.id)){
                                scope.addPontuacao(scope.vez);
                            }
                        } else if(scope.verificaPontuacaoHorizontalEsquerda(ponto.id, scope.ponto1.id, scope.ponto2.id)) {
                              vitoria = true;
                              scope.addPontuacao(scope.vez);
                          if (scope.verificaPontuacaoHorizontalDireita(ponto.id, scope.ponto1.id, scope.ponto2.id)) {
                              scope.addPontuacao(scope.vez);
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
      scope.addPontuacao = function(vez){
        if(vez == 1) {
              scope.pontuacaoJogador1++;
         } else {
              scope.pontuacaoJogador2++;
         }
      }

      scope.setSelecaoPonto = function(vez, ponto){
          if (scope.vez == 1) {
              var pontoSelecionado = document.getElementById(ponto).className = 'pontoSelecionadoJogador1';
          } else {
              var pontoSelecionado = document.getElementById(ponto).className = 'pontoSelecionadoJogador2';
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

      scope.verficaGanhador = function(lista, pontuacaoJogador1, pontuacaoJogador2){
        if (scope.verficaFimJogo(lista)){
           
           if (pontuacaoJogador1 > pontuacaoJogador2){
               alert("Vitória Jogador 1");
           } else if(pontuacaoJogador1 > pontuacaoJogador2){
               alert("Vitória para Jogador 2");
           } else {
              alert('empate!');
           }
           
           alert("Fim de Jogo")
           scope.limpaQuadro();
           return true;
        }
        return false;
      }

      scope.verficaFimJogo = function(list){
        if (list.length >= 135){
           return true;
        }
         return false;
      }
      scope.limpaQuadro = function(){
        for (var i = 0; i <= 160 ; i++) {
          var ponto = document.getElementById(i).className = 'ponto';
          var traco = document.getElementById('tracoHorizontal'+i).className = '';
          var traco = document.getElementById('tracoVertical'+ i).className = '';
        };
        
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
            objeto = {
             'ponto': ponto,
             'anterior': anterior,
             'anterioracimaOuAbaixo': anterioracimaOuAbaixo,
             'acimaOuAbaixo': acimaOuAbaixo
            }
            scope.listaQuatrados.push(objeto);
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
            objeto = {
             'ponto': ponto,
             'proximo': proximo,
             'proximoAcimaOuAbaixo': proximoAcimaOuAbaixo,
             'acimaOuAbaixo': acimaOuAbaixo
            }
            scope.listaQuatrados.push(objeto);
            return true;
          }
            return false;

      }
      scope.verificaPontuacaoVerticalAcima = function(ponto, ponto1, ponto2){

            var anterior = ponto - 1;
            var proximo = ponto + 1; 

            var abaixo = ponto + 16;
            var anteriorAbaixo = abaixo -1; 
            var proximoAbaixo = abaixo +1; 
            var aux = 0;
            var proximoOuAnterior;
            var proximoAbaixoOuAnteriorAbaixo;

        if (ponto1 < ponto2){
            proximoOuAnterior = anterior;
            proximoAbaixoOuAnteriorAbaixo = anteriorAbaixo;
        } else {
            proximoOuAnterior = proximo;
            proximoAbaixoOuAnteriorAbaixo = proximoAbaixo;
        }
        
        angular.forEach(scope.listaPontosTracados, function(traco){    

               if (scope.verificaTracoIgual(traco, ponto, abaixo)) {
                 aux++;
               } 
               if(scope.verificaTracoIgual(traco, abaixo, proximoAbaixoOuAnteriorAbaixo)){
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, proximoAbaixoOuAnteriorAbaixo, proximoOuAnterior)) {
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, proximoOuAnterior, ponto)) {
                 aux++;
               }
           });  

          if(aux == 4){
            objeto = {
             'ponto': ponto,
             'proximo': abaixo,
             'proximoAbaixoOuAnteriorAbaixo': proximoAbaixoOuAnteriorAbaixo,
             'proximoOuAnterior': proximoOuAnterior
            }
            scope.listaQuatrados.push(objeto);
            return true;
          }
            return false;

      }

      scope.verificaPontuacaoVerticalAbaixo = function(ponto, ponto1, ponto2){

            var anterior = ponto - 1;
            var acima = ponto - 16;
            var anteriorAcima = acima -1;
            var proximoAcima = acima +1;
            var proximo = ponto + 1;     
            var aux = 0;
            var proximoOuAnterior;
            var proximoAcimaOuAnteriorAcima;

        if (ponto1 < ponto2){
            proximoOuAnterior = anterior;
            proximoAcimaOuAnteriorAcima = anteriorAcima;
        } else {
            proximoOuAnterior = proximo;
            proximoAcimaOuAnteriorAcima = proximoAcima;
        }
        
        angular.forEach(scope.listaPontosTracados, function(traco){    

               if (scope.verificaTracoIgual(traco, ponto, acima)) {
                 aux++;
               } 
               if(scope.verificaTracoIgual(traco, acima, proximoAcimaOuAnteriorAcima)){
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, proximoAcimaOuAnteriorAcima, proximoOuAnterior)) {
                 aux++;
               }
               if (scope.verificaTracoIgual(traco, proximoOuAnterior, ponto)) {
                 aux++;
               }
           });  

          if(aux == 4){
            objeto = {
             'ponto': ponto,
             'proximo': acima,
             'proximoAcimaOuAnteriorAcima': proximoAcimaOuAnteriorAcima,
             'proximoOuAnterior': proximoOuAnterior
            }
            scope.listaQuatrados.push(objeto);
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
