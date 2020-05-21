change=0
deploy=0

while IFS= read -r line; do
  uri="$line"
done < <(grep -v "^//.*" ./client/src/server.js)

case $uri in 
"export default 'https://kaerdos-st-server.herokuapp.com'")
  mode=1
  echo "Estas en modo de despliegue"
  ;;
"export default 'http://localhost:5000'")
  mode=2
  echo "Estas en modo de desarrollo"
  ;;
esac

args=`getopt cd $*`
set -- $args
for i; do
  case $i in
  '-c') change=1 ;;
  '-d') deploy=1 ;;
  esac
done

change() {
  case $mode in
  1) modeto="desarollo"; urito="export default 'http://localhost:5000'\n// export default 'https://kaerdos-st-server.herokuapp.com'" ;;
  2) modeto="despliegue"; urito="// export default 'http://localhost:5000'\nexport default 'https://kaerdos-st-server.herokuapp.com'" ;;
  esac

  read -e -p "Deseas cambiar al modo de $modeto?[s/N]" pmpt

  case ${pmpt:-"n"} in
  's'|'S')
    echo "Cambiando"
    echo -ne $urito > './client/src/server.js'
    ;;
  'n'|'N') echo "Abortando" ;;
  esac
}


if [ $change = 1 ]; then
  change
fi

deploy() {
  if [ $mode = 2 ]; then
    echo "ADVERTENCIA: Estas en modo de desarrollo"
    change
    deploy
  fi

  read -e -p "Deseas desplegar los cambios?[s/N]" pmpt

  case ${pmpt:-"n"} in
  's'|'S')
    echo "Desplegando"
    git subtree push --prefix client/ heroku master
    git subtree push --prefix server server master
    echo "Cambios desplegados. Asegurate de haber actualizado los cambios en el repositorio remoto."
    ;;
  'n'|'N') echo "Abortando" ;;
  esac
}

if [ $deploy = 1 ]; then
  deploy
fi