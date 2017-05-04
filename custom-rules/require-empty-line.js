/**
 * @file require-empty-line.js
 * @description Custom HTML linting rule to require a newline at EOF
 * @version 1.0.0
 */

'use strict';

module.exports = HTMLHint => {
  HTMLHint.addRule({
    id: 'enforce-newline',
    description: 'HTML files must end with a newline.',
    init: function init(parser, reporter) {
      parser.addListener('end', event => {
        if (event.lastEvent.raw !== '\n' && event.lastEvent.raw !== '\r\n') {
          reporter.warn('Missing new line.', event.line, event.col, this, event.raw);
        }
      });
    }
  });
};
