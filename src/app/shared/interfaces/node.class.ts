export class Node {
  key: string;
  value: string;
  subTree: any;
  expanded: boolean;

  constructor(key, value, subTree) {
    this.key = key;
    this.value = value;
    this.subTree = subTree;
    this.expanded = true;
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}