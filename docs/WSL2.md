## Prerequisitos
Para actualizar a WSL2

- Windows 10
   1. Para sistemas x64: versión 1903 o posterior, con la compilación 18362 o posterior.
   2. Para sistemas ARM64: versión 2004 o posterior, con la compilación 19041 o posterior.
- Windows 11

### Opcional
- Instalar [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install) para el manejo de consolas (incluye PwerShell, CMD, GitBash, WSL, etc)

## Preparar ambiente
### Instalar Linux en Windows con WSL (Windows subsystem for linux)

1. Instalar WSL
``` bash
  # En CMD #
  powershell start-process powershell -verb runas

  # En PowerShell
  # Habilitar la característica opcional 'Plataforma de máquina virtual', en caso de error:
  # https://docs.microsoft.com/es-mx/windows/wsl/troubleshooting#error-0x80370102-the-virtual-machine-could-not-be-started-because-a-required-feature-is-not-installed
    
  dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  wsl --install

  # Revisar distros instaladas y su versión
  wsl -l -v
```
2. Abrir Ubuntu y completar la instalación.
3. Descargar e instalar el Paquete de actualización del kernel de Linux en WSL 2 para máquinas x64
4. Reiniciar el PC.
5. Ir a cualquier carpeta y en la barra de direcciones escribir %USERPROFILE% y enter.
6. Crear un archivo que se llame .wslconfig sin extensión. Aquí pueden setear varios atributos de la máquina virtual, entre ellos cuanta RAM tendrá disponible, por ej para poner un límite de 6GB de RAM:
 
 ``` bash
   [wsl2]
    memory=6GB   
 ```

### Instalar y configurar Docker en Windows
1. Instalar Docker de forma normal, marcar la opción enable WSL 2 durante la instalación si es que aparece. Si no aparece, una vez termianda la instalación, ir a Settings -> General y chequear Use WSL 2 based engine
2. En la pestaña Resources verificar que este chequeada la opción Enable integration with my default WSL distro
3. Hacer clic en Apply & Restart
4. Verificar en CMD ejecutando el comando docker que esta todo instalado.

### Prepara Ubuntu
Desde la consola de WSL:
``` bash
#actualizar packages
sudo apt update && sudo pat upgrade
# Instalar nodejs y npm
sudo apt install nodejs npm
```
##### Generar Nueva llave SSH
1. Abrir la Terminal.
2. Ejecutar el siguiente comando reemplazando por su correo de GitHub para crear una llave ssh.

``` bash
ssh-keygen -t ed25519 -C test@autominder.com

> Generating public/private algorithm key pair.
```
3. Las siguientes opciones se pueden omitir presionando 'enter' para generarla con el valor por defecto

``` bash
> Enter a file in which to save the key (/home/you/.ssh/algorithm): Press enter
> Enter passphrase (empty for no passphrase): Type a passphrase
> Enter same passphrase again: Type passphrase again
```

4. Inicia el agente SSH en segundo plano
``` 
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Ejecutar el siguiente comando y copiar el resultado
cat ~/.ssh/id_ed25519.pub
```
5. En Github, da clic en tu foto de perfil y despues da click en Configuracion (Settings)
6. En la seccion de "Acceso" de la barra lateral, haz clic en llaves SSH y GPG
7. Click en New SSH key o add SSH key
8. En el campo titulo ingresar una descripcion para la llave, ej "Llave SSH WSL"
9. Pegar el contenido del comando del paso 4 en el campo "Key"
10. Click en Add SSH key

### Clonar codigo y levantar docker
En WSL
``` bash
# Ubicarse en el home
cd
git clone git@github.com:depecompany/autominder.git

# Core Init
sudo gpasswd -a $USER docker
newgrp docker
docker-compose -f docker-compose.yml build

# Levantar docker
docker-compose -f docker-compose.yml up -d

# Core Stop
docker-compose stop

# Core Remove
docker-compose rm -f
docker system prune -a

# Backend
docker exec -it autominder_backend /bin/bash
npm install
exit

cd back
npm install

# Frontend
docker exec -it autominder_frontend /bin/bash
npm install

cd front/
npm install
```

### Cargar proyecto en IDE
1. Abrir IDE y selecionar carpeta /home/<usuario>/autominder
