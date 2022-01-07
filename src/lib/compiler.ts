import { relative } from 'path'
import ts from 'typescript'
import { logTypeScriptError } from './logger.js'

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
}

interface ICompileAndWatch {
  projectDir: string,
  onStart?: () => void,
  onFileChanged?: () => void,
  onCompilationFailed?: (message:string, error:ts.Diagnostic) => void,
  onCompilationDone?: () => void,
}

export function compileAndWatch({
  projectDir,
  onStart = () => {},
  onFileChanged = () => {},
  onCompilationFailed = () => {},
  onCompilationDone = () => {},
} : ICompileAndWatch) {
  const configPath = ts.findConfigFile(
    /*searchPath*/ projectDir,
    ts.sys.fileExists,
    'tsconfig.json'
  )
  if (!configPath) {
    throw new Error('Could not find a valid "tsconfig.json".')
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram

  const host = ts.createWatchCompilerHost(
    configPath,
    {
      allowJs: true,
      outDir: '.glee',
    },
    ts.sys,
    createProgram,
    reportDiagnostic,
    onWatchStatusChanged
  )

  const origCreateProgram = host.createProgram
  host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
    return origCreateProgram(rootNames, options, host, oldProgram)
  }
  const origPostProgramCreate = host.afterProgramCreate

  host.afterProgramCreate = program => {
    origPostProgramCreate!(program)
  }

  ts.createWatchProgram(host)

  function reportDiagnostic(diagnostic: ts.Diagnostic) {
    const fileName = relative(process.cwd(), diagnostic.file.getSourceFile().fileName)
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start!
    )
    logTypeScriptError(diagnostic.code, ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()), fileName, line, character)
  }

  function onWatchStatusChanged(diagnostic: ts.Diagnostic, newLine: string, options: ts.CompilerOptions, errorCount?: number) {
    switch (diagnostic.code) {
      case 6031: // Starting compilation
        return onStart()
      case 6032: // File change detected
        return onFileChanged()
      case 6194: // Found x errors. Watching for file changes...
        if (errorCount === 0) {
          return onCompilationDone()
        } else {
          return onCompilationFailed(ts.flattenDiagnosticMessageText(diagnostic.messageText, ts.sys.newLine), diagnostic)
        }
    }
  }
}
