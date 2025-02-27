import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import markdown from 'highlight.js/lib/languages/markdown';
import { lowlight } from 'lowlight';
import { Markdown } from 'tiptap-markdown';

import { CollapsibleBlockContentNode } from './CollapsibleBlock/nodes/CollapsibleBlockContent';
import { CollapsibleBlockNode } from './CollapsibleBlock/nodes/CollapsibleBlockNode';
import { CollapsibleBlockSummaryNode } from './CollapsibleBlock/nodes/CollapsibleBlockSummary';
import { ReferenceNode } from './ReferenceBlock/ReferenceNode';
lowlight.registerLanguage('markdown', markdown);

export const EDITOR_EXTENSIONS: Extensions = [
  // Custom extensions
  CollapsibleBlockNode,
  CollapsibleBlockContentNode,
  CollapsibleBlockSummaryNode,
  ReferenceNode,

  Markdown,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
export const INITIAL_CONTENT = `
  <h2>Hi there,</h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are
    all kind of basic text styles you’d probably expect from a text editor. But
    wait until you see the lists:
  </p>
  <collapsible-block folded="false">
    <collapsible-summary>Open Collapsible</collapsible-summary>
    <collapsible-content>
      <p>Text</p>
      <collapsible-block folded="true">
        <collapsible-summary>collapsible 1.2</collapsible-summary
        ><collapsible-content><p></p></collapsible-content></collapsible-block
    ></collapsible-content>
  </collapsible-block>
  <ul>
    <li>
      That’s a bullet list with one …
      <span data-type="mention" data-id="ref1" class="mention"></span>
    </li>
    <li>… or two list items.</li>
  </ul>
  <collapsible-block
    >Closed Collapsible<collapsible-block
      >collapsible 2.1</collapsible-block
    ></collapsible-block
  >
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s
    try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
}</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though.
    Give it a try and click a little bit around. Don’t forget to check the other
    examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
`;
