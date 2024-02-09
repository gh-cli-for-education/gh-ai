import nearley from 'nearley';
import * as fs from 'fs';
import * as grammar from './grammar.js';
import { SCHEMAS } from './utils.js';

async function parseFromfile(origin) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar.grammar));
  let input = await fs.readFileSync(origin, 'utf-8'); // Esto esta mal escrito 
  parser.feed(input);
  console.log(parser.results[0]);
  SCHEMAS['extension'].parse(parser.results[0]);
}

parseFromfile(process.argv[2]);