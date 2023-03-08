require('dotenv').config();

export const environment = {
  // Nome do servidor de produção - incluir ndev.local no hosts da máquina (ou registrar um dns)
  // windows: c:\windows\system32\drivers\etc\hos
  // linux: /etc/hosts
  // entrada: xxx.xxx.xxx.xxx dev.local
  production: true,
  urlApi: process.env.urlApi
};
