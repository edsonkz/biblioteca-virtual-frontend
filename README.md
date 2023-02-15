# biblioteca-virtual-frontend
Frontend da aplicação [biblioteca-virtual-backend](https://github.com/edsonkz/biblioteca-virtual-backend). Funciona com Node.js e React. Precisa da aplicaão backend rodando para funcionar corretamente.

## Instalação
Necessária versão node.js 16.15.1 e npm 8.11.0.
No diretório raiz da aplicação (o que possuir o arquivo package.json) inserir no seu terminal favorito o comando `npm install`.

## Executando
Atenção, o programa roda no PORT 3000, logo para funcionar, é necessário garantir que nenhuma outro serviço esteja funcionando nesse memso port.
- Executar o projeto encontrado em [biblioteca-virtual-backend](https://github.com/edsonkz/biblioteca-virtual-backend).
- Execute no terminal executando na pasta raiz do projeto `npm start`
- Agora a aplicação está disponível pelo endereço `http://localhost:3000/`

## Pacotes Utilizados
- React.js para toda a estrutura da aplicação.
- react-bootstrap e bootstrap-icons para a estilização das páginas.
- react-dom e react-router-dom para navegação entre páginas.
- react-pdf para a visualização de pdf.
- axios para comunicação com backend.
- chart.js e react-chartjs-2 para gerar gráficos no frontend.
- lodash e moments para manipulação de dados com mais facilidade.
- @reduxjs/toolkit, redux e redux-thunk para utilizar redux.
