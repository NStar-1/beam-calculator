# Frame3dd to WebAssembly

Emscripten compiler configuration and Javascript binding for Frame3dd project.

## How to compile

TBD

## Javascript library

TBD

## WebAssembly Porting Notes

### Compilation
To compile project using Emscripten compiler toolchain run following command
`$ emcc -g --pre-js settings.js --post-js post-settings.js -sEXPORTED_FUNCTIONS=_main,_run_3dd -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,callMain src/main.c src/frame3dd.c src/eig.c src/HPGmatrix.c src/HPGutil.c src/NRutil.c src/frame3dd_io.c src/coordtrans.c src/gnuplot_writer.c src/struct_writer.c src/compat_types.c src/core.c -o main.html --preload-file examples/exA.3dd`

### Development Mode
For ease of development project can be build with `--emrun` after it can be started with emrun tool which would provide dev server and addtional debug logging:
`emrun main.html`
