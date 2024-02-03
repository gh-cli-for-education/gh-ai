import { should } from 'chai'; // Importando el estilo de testing "expect"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const shell = require('shelljs');
should();

/**
 * 
 * @param {*} stdout 
 * @returns 
 */
const cleanOutputText = (stdout) => { 
  return stdout.replace(/\n/g, ' ').trim(); 
}

const HELP_OUTPUT = 'Usage: gh-ai [options]\n\n' +
'gh-cli extension that provides help in the creation of other gh extensions\n' +
'using AI and prompt-engineering\n\nOptions:\n' +
'  -V | --version             Print the current version of the program\n' + 
'  -d | --debug               output extra information about the execution\n' +
'  -f | --source-file <FILE>  TODO\n' +
'  -g | --generate-file       TODO\n' + 
'  -h, --help                 display help for command\n' +
'Aditional help:\n  If no option is passed the program will execute in ' +
'\'interactive mode\' asking the user different program options one by one\n\n';


describe('Testing command line options with Commander', () => {
  context('Testing help commands', () => {
    it('Testing -h', () => {
      let result = shell.exec('node ./bin/gh-ai -h', {silent: true});
      result.code.should.equal(0);
      cleanOutputText(result.stdout).should.equal(cleanOutputText(HELP_OUTPUT));
    });
    it('Testing --help', () => {
      let result = shell.exec('node ./bin/gh-ai --help', {silent: true});
      result.code.should.equal(0);
      cleanOutputText(result.stdout).should.equal(cleanOutputText(HELP_OUTPUT));
    });
  });
  context('Testing version command', () => {
    it('Testing -V', () => {
      let result = shell.exec('node ./bin/gh-ai -V', {silent: true});
      result.code.should.equal(0);
      cleanOutputText(result.stdout).should.equal('0.0.0'); // Cambiar esto por la lectura de la versión.
    });
    it('Testing --version', () => {
      let result = shell.exec('node ./bin/gh-ai --version', {silent: true});
      result.code.should.equal(0);
      cleanOutputText(result.stdout).should.equal('0.0.0'); // Cambiar esto por la lectura de la versión.
    });
  }); 
});