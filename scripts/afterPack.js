/**
 * Hook de electron-builder que se ejecuta después del empaquetado
 * Elimina el chrome-sandbox en Linux para evitar problemas de permisos
 * e implementa un wrapper para ejecutar con los flags correctos
 */

const fs = require('fs');
const path = require('path');

exports.default = async function afterPack(context) {
  // Solo en Linux
  if (context.electronPlatformName !== 'linux') {
    return;
  }

  const chromeSandboxPath = path.join(
    context.appOutDir,
    'chrome-sandbox'
  );

  // Eliminar chrome-sandbox si existe
  if (fs.existsSync(chromeSandboxPath)) {
    console.log('Eliminando chrome-sandbox para evitar problemas de permisos...');
    fs.unlinkSync(chromeSandboxPath);
    console.log('chrome-sandbox eliminado correctamente');
  }

  // Implementar wrapper para ejecutar con --no-sandbox
  const duettoPath = path.join(context.appOutDir, 'duetto');
  const duettoBinPath = path.join(context.appOutDir, 'duetto.bin');

  // Renombrar el binario original
  if (fs.existsSync(duettoPath)) {
    console.log('Creando wrapper para ejecutar con --no-sandbox...');
    fs.renameSync(duettoPath, duettoBinPath);

    // Crear el script wrapper
    const wrapperScript = `#!/bin/bash
# Wrapper para ejecutar Duetto en Linux sin sandbox

# Obtener el directorio donde está el script
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"

# Exportar variable de entorno para deshabilitar sandbox
export ELECTRON_DISABLE_SANDBOX=1

# Ejecutar el binario real con los flags necesarios
exec "$DIR/duetto.bin" --no-sandbox --disable-setuid-sandbox "$@"
`;

    fs.writeFileSync(duettoPath, wrapperScript, { mode: 0o755 });
    console.log('Wrapper creado correctamente');
  }
};
