/**
 * @file attr-val-required.js
 * @description Custom HTML linting rule to catch errors when an attribute value is empty (e.i. attr='' or attr="") and ignores plain attributes which could be angular directives (e.i. myDirective)
 * @version 1.0.0
 * @author Miroslav Georgiev
 */

'use strict';

module.exports = HTMLHint => {
  HTMLHint.addRule({
    id: 'attr-value-required',
    description: 'Attribute values cannot be empty.',
    init: function init(parser, reporter) {
      parser.addListener('tagstart', event => {
        const attrs = event.attrs;
        const col = event.col + event.tagName.length + 1;

        for (const attr of attrs) {
          if ((attr.quote === `'` || attr.quote === `"`) && attr.value.trim() === '') {
            reporter.warn(`The attribute [ '${attr.name}' ] value cannot be empty.`, event.line, col + attr.index, this, attr.raw);
          }
        }
      });
    }
  });
};
