import express  from "express";

const port = 3000;
const host = 'localhost';

const app = express();

app.use(express.static('./paginas'));

app.get('/', (req, res) => {
    res.end(`
    <!DOCTYPE html>
        <head>
        <meta charset="UTF-8">
            <title>MENU</title>
        </head>
        <body>
            <h1>MENU INICIAL</h1>
            <ul>
                <li><a href="/cadastros.html">Cadastrar novo valor</a></li>
            </ul>
        </body>
    </html>
    `);
});

const list = [] 

function controller(req, res){
    
    const usuarios = {
        item: req.query.item,
        preco: req.query.preco
    }
    list.push(usuarios)
    
   let Conteudofinal = `
    <!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
        <title>MENU</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </head>
    <body>
        <h1>valor</h1>
        <table class="table table-striped">
            <thead class="thead-dark justify-content-center">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Preco</th>
                </tr>
            </thead>
            <tbody> `;

            let saldo = 0;
        for(const user of list){
            saldo = Number(user.preco);
            Conteudofinal+= `
                <tr>
                    <td>${user.item}</td>
                    <td>${saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                </tr>      
            `
        }

        let final = 0;
        for(const usuario of list){
            final += Number(usuario.preco)
        }

    
        Conteudofinal += `
                    </tbody>
                </table>
                <p><strong>Valor total:</strong> ${final.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                <a class="btn btn-primary" href="/" role="button">Voltar</a>
                <a class="btn btn-primary" href="/cadastros.html" role="button">Novo cadastro</a>
            </html>
        `

        res.end(Conteudofinal)
}

app.get('/cadastros', controller);

app.listen(port, host, () => {
    console.log(`Servidor executando na url http://${host}:${port}`)
})