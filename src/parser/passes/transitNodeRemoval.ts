import { NumericSet } from "../../collections/numericSet";
import * as ArrayUtils from "../../util/arrayUtil";

import { ControlFlowGraph, EdgeType, FlowNode, NodeType } from "../../flow";

export { removeTransitNodes };

function removeTransitNodes(graph: ControlFlowGraph) {
  let visitedNodes = NumericSet.create();
  optimizeNode(graph.entry, visitedNodes);
}

function optimizeNode(node: FlowNode, visitedNodes: NumericSet) {
  if (visitedNodes.contains(node.id)) {
    return;
  }

  visitedNodes.add(node.id);

  let targetNodes = node.outgoingEdges.map(edge => edge.target);

  if (
    node.incomingEdges.length === 1 &&
    node.outgoingEdges.length === 1 &&
    node.type === NodeType.Normal
  ) {
    let incomingEdge = node.incomingEdges[0];
    let outgoingEdge = node.outgoingEdges[0];

    if (
      incomingEdge.type === EdgeType.Epsilon ||
      outgoingEdge.type === EdgeType.Epsilon
    ) {
      optimizeTransitNode(node, visitedNodes);
    }
  }

  for (let target of targetNodes) {
    optimizeNode(target, visitedNodes);
  }
}

function optimizeTransitNode(transitNode: FlowNode, visitedNodes: NumericSet) {
  let originalTarget = transitNode.outgoingEdges[0].target;

  if (shouldRemoveTransitNode(transitNode)) {
    removeTransitNode(transitNode);
  }

  optimizeNode(originalTarget, visitedNodes);
}

function shouldRemoveTransitNode(transitNode: FlowNode): boolean {
  let sourceId = transitNode.incomingEdges[0].source.id;
  let target = transitNode.outgoingEdges[0].target;

  for (let incomingTargetEdges of target.incomingEdges) {
    if (incomingTargetEdges.source.id === sourceId) {
      return false;
    }
  }

  return true;
}

function removeTransitNode(transitNode: FlowNode) {
  let incomingEdge = transitNode.incomingEdges[0];
  let outgoingEdge = transitNode.outgoingEdges[0];

  let source = incomingEdge.source;
  let target = outgoingEdge.target;

  let [edgeToKeep, edgeToRemove] =
    incomingEdge.type === EdgeType.Epsilon
      ? [outgoingEdge, incomingEdge]
      : [incomingEdge, outgoingEdge];

  edgeToKeep.source = source;
  edgeToKeep.target = target;

  ArrayUtils.removeElementFromArray(edgeToRemove, source.outgoingEdges);
  ArrayUtils.removeElementFromArray(edgeToKeep, source.outgoingEdges);

  ArrayUtils.removeElementFromArray(edgeToRemove, target.incomingEdges);
  ArrayUtils.removeElementFromArray(edgeToKeep, target.incomingEdges);

  source.outgoingEdges.push(edgeToKeep);
  target.incomingEdges.push(edgeToKeep);

  transitNode.incomingEdges = [];
  transitNode.outgoingEdges = [];
}
