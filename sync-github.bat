@echo off
chcp 65001 > nul
echo ========================================================
echo   CARVLAK - Sincronizar y Auto-Desplegar en GitHub
echo   Repositorio: maximilianoirujo-sudo/appauto
echo ========================================================
echo.
echo 1. Preparando archivos y fotos...
git add .
echo.
echo 2. Creando commit de nueva version...
git commit -m "Auto-deploy: Actualizacion de catalogo CARVLAK con fotos de showroom"
echo.
echo 3. Enviando cambios a la rama principal (main)...
git branch -M main
git push origin main
echo.
echo ========================================================
echo   [EXITO] Cambios enviados a GitHub correctamente.
echo   GitHub Actions se ejecutara en segundos para desplegar
echo   la web automaticamente a todo el mundo.
echo ========================================================
pause
