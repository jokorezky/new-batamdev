export function tiptapToPlainText(content: any, max = 200): string {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    const texts: string[] = [];

    const walk = (node: any) => {
      if (!node) return;
      if (node.text) texts.push(node.text);
      if (Array.isArray(node.content)) {
        node.content.forEach(walk);
      }
    };

    walk(parsed);
    return texts.join(" ").trim().slice(0, max);
  } catch {
    return "";
  }
}
