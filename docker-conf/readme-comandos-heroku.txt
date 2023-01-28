precisa ter na pasta onde os comandos vão ser rodando o arquivo Dockerfile e nginx.conf
esses dois arquivos acima devem ser colocado na pasta dist

heroku login
heroku create uegenio-admin3
heroku container:push web  -a uegenio-admin3
heroku container:release web  -a uegenio-admin3