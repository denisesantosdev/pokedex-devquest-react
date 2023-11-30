
# Pokedéx com React 

Aplicação que lista pokemons e suas informações.

## Funcionalidades

- Temas dark e light
- Filtro por tipo de pokemon
- Aplicação SPA
- Salvamento do tema escolhido 

## Stack utilizada

- React 
- Context API 
- Styled Components
- React Router Dom

## Rodando Localmente

- Instale o Node.js pelo site oficial: https://nodejs.org/ 

- Abra o terminal em uma pasta da sua preferência.

- Clone o repositório do GitHub:

```bash
git clone https://github.com/denisesantosdev/pokedex-devquest-react.git
```
- Navegue até o diretório do projeto:

```bash
cd pokedex-devquest-react
```

- Instale as dependências do projeto:

```
npm install
```

- Inicie o servidor de desenvolvimento:
```
npm run dev
```

- Acesse  http://localhost:3000/ (ou a porta que o aplicativo está usando, se for diferente).

## Planejamento e execução do desafio

Trabalhei nesse desafio durante semanas e foi uma jornada desafiadora, com alguns altos e baixos que pra ser sincera testaram minha paciência 😅

Desde o início, procurei planejar cada etapa com calma, mas ao longo do caminho, enfrentei alguns problemas inesperados que exigiram uma mudança em relação a minha abordagem ao código.

Decidí por uma estrutura de pastas que mantém cada parte da aplicação separada com uma pasta de páginas para bom entendimento das rotas, uma pasta de componentes, uma de contexts e outra de serviços que armazena as chamadas às apis da Pokeapi.

Em um primeiro momento, decidí por fazer a chamada à api de pokemons na raiz da aplicação e passar os dados por meio de props aos outros componentes, porém encontrei um bug em que se a página de detalhes fosse recarregada, a aplicação deixaria de funcionar. Então decidi criar um context pra fazer a requisição e passar os dados para diversos componentes. Novamente encontrei o mesmo bug mas consegui resolver fazendo uso do local storage pra guardar os detalhes do pokemon clicado.

Também encontrei dificuldades com a estrutura de dados da requisição que é composta de arrays dentro de arrays dentro de arrays... Mas depois de muito tentar consegui resolver usando os métodos maps e filter.

Outra coisa que também me deu um pouco de trabalho foi descobrir como mudar a cor de background do body conforme a escolha do tema light ou dark. Decidí por usar o createGlobalStyle do styled components em cada página da aplicação. Sei que essa pode não ser a solução mais elegante, pórem funcionou perfeitamente.

Apesar dos problemas acredito que cada obstáculo nesse desafio me proporcionou uma oportunidade de aprendizado importante na minha jornada como dev.

