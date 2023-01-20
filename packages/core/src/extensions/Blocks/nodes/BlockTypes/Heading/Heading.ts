import { InputRule, mergeAttributes, Node } from "@tiptap/core";
import styles from "../../Block.module.css";

export const Heading = Node.create({
  name: "heading",
  group: "blockContent",
  content: "inline*",

  addAttributes() {
    return {
      level: {
        default: "1",
        // instead of "level" attributes, use "data-level"
        parseHTML: (element) => element.getAttribute("data-level"),
        renderHTML: (attributes) => {
          return {
            "data-level": attributes.level,
          };
        },
      },
    };
  },

  addInputRules() {
    return [
      ...["1", "2", "3"].map((level) => {
        // Creates a heading of appropriate level when starting with "#", "##", or "###".
        return new InputRule({
          find: new RegExp(`^(#{${parseInt(level)}})\\s$`),
          handler: ({ state, chain, range }) => {
            chain()
              .BNSetContentType(state.selection.from, {
                name: "heading",
                attrs: {
                  level: level as "1" | "2" | "3",
                },
              })
              // Removes the "#" character(s) used to set the heading.
              .deleteRange({ from: range.from, to: range.to });
          },
        });
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: "h1",
        attrs: { level: "1" },
        node: "block",
      },
      {
        tag: "h2",
        attrs: { level: "2" },
        node: "block",
      },
      {
        tag: "h3",
        attrs: { level: "3" },
        node: "block",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: styles.blockContent,
        "data-content-type": this.name,
      }),
      ["h" + node.attrs.level, 0],
    ];
  },
});