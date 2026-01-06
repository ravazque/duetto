#!/bin/bash
# Wrapper para ejecutar Duetto en Linux con los flags correctos

# Obtener el directorio donde está el script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Exportar variable de entorno para deshabilitar sandbox
export ELECTRON_DISABLE_SANDBOX=1

# Ejecutar el binario real con los flags necesarios
exec "$DIR/duetto.bin" --no-sandbox --disable-setuid-sandbox "$@"
