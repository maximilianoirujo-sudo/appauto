@echo off
chcp 65001 > nul
set "GIT_CMD=git"
if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"

echo ========================================================
echo   CARVLAK - Sincronizar y Auto-Desplegar en GitHub
echo   Repositorio: maximilianoirujo-sudo/appauto
echo ========================================================
echo.
echo 1. Preparando archivos y fotos de showroom...
"%GIT_CMD%" add .
echo.
echo 2. Creando commit de nueva version...
"%GIT_CMD%" commit -m "Auto-deploy: Actualizacion de catalogo CARVLAK con fotos de showroom"
echo.
echo 3. Enviando a GitHub (rama main)...
echo Si se abre una ventana del navegador, autoriza el inicio de sesion.
"%GIT_CMD%" branch -M main
"%GIT_CMD%" push -u origin main
echo.
echo ========================================================
echo   [EXITO] Cambios enviados a GitHub correctamente.
echo   GitHub Actions iniciara el despliegue en segundos.
echo ========================================================
pause
