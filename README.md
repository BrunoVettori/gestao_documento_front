# Tecnologias utilizadas no projeto

## React

React e seus hooks é utilizado para fazer o controle principal da aplicação

## Shadcn

Shadcn é a lib de headless components utilizada na aplicação: https://ui.shadcn.com/

## Lucide

Lucide é a lib de icones utilizada no projeto: https://lucide.dev/icons/

## Vite

Vite é utlizado para rodar o server em ambiente dev e para buildar o javascript

## Tailwind

Tailwind é utilizdo em lugar do css tradicional: https://tailwindcss.com/

## Buildar aplicação

Rodar o comando: `npx vite build` ou `npm run build`

## Rodar aplicação em ambiente dev

Rodar o comando: `npm run dev`

## Rodar aplicação em ambiente Prod

Buildar a aplicação com o comando `npx vite build`, e entrar na pasta dist `cd dist`, e colocar o os arquivos na pasta padrão do nginx `sudo cp -r * /var/www/html`

## Nginx

Configuração do nginx

```
server {
  listen 8080 default*server;
  listen [::]:8080 default_server;

  root /var/www/html;

  index index.html index.htm index.nginx-debian.html;

  server_name *;

  location / {
    try_files $uri /index.html;
  }
}
```
