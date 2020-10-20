export { exportAsDot };

import {
  ControlFlowGraph,
  EdgeType,
  FlowEdge,
  FlowNode,
  NodeType
} from "../flow";

import { partition } from "../util/arrayUtil";

function exportAsDot(flowGraph: ControlFlowGraph, graphName: string): string {
  return computeDotLines(flowGraph, graphName).join("\n");
}

function computeDotLines(
  flowGraph: ControlFlowGraph,
  graphName: string
): string[] {
  let [conditionalEdges, unconditionalEdges] = partition(
    flowGraph.edges,
    edge => edge.type === EdgeType.Conditional
  );

  let innerLines = [
    "node [shape = box]",
    "",
    "// Unconditional edges",
    ...unconditionalEdges.map(formatEdge)
  ];

  if (conditionalEdges.length > 0) {
    innerLines.push(
      "",
      "// Conditional edges",
      ...conditionalEdges.map(formatEdge)
    );
  }

  let graphLines = [
    "digraph control_flow_graph {",
    ...innerLines.map(it => it.trim()),
    "}"
  ];

  if (graphName) {
    graphLines.unshift(`// ${graphName}`);
  }

  return graphLines;
}

function isExitNode(node: FlowNode): boolean {
  return node.type === NodeType.ErrorExit || node.type === NodeType.SuccessExit;
}


function formatEdge(edge: FlowEdge): string {
  return edge.target.outgoingEdges.reduce((total, item) => {
    total.push(`"${edge.label}" -> "${item.label}"`);
    return total;
  }, []).join('\n');
}
