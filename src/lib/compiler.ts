import { relative, resolve } from 'path'
import ts from 'typescript'
import { logTypeScriptError } from './logger.js'

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
}

interface ICompileAndWatch {
  projectDir: string
  onStart?: () => void
  onFileChanged?: () => void
  onCompilationFailed?: (message: string, error: ts.Diagnostic) => void
  onCompilationDone?: () => void
}

const noop = function () {
  /* Do nothing */
}

export function compileAndWatch({
  projectDir,
  onStart = noop,
  onFileChanged = noop,
  onCompilationFailed = noop,
  onCompilationDone = noop,
}: ICompileAndWatch) {
  const tsConfigPath = resolve(projectDir, 'tsconfig.json')
  if (!ts.sys.fileExists(tsConfigPath)) {
    ts.sys.writeFile(
      tsConfigPath,
      JSON.stringify(
        {
          // eslint-disable-line security/detect-non-literal-fs-filename
          compilerOptions: {
            allowJs: true,
            target: 'es6',
            esModuleInterop: true,
            moduleResolution: 'node',
            module: 'commonjs',
          },
        },
        undefined,
        2
      )
    )
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram

  const host = ts.createWatchCompilerHost(
    tsConfigPath,
    {
      allowJs: true,
      outDir: '.glee',
      rootDir: projectDir,
      target: ts.ScriptTarget.ES2016,
      module: ts.ModuleKind.ES2020,
      esModuleInterop: true,
    } as { [key: string]: any },
    ts.sys,
    createProgram,
    reportDiagnostic,
    onWatchStatusChanged
  )

  const origCreateProgram = host.createProgram
  host.createProgram = (
    rootNames: ReadonlyArray<string>,
    options,
    host,
    oldProgram
  ) => {
    return origCreateProgram(rootNames, options, host, oldProgram)
  }
  const origPostProgramCreate = host.afterProgramCreate

  host.afterProgramCreate = (program) => {
    origPostProgramCreate(program)
  }

  ts.createWatchProgram(host)

  function reportDiagnostic(diagnostic: ts.Diagnostic) {
    const fileName = relative(
      process.cwd(),
      diagnostic.file.getSourceFile().fileName
    )
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start
    )
    logTypeScriptError(
      diagnostic.code,
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        formatHost.getNewLine()
      ),
      fileName,
      line,
      character
    )
  }

  function onWatchStatusChanged(
    diagnostic: ts.Diagnostic,
    newLine: string,
    options: ts.CompilerOptions,
    errorCount?: number
  ) {
    switch (diagnostic.code) {
      case 6031: // Starting compilation
        return onStart()
      case 6032: // File change detected
        return onFileChanged()
      case 6194: // Found x errors. Watching for file changes...
        if (errorCount === 0) {
          return onCompilationDone()
        }
        return onCompilationFailed(
          ts.flattenDiagnosticMessageText(
            diagnostic.messageText,
            ts.sys.newLine
          ),
          diagnostic
        )
    }
  }
}
