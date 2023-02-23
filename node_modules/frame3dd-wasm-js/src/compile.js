// emcc -g --pre-js settings.js --post-js post-settings.js -sEXPORTED_FUNCTIONS=_main,_run_3dd -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,callMain src/main.c src/frame3dd.c src/eig.c src/HPGmatrix.c src/HPGutil.c src/NRutil.c src/frame3dd_io.c src/coordtrans.c src/gnuplot_writer.c src/struct_writer.c src/compat_types.c src/core.c -o main.html --preload-file examples/exA.3dd
const shell = require('shelljs')

if (!shell.which('emcc')) {
  shell.echo('Emscripten compiler is required')
  shell.exit(1)
}

const isProd = process.env.NODE_ENV === 'production'
const isEmrun = !isProd && process.env.EMRUN

const srcDir = 'src/'
const f3ddDir = 'frame3dd/'
const f3ddSrcDir = f3ddDir + srcDir
const buildDir = 'build/'
const target = `${buildDir}${isProd ? 'index.mjs' : 'index.html'}`
const compileCmd = `
emcc ${isProd ? '-g0 -O2' : '-g'} \
--pre-js ${srcDir}settings.js --post-js ${srcDir}post-settings.js \
-sEXPORT_ES6=1 \
-sMODULARIZE=1 \
-sEXPORTED_FUNCTIONS=_init,_set_point,_init_reactions,_set_element,_init_length,_set_gravity,\
_init_point_loads,_set_point_load,_solve_model,_get_context \
-sEXPORTED_RUNTIME_METHODS=ccall,cwrap,FS \
${f3ddSrcDir}main.c ${f3ddSrcDir}frame3dd.c ${f3ddSrcDir}eig.c ${f3ddSrcDir}HPGmatrix.c \
${f3ddSrcDir}HPGutil.c ${f3ddSrcDir}NRutil.c ${f3ddSrcDir}frame3dd_io.c ${f3ddSrcDir}coordtrans.c \
${f3ddSrcDir}gnuplot_writer.c ${f3ddSrcDir}struct_writer.c ${f3ddSrcDir}compat_types.c ${f3ddSrcDir}core.c \
${srcDir}ems-binding.cpp -lembind \
-o ${target} \
${isEmrun ? ' --emrun' : ''}`

if (shell.test('-d', buildDir)) {
  shell.rm('-rf', buildDir)
}
shell.mkdir(buildDir)

shell.echo(`$ ${compileCmd}`)

const compileResult = shell.exec(compileCmd, { stdio: 'inherit' })
if (compileResult.code !== 0) {
  shell.echo('Compilation error')
  shell.exit(compileResult)
}

shell.echo('Successfully compiled!')
